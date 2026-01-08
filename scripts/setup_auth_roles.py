#!/usr/bin/env python3
"""
Script d'automatisation Mosala : Authentification, rôles, insertion de test et lancement backend
----------------------------------------------------------------------------------------------
Ce script :
1. (Re)crée la table 'users' avec les bons champs (id, name, email, role, password_hash)
2. Insère des utilisateurs de test (candidat, recruteur, admin)
3. Lance le backend FastAPI

Usage :
    python setup_auth_roles.py

Prérequis :
    - MySQL/MariaDB lancé et accessible
    - Les dépendances Python installées (voir requirements.txt)
    - Les modèles et scripts déjà présents dans le repo

"""
import os
import subprocess
import sys
import time
# Ajout du chemin mosala-api au PYTHONPATH pour les imports
sys.path.insert(0, os.path.abspath("mosala-api"))
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import asyncio
from sqlalchemy import text

MYSQL_URL = os.environ.get("MOSALA_MYSQL_URL", "mysql+aiomysql://mosala_user:motdepassefort@localhost/mosala")

# Remplacement de asyncio.run pour compatibilité Python 3.6

def run_async(coro):
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    if loop.is_running():
        import nest_asyncio
        nest_asyncio.apply()
        return loop.run_until_complete(coro)
    else:
        return loop.run_until_complete(coro)

# 1. (Re)création de la table users
print("[1/3] Migration de la base : (re)création de la table users...")
engine = create_async_engine(MYSQL_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def migrate():
    async with engine.begin() as conn:
        # Drop table users si elle existe
        await conn.run_sync(lambda c: c.execute(text("DROP TABLE IF EXISTS users")))
        # Recrée la table users
        from app.models.user_orm import Base
        await conn.run_sync(Base.metadata.create_all)
    print("Table 'users' (re)créée avec succès.")

run_async(migrate())

# 2. Insertion des utilisateurs de test
print("[2/3] Insertion des utilisateurs de test avec rôles...")
from app.models.user_orm import User
from app.core.security import hash_password

async def insert_test_users():
    async with async_session() as session:
        users = [
            User(name="Jean Likibi", email="jean@mosala.org", password_hash=hash_password("test1234"), role="candidat"),
            User(name="Aïssa M’Bemba", email="aissa@mosala.org", password_hash=hash_password("test1234"), role="recruteur"),
            User(name="Pauline Ondzaba", email="pauline@mosala.org", password_hash=hash_password("test1234"), role="admin"),
        ]
        session.add_all(users)
        await session.commit()
    print("Utilisateurs de test insérés !")

run_async(insert_test_users())

# 3. Lancement du backend FastAPI
print("[3/3] Lancement du backend FastAPI sur http://localhost:1188 ...")
# On lance en arrière-plan pour ne pas bloquer le script
subprocess.Popen([sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "1188", "--reload"], cwd="mosala-api")
time.sleep(2)
print("Backend lancé. Accédez à la doc Swagger sur http://localhost:1188/docs")

print("\nTout est prêt ! Testez l'inscription, la connexion et la gestion des rôles via l'API.") 