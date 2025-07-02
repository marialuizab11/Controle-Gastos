from backend.database import Base
from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship

class Categoria(Base):
    __tablename__ = 'categorias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False, unique=True)

    despesas = relationship("Despesa", back_populates="categoria", cascade="all, delete-orphan")

class Despesa(Base):
    __tablename__ = 'despesas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    descricao = Column(String, index=True)
    valor = Column(Numeric(10, 2), nullable=False)
    data = Column(Date, nullable=False)
    categoria_id = Column(Integer, ForeignKey("categorias.id", ondelete="CASCADE"))

    categoria = relationship("Categoria", back_populates="despesas")
    