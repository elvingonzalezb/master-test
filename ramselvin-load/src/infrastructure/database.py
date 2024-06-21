import psycopg2
from psycopg2 import OperationalError
from src.infrastructure.settings import settings

class DatabaseConnection:
    def __init__(self):
        self.conn = self.connect()

    def connect(self):
        try:
            print("Connecting to PostgreSQL Database...")
            conn = psycopg2.connect(
                host=settings.DATABASE_HOST,
                database=settings.DATABASE_NAME,
                user=settings.DATABASE_USER,
                password=settings.DATABASE_PASSWORD,
                port=settings.DATABASE_PORT
            )
            return conn
        except OperationalError as e:
            print(f"Could not connect to Database: {e}")
            raise

    def __enter__(self):
        self.cursor = self.conn.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.commit()
            self.cursor.close()
            self.conn.close()
