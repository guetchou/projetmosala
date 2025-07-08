import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import asyncio

MYSQL_URL = os.environ.get("MOSALA_MYSQL_URL", "mysql+aiomysql://mosala_user:motdepassefort@localhost/mosala")

# Importer les modèles ORM générés précédemment
from app.models.user_orm import User, Base as UserBase
from app.models.job_orm import Job, Base as JobBase

engine = create_async_engine(MYSQL_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def insert_data():
    async with async_session() as session:
        # Utilisateurs de test
        users = [
            User(name="Jean Likibi", email="jean@mosala.org"),
            User(name="Aïssa M’Bemba", email="aissa@mosala.org"),
            User(name="Pauline Ondzaba", email="pauline@mosala.org"),
        ]
        # Offres d'emploi de test
        jobs = [
            Job(title="Développeur React", company="TechCongo", city="Brazzaville", type="CDI"),
            Job(title="Chargé de communication", company="ONG Espoir", city="Pointe-Noire", type="CDD"),
            Job(title="Data Analyst", company="Banque Centrale", city="Brazzaville", type="Stage"),
        ]
        session.add_all(users + jobs)
        await session.commit()
        print("Données de test insérées !")

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(insert_data()) 