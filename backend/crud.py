from sqlalchemy.orm import Session
from backend import models
from backend import schemas

# Criar categoria
def create_categoria(db: Session, categoria: schemas.CategoriaCreate):
    db_categoria = models.Categoria(nome=categoria.nome)
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

# Listar todas categorias com paginação
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

# Criar despesa
def create_despesa(db: Session, despesa: schemas.DespesaCreate):
    db_despesa = models.Despesa(descricao=despesa.descricao, valor=despesa.valor, data=despesa.data, categoria_id=despesa.categoria_id)
    db.add(db_despesa)
    db.commit()
    db.refresh(db_despesa)
    return db_despesa

# Listar todas despesas 
def get_despesas(db: Session):
    from sqlalchemy.orm import joinedload
    return db.query(models.Despesa).options(joinedload(models.Despesa.categoria)).all()
    
