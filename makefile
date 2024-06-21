#!/bin/bash

# Variables
OS = $(shell uname)
UID = $(shell id -u)
DOCKER_BE = ramselvin-ms-api-service-be
NAMESERVER_IP = $(shell ip address | grep docker0)
NETWORK = ramselvin-network

# Ajustes según el sistema operativo
ifeq ($(OS), Darwin)
	NAMESERVER_IP := host.docker.internal
else ifeq ($(NAMESERVER_IP),)
	NAMESERVER_IP := $(shell grep nameserver /etc/resolv.conf | cut -d ' ' -f2)
else
	NAMESERVER_IP := 172.17.0.1
endif

help: ## Mostrar lista de comandos disponibles en el make
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' $(MAKEFILE_LIST) | column -t -c 2 -s ':#'


build:## Construir imagenes
	@docker network create ${NETWORK} || true
	@U_ID=${UID} docker-compose build


start: ## Iniciar contenedores, crear network
	@docker network create ${NETWORK} || true
	@U_ID=${UID} docker-compose up -d


stop: ## Detener contenedores
	@U_ID=${UID} docker-compose stop


down: ## Down contenedores
	@U_ID=${UID} docker-compose down --remove-orphans

restart: ## Reiniciar contenedores
	@$(MAKE) stop && $(MAKE) start

logs-api: ## Tails para ver los logs
	@U_ID=${UID} docker exec -it --user ${UID} ${DOCKER_BE} tail -f var/log/dev.log

ssh-api: ## Entrar al contenedor
	@U_ID=${UID} docker exec -it --user ${UID} ${DOCKER_BE} bash
