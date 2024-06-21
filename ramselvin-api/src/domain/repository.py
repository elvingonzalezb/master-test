from abc import ABC, abstractmethod

class RecordRepository(ABC):
    @abstractmethod
    def count_records(self, table_name: str) -> int:
        pass
