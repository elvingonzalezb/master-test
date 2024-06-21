from src.infrastructure.repository import PostgresRecordRepository

class RepositoryService:
    def __init__(self):
        self.repository = PostgresRecordRepository()

    def get_record_count(self, table_name: str) -> int:
        try:
            return self.repository.count_records(table_name)
        except Exception as e:
            raise e
