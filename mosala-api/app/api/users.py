from fastapi import APIRouter
from app.models.user import UserCreate, UserOut

router = APIRouter()

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate):
    return UserOut(id=1, **user.dict())
