from fastapi import APIRouter, HTTPException
from src.application.repository_service import RepositoryService

router = APIRouter()
service = RepositoryService()

@router.get("/api/health", summary="Check servicio", description="Verifica el estado del servicio", tags=['Api Servicio Principal'])
async def root():
    return {"msg": "Service API [check health] is working"}

@router.get("/api/records", summary="Get record count", description="Get the total number of records in a table", tags=['Api Servicio Principal'])
async def get_record_count():
    try:
        table_name = "casa_apuestas"
        count = service.get_record_count(table_name)
        return {"table": table_name, "count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
