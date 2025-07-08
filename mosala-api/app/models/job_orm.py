
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
