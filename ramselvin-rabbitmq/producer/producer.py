import pika
import time
import json

# Only for test
from faker import Faker

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
# Data for test
fake = Faker()

print("Outs Producer Running")

while RUN:
    outMessage = {
        "nombre": fake.name(),
        "dirección": fake.address(),        
        "game_id": "game123",
        "equipo_al_bate": "teamA",
        "inning": 5,
        "bateador": "player45",
        "evento": "strike",
        "detalles": {
            "cont_strikes": 1,
            "cont_bolas": 2
        }
    }

    channel.basic_publish(
        exchange=RABBITMQ_EXCHANGE,
        routing_key=RABBITMQ_ROUTING_KEY,
        body=str(outMessage)
    )

    print(" [.] Message Out sent to: %r" % outMessage)

    time.sleep(SLEEP)
