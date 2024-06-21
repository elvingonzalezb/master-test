from fastapi import APIRouter
from src.application.load_service import (
    get_all_data_transform,
    load_data_save,
    get_all_data_complete
)

load_router = APIRouter()

@load_router.get("/load/health", summary="Check servicio", description="Verifica el estado del servicio", tags=['Api Servicio Load'])
async def root():
    return {"msg": "Service Load [check health] is working"}

@load_router.get("/load/all", summary="Execute Service Load", description="Obtiene la data transformada", tags=["API Servicio Load"])
async def execute_get_all_data_transform():
    repositories = get_all_data_transform()
    return {"message": "Load process initiated for API data", "repositories": repositories}

@load_router.post("/load/save", summary="Execute Service Load Save", description="Ejecuta el proceso de cargar la información procesada y completarla", tags=["API Servicio Load"])
async def execute_extract_save():
    try:
        data = load_data_save()
        return {
            "msg": "Load process initiated for database",
        }

    except Exception as e:
        return {"error": str(e)}
    
@load_router.get("/load/complete", summary="Execute Service Load", description="Obtiene la data completada", tags=["API Servicio Load"])
async def execute_get_all_data_complete():
    repositories = get_all_data_complete()
    return {"message": "Load process completed", "repositories": repositories}
