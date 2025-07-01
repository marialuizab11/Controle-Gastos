from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
import schemas
import crud
import database

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.post("/categorias", response_model=schemas.CategoriaCreate)
def create_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(database.get_db)):
    return crud.create_categoria(db=db, categoria=categoria)

@app.get("/categorias", response_model=list[schemas.CategoriaResponse])
def read_categorias(db: Session = Depends(database.get_db)):
    return crud.get_categorias(db=db)
