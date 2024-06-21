from fastapi import APIRouter
from src.application.extract_service import (
    extract_data_get_api,
    extract_data_save,
    extract_data_sent_cache,
    extract_data_sent_queue
)

router = APIRouter()

@router.get("/extract/health", summary="Check servicio", description="Verifica el estado del servicio", tags=['Api Servicio Extract'])
async def root():
    return {"msg": "Service Extract [check health] is working"}

@router.get("/extract/get", summary="Execute Service Extract", description="Ejecuta el proceso de extracción de API y guarda en base de datos", tags=["API Servicio Extract"])
async def execute_extract_get():
    repositories = extract_data_get_api()
    return {"message": "Extraction process initiated for API data", "repositories": repositories}

@router.post("/extract/save", summary="Execute Service Extract Save", description="Ejecuta el proceso de guardar datos en la base de datos", tags=["API Servicio Extract"])
async def execute_extract_save():
    try:  
        inserted_id = extract_data_save()

        return {
            "message": "Extraction process initiated for database",
            "inserted_id": inserted_id
        }

    except Exception as e:
        return {"error": str(e)}


@router.post("/extract/cache/{repo_id}", summary="Execute Service Extract Cache", description="Ejecuta el proceso de enviar datos a cache Redis por ID", tags=["API Servicio Extract"])
async def execute_extract_cache(repo_id: int):
    extract_data_sent_cache(repo_id)
    return {"message": f"Extraction process initiated for Redis cache for repo ID {repo_id}"}

@router.post("/extract/queue/{repo_id}", summary="Execute Service Extract Queue", description="Ejecuta el proceso de enviar mensaje a la cola en RabbitMQ", tags=["API Servicio Extract"])
async def execute_extract_queue(repo_id: str):
    extract_data_sent_queue(repo_id)
    return {"message": "Extraction process initiated for RabbitMQ queue"}
