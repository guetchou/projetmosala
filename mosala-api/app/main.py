from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import users, jobs, caravane

app = FastAPI(title="Mosala API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines (en dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(caravane.router, prefix="/caravane", tags=["Caravane"])
