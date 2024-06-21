FROM python:3.11 AS builder

WORKDIR /usr/srv

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN useradd -rm -d /code -s /bin/bash -g root -G sudo -u 1001 ubuntu

COPY ./requirements.txt /usr/srv/requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

USER ubuntu

FROM python:3.9-slim

WORKDIR /usr/srv

COPY --from=builder /usr/srv .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 4000

CMD bash -c 'uvicorn src.main:app --host 0.0.0.0 --port 4000 --reload'

