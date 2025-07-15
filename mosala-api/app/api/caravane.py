from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.caravane_orm import CaravaneInscriptionORM
from app.db.session import async_session

router = APIRouter()

class CaravaneInscription(BaseModel):
    nom: str
    email: str
    etape: str
    telephone: str = ""
    message: str = ""
    consent: bool

@router.post("/")
async def inscription(data: CaravaneInscription):
    async with async_session() as session:
        db_obj = CaravaneInscriptionORM(
            nom=data.nom,
            email=data.email,
            etape=data.etape,
            telephone=data.telephone,
            message=data.message,
            consent=data.consent
        )
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
    print("Nouvelle inscription caravane :", data)
    return {"ok": True, "id": db_obj.id} 