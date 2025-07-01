from pydantic import BaseModel

class CategoriaBase(BaseModel):
    nome: str

# Criação de categoria
class CategoriaCreate(CategoriaBase):
    pass

# Resposta de categoria
class CategoriaResponse(CategoriaBase):
    id: int

    class Config:
        orm_mode = True
