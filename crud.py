from sqlalchemy.orm import Session
from . import models, schemas

# Criar categoria
def create_categoria(db: Session, categoria: schemas.CategoriaCreate):
    db_categoria = models.Categoria(nome=categoria.nome)
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

# Listar todas categorias
def get_categorias(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Categoria).offset(skip).limit(limit).all()

# Buscar categoria por id
def get_categoria(db: Session, categoria_id: int):
    return db.query(models.Categoria).filter(models.Categoria.id == categoria_id).first()

# Atualizar categoria
def update_categoria(db: Session, categoria_id: int, categoria: schemas.CategoriaCreate):
    db_categoria = get_categoria(db, categoria_id)
    if db_categoria:
        db_categoria.nome = categoria.nome
        db.commit()
        db.refresh(db_categoria)
    return db_categoria

# Deletar categoria
def delete_categoria(db: Session, categoria_id: int):
    db_categoria = get_categoria(db, categoria_id)
    if db_categoria:
        db.delete(db_categoria)
        db.commit()
    return db_categoria
