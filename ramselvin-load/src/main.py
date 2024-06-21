from fastapi import FastAPI
from src.application.routes import load_router
from fastapi.responses import HTMLResponse
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware

def create_application():
    application = FastAPI(
        title="Empresa Inlaze",
        description="Documentación APIs para prueba práctica servicios de Load",
        version="1.0.0",
    )
    
    @application.get("/load/openapi.json", include_in_schema=False)
    async def get_openapi():
        return application.openapi()
        
    @application.get("/load/docs", include_in_schema=False)
    async def custom_swagger_ui_html():
        return get_swagger_ui_html(
            openapi_url="/load/openapi.json",
            title="Swagger UI"
        )
        
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://44.218.139.126",
            "http://localhost:3000"
            ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.openapi_url = "/load/openapi.json"

    application.include_router(load_router)

    return application

app = create_application()
