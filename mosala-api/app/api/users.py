"""
API Utilisateur Mosala
----------------------

- POST /users/ : Inscription d'un nouvel utilisateur
    - Champs requis : name, email, password, role (candidat|recruteur|admin)
    - Le mot de passe est hashé côté serveur.
    - Le rôle par défaut est 'candidat'.
    - Retourne l'utilisateur créé (sans le mot de passe).

- POST /users/login : Connexion
    - Champs requis : email, password
    - Retourne un JWT (access_token), le type de token et le rôle de l'utilisateur.
    - À utiliser dans l'en-tête Authorization côté frontend :
        Authorization: Bearer <access_token>

- Les rôles disponibles sont : candidat, recruteur, admin.
- Les redirections frontend doivent se baser sur le champ 'role' retourné par /login.

"""
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import UserCreate, UserOut
from app.models.user_orm import User as UserORM
from app.db.session import async_session
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/", response_model=UserOut)
async def create_user(user: UserCreate):
    hashed_pw = hash_password(user.password)
    db_user = UserORM(name=user.name, email=user.email, password_hash=hashed_pw, role=user.role)
    async with async_session() as session:
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)
    return UserOut(id=db_user.id, name=db_user.name, email=db_user.email, role=db_user.role)

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginRequest):
    async with async_session() as session:
        result = await session.execute(select(UserORM).where(UserORM.email == data.email))
        user = result.scalars().first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou mot de passe invalide")
    token = create_access_token({"sub": user.email, "role": user.role, "user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "role": user.role}
