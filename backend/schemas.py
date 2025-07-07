import datetime
from decimal import Decimal
from pydantic import BaseModel

class CategoriaBase(BaseModel):
    nome: str

# Criação de categoria
class CategoriaCreate(CategoriaBase):
    nome: str

# Resposta de categoria
class CategoriaResponse(CategoriaBase):
    id: int

    class Config:
        from_attributes = True

class DespesaBase(BaseModel):
    descricao: str
    valor: Decimal
    data: datetime.date

class DespesaCreate(DespesaBase):
    categoria_id: int

class Despesa(DespesaBase):
    id: int
    categoria: CategoriaResponse

    class Config:
        from_attributes = True

class categoriaDespesaIA(BaseModel):
    valor: float
    descricao: str

class CategoriaSugerida(BaseModel):
    categoria_sugerida: str