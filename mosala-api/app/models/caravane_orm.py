from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CaravaneInscriptionORM(Base):
    __tablename__ = "caravane_inscriptions"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    etape = Column(String(50), nullable=False)
    telephone = Column(String(30), nullable=True)
    message = Column(String(500), nullable=True)
    consent = Column(Boolean, nullable=False) 