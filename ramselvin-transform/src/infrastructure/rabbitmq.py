import pika
import json
from src.infrastructure.settings import settings

class RabbitMQProducer:
    def __init__(self):
        self.rabbitmq_url = pika.URLParameters(f"amqps://{settings.RABBITMQ_USERNAME}:{settings.RABBITMQ_PASSWORD}@{settings.RABBITMQ_HOST}:{settings.RABBITMQ_PORT}/")
        self.connection = None
        self.channel = None    

    def connect(self):
        try:
            self.connection = pika.BlockingConnection(self.rabbitmq_url)
            self.channel = self.connection.channel()
            self.channel.exchange_declare(exchange=settings.RABBITMQ_EXCHANGE, exchange_type='direct')
            self.channel.queue_declare(queue=settings.RABBITMQ_QUEUE, durable=True)
            self.channel.queue_bind(exchange=settings.RABBITMQ_EXCHANGE, queue=settings.RABBITMQ_QUEUE, routing_key=settings.RABBITMQ_ROUTING_KEY)
        except Exception as e:
            print(f"Failed to establish RabbitMQ connection: {e}")
            raise

    def send_message(self, message):
        try:
            if not self.connection or self.connection.is_closed:
                self.connect()         

            message_body = json.dumps(message)
            self.channel.basic_publish(
                exchange=settings.RABBITMQ_EXCHANGE,
                routing_key=settings.RABBITMQ_ROUTING_KEY,
                body=message_body.encode('utf-8')
            )
            print(f" [x] Message Out sent: {message_body}")

        except Exception as e:
            print(f"Error sending message to RabbitMQ: {e}")
            raise

    def close_connection(self):
        try:
            if self.connection and not self.connection.is_closed:
                self.connection.close()
                print("RabbitMQ connection closed.")
        except Exception as e:
            print(f"Failed to close RabbitMQ connection: {e}")
