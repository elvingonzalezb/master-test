from src.infrastructure.redis_cache import RedisConnection
import json

class RedisService:
    def __init__(self):
        self.redis_connection = RedisConnection()

    def store_data(self, repo_id, repo_data):
        try:   
            serialized_data = json.dumps(repo_data)
            self.redis_connection.store_data(f"repo:{repo_id}", serialized_data)
        except Exception as e:
            print(f"Error storing data in Redis: {e}")
            raise

    def check_cache(self, repo_id):
        try:   
            serialized_data = self.redis_connection.retrieve_data(f"repo:{repo_id}")

            if serialized_data is None:
                return None

            repo_data = json.loads(serialized_data)
            return repo_data
        except Exception as e:
            print(f"Error checking cache in Redis: {e}")
            raise
