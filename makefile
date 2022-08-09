# HOME=/home/mbari

# Colors variables
RED = \033[1;31m
GREEN = \033[1;32m
YELLOW = \033[1;33m
BLUE = \033[1;34m
RESET = \033[0m

all: credit build up


ls:
	@echo "$(GREEN)██████████████████████████ IMAGES ███████████████████████████$(RESET)"
	@docker images
	@echo "$(YELLOW)██████████████████████ ALL CONTAINERS ███████████████████████$(RESET)"
	@docker ps -a
	@echo "$(BLUE)██████████████████████ ALL NETWORKS ███████████████████████$(RESET)"
	@docker network ls
	@echo "$(RED)██████████████████████ ALL VOLUMES ███████████████████████$(RESET)"
	@docker volume ls

build:
	@echo "$(BLUE)██████████████████████ Building Images ███████████████████████$(RESET)"
	docker-compose build

up:
	@echo "$(GREEN)██████████████████████ Running Containers ██████████████████████$(RESET)"
	@docker-compose up -d
	@echo "$(RED)╔════════════════════════════║NOTE:║════════════════════════╗$(RESET)"
	@echo "$(RED)║   $(BLUE) You can see The Containers logs using $(YELLOW)make logs        $(RED)║$(RESET)"
	@echo "$(RED)╚═══════════════════════════════════════════════════════════╝$(RESET)"


logs:
	@echo "$(GREEN)██████████████████████ Running Containers ██████████████████████$(RESET)"
	docker-compose logs


status:
	@echo "$(GREEN)██████████████████████ The Running Containers ██████████████████████$(RESET)"
	docker ps


stop:
	@echo "$(RED)████████████████████ Stoping Containers █████████████████████$(RESET)"
	docker-compose stop

start:
	@echo "$(RED)████████████████████ Starting Containers █████████████████████$(RESET)"
	docker-compose start

down:
	@echo "$(RED)██████████████████ Removing All Containers ██████████████████$(RESET)"
	docker-compose down

reload: down build up

rm: down
	@echo "$(RED)█████████████████████ Remove Everything ██████████████████████$(RESET)"
	docker system prune -a

# rvolumes:
# 	@echo "$(RED)█████████████████████ Deleting volumes ██████████████████████$(RESET)"
# 	sudo rm -rf $(HOME)/data

# volumes:
# 	@echo "$(GREEN)█████████████████████ Creating volumes ██████████████████████$(RESET)"
# 	mkdir -p $(HOME)/data/db-data
# 	mkdir -p $(HOME)/data/www-data
# 	mkdir -p $(HOME)/data/backup-data


# Print Credit
credit:
	@echo "███╗   ██╗███████╗███████╗████████╗     ██╗███████╗"
	@echo "████╗  ██║██╔════╝██╔════╝╚══██╔══╝     ██║██╔════╝"
	@echo "██╔██╗ ██║█████╗  ███████╗   ██║        ██║███████╗"
	@echo "██║╚██╗██║██╔══╝  ╚════██║   ██║   ██   ██║╚════██║"
	@echo "██║ ╚████║███████╗███████║   ██║   ╚█████╔╝███████║"
	@echo "╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝    ╚════╝ ╚══════╝"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "━━━━━━━━━━━━━━━━━━━━┃Made with love by : \033[1;91mmbari\033[m┃━━━━━━━━━━━━━━━━━━━━━"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"








