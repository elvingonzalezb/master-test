from src.infrastructure.external_api import ExternalAPIClient

class ExternalAPIService:
    def __init__(self):
        self.client = ExternalAPIClient()

    def get_popular_repositories(self):
        try:
            return self.client.get_popular_repositories()
        except Exception as e:
            print(f"Error fetching repositories from external API: {e}")
            raise
        
    def get_single_repository_format(self):
        try:
            return self.client.get_single_repository_format()
        except Exception as e:
            print(f"Error fetching repositories from external API: {e}")
            raise
        
    def get_random_repositories(self):
        try:
            return self.client.get_random_repositories()
        except Exception as e:
            print(f"Error fetching repositories from external API: {e}")
            raise
