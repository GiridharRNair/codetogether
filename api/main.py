from fastapi import FastAPI

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


@app.get("/api/health")
def read_root():
    return {"status": "healthy"}
