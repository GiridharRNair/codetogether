import os

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

load_dotenv()

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore[arg-type]

ORIGINS = [
    "http://localhost:5173",
    "https://codealong.live",
    "https://codealong-gules.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

JDOODLE_BASE_URL = "https://api.jdoodle.com/v1"
JDOODLE_CLIENT_ID = os.getenv("JDOODLE_CLIENT_ID")
JDOODLE_CLIENT_SECRET = os.getenv("JDOODLE_CLIENT_SECRET")

LANGUAGE_MAP = {
    "python": ("python3", "6"),
    "java": ("java", "6"),
    "cpp": ("cpp17", "3"),
    "typescript": ("typescript", "1"),
    "go": ("go", "6"),
    "rust": ("rust", "6"),
}


class RunCodeRequest(BaseModel):
    code: str
    language: str
    input: str = ""


@app.get("/api/health")
@limiter.limit("20/minute")
def health():
    return {"status": "healthy"}


@app.post("/api/compile")
@limiter.limit("10/minute")
async def compile_code(request: Request, body: RunCodeRequest):
    lang_config = LANGUAGE_MAP.get(body.language)
    if not lang_config:
        raise HTTPException(
            status_code=400, detail=f"Unsupported language: {body.language}"
        )

    if not JDOODLE_CLIENT_ID or not JDOODLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=500, detail="Compiler API credentials not configured"
        )

    language_code, version_index = lang_config

    async with httpx.AsyncClient(timeout=35.0) as client:
        try:
            response = await client.post(
                f"{JDOODLE_BASE_URL}/execute",
                json={
                    "clientId": JDOODLE_CLIENT_ID,
                    "clientSecret": JDOODLE_CLIENT_SECRET,
                    "script": body.code,
                    "stdin": body.input,
                    "language": language_code,
                    "versionIndex": version_index,
                },
            )
            response.raise_for_status()
        except httpx.TimeoutException:
            raise HTTPException(status_code=504, detail="Code execution timed out")
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                raise HTTPException(
                    status_code=500, detail="Compiler API authentication failed"
                )
            if e.response.status_code == 429:
                raise HTTPException(
                    status_code=429, detail="Daily compiler limit reached"
                )
            raise HTTPException(status_code=502, detail="Compiler service error")

    data = response.json()
    return {"output": data.get("output", ""), "error": data.get("error")}
