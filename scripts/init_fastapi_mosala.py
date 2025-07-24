import os

BASE = "mosala-api"
folders = [
    "app",
    "app/models",
    "app/db",
    "app/crud",
    "app/api",
    "app/core",
    "app/tests"
]
files = {
    "app/__init__.py": "",
    "app/main.py": '''from fastapi import FastAPI
from app.api import users, jobs

app = FastAPI(title=\"Mosala API\", version=\"1.0.0\")

app.include_router(users.router, prefix=\"/users\", tags=[\"Users\"])
app.include_router(jobs.router, prefix=\"/jobs\", tags=[\"Jobs\"])
''',
    "app/config.py": "# Paramètres globaux, secrets, etc.\n",
    "app/models/__init__.py": "",
    "app/models/user.py": '''from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
''',
    "app/models/job.py": '''from pydantic import BaseModel

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
''',
    "app/db/__init__.py": "",
    "app/db/session.py": "# Connexion à la base de données ici\n",
    "app/crud/__init__.py": "",
    "app/crud/user.py": "# Fonctions CRUD pour User\n",
    "app/crud/job.py": "# Fonctions CRUD pour Job\n",
    "app/api/__init__.py": "",
    "app/api/users.py": '''from fastapi import APIRouter
from app.models.user import UserCreate, UserOut

router = APIRouter()

@router.post(\"/\", response_model=UserOut)
def create_user(user: UserCreate):
    return UserOut(id=1, **user.dict())
''',
    "app/api/jobs.py": '''from fastapi import APIRouter
from app.models.job import JobCreate, JobOut

router = APIRouter()

@router.post(\"/\", response_model=JobOut)
def create_job(job: JobCreate):
    return JobOut(id=1, **job.dict())
''',
    "app/core/__init__.py": "",
    "app/core/security.py": "# Authentification, JWT, etc.\n",
    "app/core/dependencies.py": "# Dépendances globales FastAPI\n",
    "app/tests/__init__.py": "",
    "app/tests/test_users.py": "# Tests pour users\n",
    "app/tests/test_jobs.py": "# Tests pour jobs\n",
    "requirements.txt": "fastapi\nuvicorn\npydantic\n",
    "README.md": "# Mosala API\n\nAPI FastAPI pour la Projet  Mosala.\n",
    ".env": "# Variables d'environnement (DB, secrets, etc.)\n"
}

def create_structure():
    os.makedirs(BASE, exist_ok=True)
    for folder in folders:
        os.makedirs(os.path.join(BASE, folder), exist_ok=True)
    for path, content in files.items():
        full_path = os.path.join(BASE, path)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
    print(f"Structure FastAPI Mosala générée dans ./{BASE}/")

if __name__ == "__main__":
    create_structure() 