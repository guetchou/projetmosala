from fastapi import APIRouter
from app.models.job import JobCreate, JobOut

router = APIRouter()

@router.post("/", response_model=JobOut)
def create_job(job: JobCreate):
    return JobOut(id=1, **job.dict())
