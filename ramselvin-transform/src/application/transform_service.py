from src.application.rabbitmq_service import RabbitMQService
from src.infrastructure.database import DatabaseConnection
from src.infrastructure.transforms.data_cleaner import DataCleaner

def execute_transform_cleaner():
    try:
        data = get_all_data_for_cleaner()
        cleaner = DataCleaner()
        cleaned_data = cleaner.clean(data)        
        return cleaned_data
    except Exception as e:
        print(f"Error during data cleaning: {e}")
        return False

def get_all_data_for_cleaner():
    try:
        with DatabaseConnection() as cursor:
            query = """
                SELECT id, name, full_name, description, url, stars, avatar
                FROM repositories
            """
            cursor.execute(query)
            repo_data = cursor.fetchall()
            return repo_data
    except Exception as e:
        print(f"Error fetching data from database: {e}")
        raise
    
    
def transform_data_save():  
    repositories = execute_transform_cleaner()  
    if not repositories:
        print("No repositories data found. Aborting save process.")
        return

    try:
        with DatabaseConnection() as cursor:
            for repo in repositories:
                query = """
                    INSERT INTO data_transformada (id, name, full_name, description, url, stars, avatar)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                data = (repo['id'], repo['name'], repo['full_name'], repo['description'], repo['url'], repo['stars'], repo['avatar'])
                cursor.execute(query, data)
    except Exception as e:
        print(f"Error saving data to database: {e}")
        raise
    
# def execute_transform_converter() -> bool:  
#     redis_service = DatabaseConnection()
#     pass

# def execute_transform_aggregator() -> bool:  
#     redis_service = DatabaseConnection()
#     pass

# def execute_transform_integration() -> bool:  
#     redis_service = DatabaseConnection()
#     pass    

# def transform_data_sent_queue(repo_id: str):   
#     rabbitmq_service = RabbitMQService()
#     try:
#         message = {
#             "repo_id": repo_id
#         }
#         rabbitmq_service.send_message(repo_id)
#     except Exception as e:
#         print(f"Error sending message to RabbitMQ: {e}")
#         raise

#     # Close RabbitMQ connection
#     try:
#         rabbitmq_service.close_connection()
#     except Exception as e:
#         print(f"Error closing RabbitMQ connection: {e}")
#         raise
    