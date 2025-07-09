from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "candidat"  # valeurs possibles: candidat, recruteur, admin

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
