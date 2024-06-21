import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):   
    APP_NAME: str = os.environ.get("APP_NAME", "Ramselvin Platform")
    DEBUG: bool = bool(os.environ.get("DEBUG", False))
    DATABASE_HOST: str = os.environ.get("DATABASE_HOST")
    DATABASE_PORT: str = os.environ.get("DATABASE_PORT", "5432")
    DATABASE_NAME: str = os.environ.get("DATABASE_NAME")
    DATABASE_USER: str = os.environ.get("DATABASE_USER")
    DATABASE_PASSWORD: str = os.environ.get("DATABASE_PASSWORD")
    
settings = Settings()
