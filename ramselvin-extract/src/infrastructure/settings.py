#infrastructure/settings
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):   
    APP_NAME: str = os.environ.get("APP_NAME", "Ramselvin Platform")
    DEBUG: bool = bool(os.environ.get("DEBUG", False))
    DATABASE_HOST: str = os.environ.get("DATABASE_HOST")
    DATABASE_PORT: str = os.environ.get("DATABASE_PORT", "5432")
    DATABASE_NAME: str = os.environ.get("DATABASE_NAME", "ramselvin_inlaze")
    DATABASE_USER: str = os.environ.get("DATABASE_USER")
    DATABASE_PASSWORD: str = os.environ.get("DATABASE_PASSWORD")
    REDIS_PORT: int = int(os.environ.get("REDIS_PORT", 25061))
    REDIS_HOST: str = str(os.environ.get("REDIS_HOST"))
    REDIS_USERNAME: str = os.environ.get("REDIS_USERNAME", "default")
    REDIS_PASSWORD: str = os.environ.get("REDIS_PASSWORD")   
    RABBITMQ_HOST: str = os.getenv("RABBITMQ_HOST")
    RABBITMQ_PORT: int = int(os.getenv("RABBITMQ_PORT", "5671"))
    RABBITMQ_USERNAME: str = os.getenv("RABBITMQ_USERNAME", "gelvin")
    RABBITMQ_PASSWORD: str = os.getenv("RABBITMQ_PASSWORD")
    RABBITMQ_EXCHANGE: str = os.getenv("RABBITMQ_EXCHANGE")
    RABBITMQ_QUEUE: str = os.getenv("RABBITMQ_QUEUE")
    RABBITMQ_ROUTING_KEY: str = os.getenv("RABBITMQ_ROUTING_KEY", "ramselvin-extract-queue")
    RABBITMQ_PROTOCOL: str = os.getenv("RABBITMQ_PROTOCOL", "amqps")
    RABBITMQ_VHOST: str = os.getenv("RABBITMQ_VHOST", "/")

settings = Settings()
