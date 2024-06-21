from fastapi import APIRouter
from src.application.transform_service import (
    transform_data_save,
    get_all_data_for_cleaner,
    execute_transform_cleaner
)

extract_router = APIRouter()

@extract_router.get("/extract/health", summary="Check servicio", description="Verifica el estado del servicio", tags=['Api Servicio Transform'])
async def root():
    return {"msg": "Service Transform [check health] is working"}

@extract_router.post("/transform/data/cleaner", summary="Execute Service Transform", description="Ejecuta el proceso de limpieza", tags=["API Servicio Transform"])
async def execute_transform_cleaner():    
    return execute_transform_cleaner()

@extract_router.post("/transform/data/pending/cleaner", summary="Execute Service Transform", description="Ejecuta el proceso de limpieza", tags=["API Servicio Transform"])
async def execute_transform_pending_cleaner():    
    return get_all_data_for_cleaner()

@extract_router.post("/transform/data/process", summary="Execute Service Transform Save", description="Ejecuta el proceso de guardar datos en la base de datos", tags=["API Servicio Transform"])
async def execute_transform_save():
    try:      
        transform_data_save()

        return {
            "message": "Transformation duplicate initiated for database",
        }

    except Exception as e:
        return {"error": str(e)}
    

# @extract_router.get("/transform/converter", summary="Execute Service Transform", description="Ejecuta el proceso de convertir", tags=["API Servicio Transform"])
# async def execute_transform_data_converter():    
#     pass

# @extract_router.get("/transform/aggregator", summary="Execute Service Transform", description="Ejecuta el proceso de Agregación", tags=["API Servicio Transform"])
# async def execute_transform_aggregator():    
#     pass

# @extract_router.get("/transform/integration", summary="Execute Service Transform", description="Ejecuta el proceso de Integración", tags=["API Servicio Transform"])
# async def execute_transform_integration():    
#     pass

# @extract_router.post("/transform/queue/{repo_id}", summary="Execute Service Transform Queue", description="Ejecuta el proceso de enviar mensaje a la cola en RabbitMQ", tags=["API Servicio Transform"])
# async def execute_transform_queue(repo_id: str):
#     transform_data_sent_queue(repo_id)
#     return {"message": "Transformation process initiated for RabbitMQ queue"}
