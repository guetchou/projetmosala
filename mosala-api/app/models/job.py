from pydantic import BaseModel

class JobCreate(BaseModel):
    title: str
    company: str
    city: str
    type: str

class JobOut(BaseModel):
    id: int
    title: str
    company: str
    city: str
    type: str
