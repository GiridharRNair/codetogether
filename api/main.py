import os

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ONLINE_COMPILER_BASE_URL = "https://api.onlinecompiler.io"
ONLINE_COMPILER_API_KEY = os.getenv("ONLINE_COMPILER_API_KEY")

PROGRAMMING_LANGUAGES_COMPILER_MAP = {
    "python": "python-3.14",
    "java": "openjdk-25",
    "cpp": "g++-15",
    "typescript": "typescript-deno",
    "go": "go-1.26",
    "rust": "rust-1.93",
}


class RunCodeRequest(BaseModel):
    code: str
    language: str
    input: str = ""


@app.get("/api/health")
def health():
    return {"status": "healthy"}


@app.post("/api/compile")
async def compile_code(request: RunCodeRequest):
    compiler = PROGRAMMING_LANGUAGES_COMPILER_MAP.get(request.language)
    if not compiler:
        raise HTTPException(
            status_code=400, detail=f"Unsupported language: {request.language}"
        )

    if not ONLINE_COMPILER_API_KEY:
        raise HTTPException(status_code=500, detail="Compiler API key not configured")

    async with httpx.AsyncClient(timeout=35.0) as client:
        try:
            response = await client.post(
                f"{ONLINE_COMPILER_BASE_URL}/api/run-code-sync/",
                headers={"Authorization": ONLINE_COMPILER_API_KEY},
                json={
                    "compiler": compiler,
                    "code": request.code,
                    "input": request.input,
                },
            )
            response.raise_for_status()
        except httpx.TimeoutException:
            raise HTTPException(status_code=504, detail="Code execution timed out")
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429:
                raise HTTPException(
                    status_code=429, detail="Compiler at capacity, try again shortly"
                )
            raise HTTPException(status_code=502, detail="Compiler service error")

    return response.json()
