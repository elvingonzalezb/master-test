import requests

class ExternalAPIClient:
    def __init__(self, user='google', sort='stars', order='desc', per_page=1):
        self.user = user
        self.sort = sort
        self.order = order
        self.per_page = per_page
        self.api_url = f"https://api.github.com/search/repositories?q=user:{self.user}&sort={self.sort}&order={self.order}&per_page={self.per_page}"

    def get_single_repository_format(self):
        try:
            response = requests.get(self.api_url)
            response.raise_for_status()
            data = response.json()

            repositories = [
                {
                    "id": repo.get("id"),
                    "name": repo.get("name"),
                    "full_name": repo.get("full_name", ''),
                    "description": repo.get("description"),
                    "url": repo.get("html_url"),
                    "stars": repo.get("stargazers_count"),
                    "avatar": repo.get("owner", {}).get("avatar_url")
                }
                for repo in data.get("items", [])
            ]

            return repositories

        except requests.exceptions.RequestException as e:       
            print(f"Error fetching data: {e}")
            return {"error": str(e)}
        
    def get_popular_repositories(self):
        try:
            response = requests.get(self.api_url)
            response.raise_for_status()
            data = response.json()          

            return data

        except requests.exceptions.RequestException as e:       
            print(f"Error fetching data: {e}")
            return {"error": str(e)}
