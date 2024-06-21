from src.infrastructure.rabbitmq import RabbitMQProducer

class RabbitMQService:
    def __init__(self):
        self.rabbitmq_producer = RabbitMQProducer()

    def send_message(self, message):
        try:
            self.rabbitmq_producer.send_message(message)
        except Exception as e:
            print(f"Error sending message to RabbitMQ: {e}")
            raise

    def close_connection(self):
        try:
            self.rabbitmq_producer.close_connection()
        except Exception as e:
            print(f"Error closing RabbitMQ connection: {e}")
            raise
