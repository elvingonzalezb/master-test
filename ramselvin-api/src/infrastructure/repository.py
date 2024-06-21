from src.infrastructure.database import DatabaseConnection
from src.domain.repository import RecordRepository

class PostgresRecordRepository(RecordRepository):
    def count_records(self, table_name: str) -> int:
        query = f"SELECT COUNT(*) FROM {table_name}"
        with DatabaseConnection() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
            return result[0]
