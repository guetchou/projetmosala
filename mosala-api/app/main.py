from fastapi import FastAPI
from app.api import users, jobs

app = FastAPI(title="Mosala API", version="1.0.0")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
