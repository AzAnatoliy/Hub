#!/bin/bash

# Главный скрипт установки Media Hub v3.0
# Использование: chmod +x install.sh && ./install.sh
# ВАЖНО: НЕ запускайте от root! Скрипт сам запросит sudo где нужно.

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Функции вывода
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"
}

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# Проверка что НЕ root
if [ "$EUID" -eq 0 ]; then
    print_error "НЕ запускайте этот скрипт от root!"
    print_info "Запустите: ./install.sh (без sudo)"
    exit 1
fi

REAL_USER=$USER
REAL_HOME=$HOME

print_header "🎯 Установка Media Hub v3.0"

# Шаг 1: Базовые пакеты (без apt upgrade!)
print_header "📦 Шаг 1: Установка базовых пакетов"
sudo apt update
sudo apt install -y \
    curl wget git htop \
    net-tools usbutils pciutils \
    lm-sensors smartmontools \
    ca-certificates gnupg lsb-release
print_success "Базовые пакеты установлены"

# Шаг 2: Мультимедиа компоненты
print_header "🎬 Шаг 2: Установка мультимедиа компонентов"
sudo apt install -y \
    mpv va-driver-all vainfo \
    alsa-utils pulseaudio-utils \
    qbittorrent retroarch
print_success "Мультимедиа компоненты установлены"

# Шаг 3: Модем
print_header "📡 Шаг 3: Настройка модема"
sudo apt install -y modemmanager network-manager-gnome
sudo systemctl enable ModemManager
sudo systemctl start ModemManager
print_success "ModemManager установлен"

# Шаг 4: Docker (без curl | sh от root)
print_header "🐳 Шаг 4: Установка Docker"
if ! command -v docker &> /dev/null; then
    # Используем официальный репозиторий Docker
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker $REAL_USER
    print_success "Docker установлен"
    print_warning "Перезагрузитесь или выполните 'newgrp docker' для применения групп"
else
    print_info "Docker уже установлен"
fi

# Шаг 5: Node.js 22 LTS
print_header "📦 Шаг 5: Установка Node.js 22 LTS"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
    print_success "Node.js 22 установлен"
else
    NODE_VERSION=$(node -v | cut -d'.' -f1 | tr -d 'v')
    if [ "$NODE_VERSION" -lt 22 ]; then
        print_warning "Node.js версия ниже 22. Обновление..."
        curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
    print_info "Node.js уже установлен: $(node -v)"
fi

# Шаг 6: Зависимости проекта
print_header "📦 Шаг 6: Установка зависимостей проекта"
# Определяем директорию проекта
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

npm install
print_success "Зависимости установлены"

# Шаг 7: Сборка веб-интерфейса
print_header "🔨 Шаг 7: Сборка веб-интерфейса"
npm run build
print_success "Веб-интерфейс собран"

# Шаг 8: Создание структуры директорий
print_header "📁 Шаг 8: Создание структуры директорий"
mkdir -p ~/media/{movies,tv,music,photos,downloads,recordings}
mkdir -p ~/media/recordings/{cam1,cam2}
mkdir -p data
print_success "Структура создана"

# Шаг 9: Настройка .env
print_header "⚙️  Шаг 9: Настройка .env"
if [ ! -f .env ]; then
    cp .env.example .env
    print_warning "Создан .env из .env.example"
    print_info "Отредактируйте .env и укажите свои данные!"
else
    print_info ".env уже существует"
fi

# Шаг 10: Docker контейнеры
print_header "🐳 Шаг 10: Запуск Docker контейнеров"
cd docker
docker compose up -d
cd ..
print_success "Docker контейнеры запущены"

# Шаг 11: Mihomo (от имени пользователя)
print_header "🌐 Шаг 11: Установка Mihomo прокси"
chmod +x scripts/install-mihomo.sh
./scripts/install-mihomo.sh
print_success "Mihomo установлен"

# Шаг 12: Hermes AI
print_header "🤖 Шаг 12: Установка Hermes AI"
chmod +x scripts/install-hermes.sh
./scripts/install-hermes.sh
print_success "Hermes AI установлен"

# Шаг 13: Настройка звука (от имени пользователя)
print_header "🎵 Шаг 13: Настройка звука"
chmod +x scripts/setup-audio.sh
./scripts/setup-audio.sh
print_success "Звук настроен"

# Шаг 14: Автозапуск (от имени пользователя)
print_header "🚀 Шаг 14: Настройка автозапуска"
chmod +x scripts/setup-autostart.sh
./scripts/setup-autostart.sh
print_success "Автозапуск настроен"

# Шаг 15: Firewall (с предупреждением о Docker)
print_header "🔒 Шаг 15: Настройка firewall"
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 5173/tcp    # Vite dev server
sudo ufw allow 8080/tcp    # Media Hub Web
sudo ufw --force enable

print_warning "ВАЖНО: Docker публикует порты в обход UFW!"
print_info "Порты привязаны к 127.0.0.1 в docker-compose.yml"
print_info "Для доступа из сети измените LAN_IP в .env на ваш IP"
print_success "Firewall настроен"

# Финальная информация
print_header "✅ Установка завершена!"

echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Media Hub v3.0 успешно установлен!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}🌐 Веб-интерфейсы (локально):${NC}"
echo -e "  Media Hub:      http://localhost:8080"
echo -e "  Jellyfin:       http://localhost:8096"
echo -e "  Sonarr:         http://localhost:8989"
echo -e "  Radarr:         http://localhost:7878"
echo -e "  qBittorrent:    http://localhost:8081"
echo -e "  Home Assistant: http://localhost:8123"
echo -e "  AdGuard Home:   http://localhost:3000"
echo -e "  Go2RTC:         http://localhost:1984"
echo ""

echo -e "${YELLOW}⚠️  Следующие шаги:${NC}"
echo -e "  1. Отредактируйте .env (укажите свои данные)"
echo -e "  2. Настройте Mihomo: sudo nano /etc/mihomo/config.yaml"
echo -e "  3. Настройте USB ЦАП: aplay -l && cat /proc/asound/cards"
echo -e "  4. Настройте Jellyfin: http://localhost:8096"
echo -e "  5. Настройте Sonarr/Radarr (qBittorrent на localhost:8081)"
echo -e "  6. Добавьте IP-камеры в configs/go2rtc/go2rtc.yaml"
echo -e "  7. Настройте Home Assistant: http://localhost:8123"
echo ""

echo -e "${GREEN}🎉 Перезагрузите систему для применения всех настроек:${NC}"
echo -e "  sudo reboot"
echo ""
