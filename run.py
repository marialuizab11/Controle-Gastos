# run.py
import uvicorn

if __name__ == "__main__":
    # Esta forma de chamar o uvicorn programaticamente
    # costuma lidar melhor com o encerramento de processos.
    uvicorn.run(
        "backend.main:app",  # O caminho para o seu objeto FastAPI
        host="127.0.0.1",    # Ou "0.0.0.0" se precisar de acesso externo
        port=8000,
        reload=True
    )