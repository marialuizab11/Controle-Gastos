from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from backend import models
from backend import schemas
from backend import crud
from backend import database

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.post("/categorias", response_model=schemas.CategoriaCreate)
def create_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(database.get_db)):
    return crud.create_categoria(db=db, categoria=categoria)

@app.get("/categorias", response_model=list[schemas.CategoriaResponse])
def read_categorias(db: Session = Depends(database.get_db)):
    return crud.get_categorias(db=db)

@app.post("/despesas", response_model=schemas.DespesaCreate)
def create_despesa(despesa: schemas.DespesaCreate, db: Session = Depends(database.get_db)):
    return crud.create_despesa(db=db, despesa=despesa)

@app.get("/despesas", response_model=list[schemas.Despesa])
def read_despesas(db: Session = Depends(database.get_db)):
    return crud.get_despesas(db=db)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

