from sqlalchemy import Column, Integer, String
from .database import Base

class Categoria(Base):
    __tablename__ = 'categorias'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False, unique=True)
