from src.application.external_api_service import ExternalAPIService
from src.application.redis_service import RedisService
from src.application.rabbitmq_service import RabbitMQService
from src.infrastructure.database import DatabaseConnection

def extract_data_get_api():
    external_api_service = ExternalAPIService()

    try:
        repositories = external_api_service.get_single_repository_format()
        return repositories
    except Exception as e:
        print(f"Extraction from external API failed: {e}")
        raise

def extract_data_save():
    repositories = extract_data_get_api() 
    if not repositories:
        print("No repositories data found. Aborting save process.")
        return

    try:
        with DatabaseConnection() as cursor:
            for repo in repositories:
                query = """
                    INSERT INTO repositories (id, name, full_name, description, url, stars, avatar)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                data = (repo['id'], repo['name'], repo['full_name'], repo['description'], repo['url'], repo['stars'], repo['avatar'])
                cursor.execute(query, data)
    except Exception as e:
        print(f"Error saving data to database: {e}")
        raise

def check_repo_in_cache(repo_id: int) -> bool:  
    redis_service = RedisService()
    is_cached = redis_service.check_cache(repo_id)

    if is_cached:
        print(f"Repository with ID {repo_id} is already cached")
    else:
        print(f"Repository with ID {repo_id} is not cached")

    return is_cached

def extract_data_sent_cache(repo_id: int):
    redis_service = RedisService()
    try:      
        repo_data = get_repo_data_from_db(repo_id)

        if repo_data:          
            repo_dict = {
                'id': repo_data[0],
                'name': repo_data[1],
                'full_name': repo_data[2],
                'description': repo_data[3],
                'url': repo_data[4],
                'stars': repo_data[5],
                'avatar': repo_data[6]
            }

            redis_service.store_data(repo_dict['id'], repo_dict)
        else:
            print(f"No data found in database for repo ID {repo_id}")
    except Exception as e:
        print(f"Error storing data in Redis: {e}")
        raise

def get_repo_data_from_db(repo_id: int):
    try:
        with DatabaseConnection() as cursor:
            query = """
                SELECT id, name, full_name, description, url, stars, avatar
                FROM repositories
                WHERE id = %s
            """
            cursor.execute(query, (repo_id,))
            repo_data = cursor.fetchone()
            return repo_data
    except Exception as e:
        print(f"Error fetching data from database: {e}")
        raise

def extract_data_sent_queue(repo_id: str):
    # Step 4: Send event to RabbitMQ producer
    rabbitmq_service = RabbitMQService()
    try:
        message = {
            "repo_id": repo_id
        }
        rabbitmq_service.send_message(repo_id) #24953448
    except Exception as e:
        print(f"Error sending message to RabbitMQ: {e}")
        raise

    # Close RabbitMQ connection
    try:
        rabbitmq_service.close_connection()
    except Exception as e:
        print(f"Error closing RabbitMQ connection: {e}")
        raise
    