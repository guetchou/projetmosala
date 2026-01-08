import os

SESSION_PATH = "app/db/session.py"
USER_MODEL_PATH = "app/models/user_orm.py"
JOB_MODEL_PATH = "app/models/job_orm.py"

MYSQL_URL = os.environ.get("MOSALA_MYSQL_URL", "mysql+aiomysql://mosala_user:motdepassefort@localhost/mosala")

session_code = f'''
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "{MYSQL_URL}"

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
'''

user_model_code = '''
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    email = Column(String(128), unique=True, index=True, nullable=False)
'''

job_model_code = '''
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(128), nullable=False)
    company = Column(String(128), nullable=False)
    city = Column(String(64), nullable=False)
    type = Column(String(32), nullable=False)
'''

def write_file(path, code):
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)

def create_tables():
    import importlib.util
    import sys
    from sqlalchemy.ext.asyncio import create_async_engine
    from sqlalchemy.orm import declarative_base
    import asyncio

    sys.path.append(os.getcwd())
    # Dynamically import models
    spec_user = importlib.util.spec_from_file_location("user_orm", USER_MODEL_PATH)
    user_mod = importlib.util.module_from_spec(spec_user)
    spec_user.loader.exec_module(user_mod)
    spec_job = importlib.util.spec_from_file_location("job_orm", JOB_MODEL_PATH)
    job_mod = importlib.util.module_from_spec(spec_job)
    spec_job.loader.exec_module(job_mod)
    Base = user_mod.Base
    # Register Job model with same Base
    job_mod.Base.metadata = Base.metadata
    engine = create_async_engine(MYSQL_URL, echo=True)
    async def run():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run())

if __name__ == "__main__":
    os.makedirs("app/db", exist_ok=True)
    os.makedirs("app/models", exist_ok=True)
    write_file(SESSION_PATH, session_code)
    write_file(USER_MODEL_PATH, user_model_code)
    write_file(JOB_MODEL_PATH, job_model_code)
    print("Fichiers de connexion et modèles SQLAlchemy générés.")
    print("Création des tables dans la base MySQL...")
    create_tables()
    print("Tables créées avec succès !") 