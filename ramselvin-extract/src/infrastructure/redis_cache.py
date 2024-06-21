# src/infrastructure/redis.py
import redis
from src.infrastructure.settings import settings

class RedisConnection:
    def __init__(self):
        self.redis_url = f'rediss://{settings.REDIS_USERNAME}:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{settings.REDIS_PORT}/0'
        self.client = redis.StrictRedis.from_url(self.redis_url)

    def store_data(self, key, value):
        self.client.set(key, value)

    def retrieve_data(self, key):
        return self.client.get(key)
