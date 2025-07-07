from fastapi import FastAPI, Depends,  HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from backend import models, schemas, crud, database
import os
import httpx

load_dotenv()

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/categorias", response_model=schemas.CategoriaCreate)
def create_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(database.get_db)):
    return crud.create_categoria(db=db, categoria=categoria)

@app.get("/categorias", response_model=list[schemas.CategoriaResponse])
def read_categorias(db: Session = Depends(database.get_db)):
    return crud.get_categorias(db=db)

@app.patch("/categorias/{id}", response_model=schemas.CategoriaCreate)
def update_categoria(id: int, categoria: schemas.CategoriaCreate, db: Session = Depends(database.get_db)):
    return crud.update_categoria(db=db, categoria_id=id, categoria=categoria)

@app.delete("/categorias/{id}", response_model=schemas.CategoriaCreate)
def delete_categoria(id: int, db: Session = Depends(database.get_db)):
    return crud.delete_categoria(db=db, categoria_id=id)

@app.post("/despesas", response_model=schemas.DespesaCreate)
def create_despesa(despesa: schemas.DespesaCreate, db: Session = Depends(database.get_db)):
    return crud.create_despesa(db=db, despesa=despesa)

@app.get("/despesas", response_model=list[schemas.Despesa])
def read_despesas(db: Session = Depends(database.get_db)):
    return crud.get_despesas(db=db)

@app.post("/despesas/sugestaoCategoriaIA", response_model=schemas.CategoriaSugerida)
async def sugestaoCategoriaIA(despesa: schemas.categoriaDespesaIA, db: Session = Depends(database.get_db)):
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        print(f"DEBUG: Chave sendo usada. Início: {api_key[:5]}...")
    else:
        print("DEBUG: Chave não encontrada")
    if not api_key:
        raise HTTPException(status_code=401, detail="API key not found")

    openai_url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    categorias = crud.get_categorias(db=db)
    nomes_categorias = ", ".join([categoria.nome for categoria in categorias])

    system_prompt = (
        f'Você é um assistente financeiro especialista em finanças pessoais para usuários brasileiros'
        f'Sua função é categorizar despesas. Responda APENAS com o nome de uma das seguintes categorias: {nomes_categorias}. Não adiciona nenhuma outra palavra, explicação ou pontuação'
    )

    user_prompt = (
        f"Analise a despesa a seguir e retorne a categoria mais adequada"
        f"Descrição: {despesa.descricao}. Valor: R$ {despesa.valor:.2f}"
    )

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "max_tokens": 15,
        "temperature": 0.2
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(openai_url, headers=headers, json=payload, timeout=20)
            response.raise_for_status()
            
            resultado_json = response.json()
            categoria_sugerida = resultado_json["choices"][0]["message"]["content"].strip()
            
            if categoria_sugerida not in nomes_categorias.split(', '):
                categoria_sugerida = "Outros" 

            print(categoria_sugerida)
            
            return schemas.CategoriaSugerida(categoria_sugerida=categoria_sugerida)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f'Erro ao comunicar com API de IA: {e.response.text}')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Erro ao processar requisição: {str(e)}')  


