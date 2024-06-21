import ast
import pika
import sys
import time
import os

from config import (
    RUN,
    SLEEP,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_EXCHANGE,
    RABBITMQ_QUEUE,
    RABBITMQ_ROUTING_KEY
)

def main():
    while RUN:
        # Credentials
        credentials = pika.PlainCredentials(
            username=RABBITMQ_USERNAME,
            password=RABBITMQ_PASSWORD
        )
        # Params
        params = pika.ConnectionParameters(
            host=RABBITMQ_HOST,
            port=RABBITMQ_PORT,
            credentials=credentials
        )
        # Connection
        connection = pika.BlockingConnection(params)
        # Channel
        channel = connection.channel()
        # Declare type queue
        channel.queue_declare(
            queue=RABBITMQ_QUEUE,
            durable=True
        )

        print("Consumer Running")

        def callback(ch, method, properties, body):
            print(" [x] Message Received: %r" % ast.literal_eval(body.decode()))
            time.sleep(SLEEP)

        # Channel for consumer
        channel.basic_consume(
            queue=RABBITMQ_QUEUE,
            on_message_callback=callback,
            auto_ack=True
        )

        print(' [*] Wait for messages. Press to exit CTRL+C')
        channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)