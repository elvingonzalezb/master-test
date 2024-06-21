from fastapi import FastAPI
from src.application.routes import router as api_router
from fastapi.openapi.utils import get_openapi
from fastapi.responses import HTMLResponse
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware

def create_application():
    application = FastAPI(
        title="Empresa Inlaze",
        description="Documentación APIs para prueba práctica empresa Inlaze",
        version="1.0.0",
    )
    
    @application.get("/api/openapi.json", include_in_schema=False)
    async def get_openapi():
        return app.openapi()
        
    @application.get("/api/docs", include_in_schema=False)
    async def custom_swagger_ui_html():
        return get_swagger_ui_html(
            openapi_url="/api/openapi.json",
            title="Swagger UI"
        )
        
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )

    application.openapi_url = "/api/openapi.json"

    application.include_router(api_router)

    return application

app = create_application()