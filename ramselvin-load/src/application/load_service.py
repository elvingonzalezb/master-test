from src.infrastructure.database import DatabaseConnection

def load_data_save():
    repositories = get_all_data_transform()
    if not repositories:
        print("No repositories data found. Aborting save process.")
        return

    try:
        with DatabaseConnection() as cursor:
            for repo in repositories:             
                if not isinstance(repo, (list, tuple)):
                    raise ValueError(f"Expected repository to be a list or tuple, but got {type(repo)}")

                query = """
                    INSERT INTO data_completada (id, name, full_name, description, url, stars, avatar)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                data = (
                    repo[0],
                    repo[1],
                    repo[2], 
                    repo[3], 
                    repo[4], 
                    repo[5], 
                    repo[6] 
                )          
        
                cursor.execute(query, data)
    except Exception as e:
        print(f"Error saving data to database: {e}")
        raise


def get_all_data_transform():
    try:
        with DatabaseConnection() as cursor:
            query = """
                SELECT id, name, full_name, description, url, stars, avatar
                FROM data_transformada
            """
            cursor.execute(query)
            repo_data = cursor.fetchall()
            return repo_data
    except Exception as e:
        print(f"Error fetching data from database: {e}")
        raise
    
def get_all_data_complete():
    try:
        with DatabaseConnection() as cursor:
            query = """
                SELECT id, name, full_name, description, url, stars, avatar
                FROM data_completada
            """
            cursor.execute(query)
            repo_data = cursor.fetchall()
            return repo_data
    except Exception as e:
        print(f"Error fetching data from database: {e}")
        raise
    