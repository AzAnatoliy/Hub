#!/bin/bash

# Главный скрипт установки Media Hub v3.0
# Использование: chmod +x install.sh && sudo ./install.sh

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции вывода
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    print_error "Запустите скрипт с правами root: sudo $0"
    exit 1
fi

# Получение имени пользователя
REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

print_header "🎯 Установка Media Hub v3.0"

# Шаг 1: Обновление системы
print_header "📦 Шаг 1: Обновление системы"
apt update
apt upgrade -y
print_success "Система обновлена"

# Шаг 2: Установка базовых пакетов
print_header "📦 Шаг 2: Установка базовых пакетов"
apt install -y \
    curl \
    wget \
    git \
    htop \
    net-tools \
    usbutils \
    pciutils \
    lm-sensors \
    smartmontools
print_success "Базовые пакеты установлены"

# Шаг 3: Установка мультимедиа компонентов
print_header "🎬 Шаг 3: Установка мультимедиа компонентов"
apt install -y \
    mpv \
    va-driver-all \
    vainfo \
    alsa-utils \
    pulseaudio-utils \
    qbittorrent \
    retroarch
print_success "Мультимедиа компоненты установлены"

# Шаг 4: Настройка модема
print_header "📡 Шаг 4: Настройка модема"
apt install -y \
    modemmanager \
    network-manager-gnome
systemctl enable ModemManager
systemctl start ModemManager
print_success "ModemManager установлен и запущен"

# Шаг 5: Установка Docker
print_header "🐳 Шаг 5: Установка Docker"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $REAL_USER
    print_success "Docker установлен"
else
    print_info "Docker уже установлен"
fi

# Установка Docker Compose
if ! command -v docker-compose &> /dev/null; then
    apt install -y docker-compose
    print_success "Docker Compose установлен"
else
    print_info "Docker Compose уже установлен"
fi

# Шаг 6: Установка Node.js и npm
print_header "📦 Шаг 6: Установка Node.js"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    print_success "Node.js установлен"
else
    print_info "Node.js уже установлен"
fi

# Шаг 7: Установка зависимостей проекта
print_header "📦 Шаг 7: Установка зависимостей проекта"
cd "$REAL_HOME/media-hub" || exit
sudo -u $REAL_USER npm install
print_success "Зависимости установлены"

# Шаг 8: Сборка веб-интерфейса
print_header "🔨 Шаг 8: Сборка веб-интерфейса"
sudo -u $REAL_USER npm run build
print_success "Веб-интерфейс собран"

# Шаг 9: Настройка Docker контейнеров
print_header "🐳 Шаг 9: Настройка Docker контейнеров"
mkdir -p /home/media/{movies,tv,music,photos,downloads,recordings}
chown -R $REAL_USER:$REAL_USER /home/media

cd docker
docker-compose up -d
print_success "Docker контейнеры запущены"

# Шаг 10: Установка Mihomo
print_header "🌐 Шаг 10: Установка Mihomo прокси"
cd ..
chmod +x scripts/install-mihomo.sh
./scripts/install-mihomo.sh
print_success "Mihomo установлен"

# Шаг 11: Настройка звука
print_header "🎵 Шаг 11: Настройка звука"
chmod +x scripts/setup-audio.sh
sudo -u $REAL_USER ./scripts/setup-audio.sh
print_success "Звук настроен"

# Шаг 12: Настройка автозапуска
print_header "🚀 Шаг 12: Настройка автозапуска"
chmod +x scripts/setup-autostart.sh
./scripts/setup-autostart.sh
print_success "Автозапуск настроен"

# Шаг 13: Настройка firewall
print_header "🔒 Шаг 13: Настройка firewall"
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp      # SSH
ufw allow 8080/tcp    # Media Hub Web
ufw allow 8096/tcp    # Jellyfin
ufw allow 8989/tcp    # Sonarr
ufw allow 7878/tcp    # Radarr
ufw allow 8123/tcp    # Home Assistant
ufw allow 3000/tcp    # AdGuard Home
ufw allow 1984/tcp    # Go2RTC
ufw --force enable
print_success "Firewall настроен"

# Шаг 14: Создание структуры директорий
print_header "📁 Шаг 14: Создание структуры директорий"
mkdir -p /home/media/{movies,tv,music,photos,downloads,recordings}
mkdir -p /home/media/recordings/{cam1,cam2}
chown -R $REAL_USER:$REAL_USER /home/media
print_success "Структура создана"

# Финальная информация
print_header "✅ Установка завершена!"

echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Media Hub v3.0 успешно установлен!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}🌐 Веб-интерфейсы:${NC}"
echo -e "  Media Hub:      http://localhost:8080"
echo -e "  Jellyfin:       http://localhost:8096"
echo -e "  Sonarr:         http://localhost:8989"
echo -e "  Radarr:         http://localhost:7878"
echo -e "  Home Assistant: http://localhost:8123"
echo -e "  AdGuard Home:   http://localhost:3000"
echo -e "  Go2RTC:         http://localhost:1984"
echo ""

echo -e "${BLUE}📋 Полезные команды:${NC}"
echo -e "  systemctl status media-hub-web    # Статус веб-интерфейса"
echo -e "  docker ps                         # Статус контейнеров"
echo -e "  systemctl status mihomo           # Статус прокси"
echo -e "  ~/start-media-hub.sh              # Запуск интерфейса"
echo ""

echo -e "${YELLOW}⚠️  Следующие шаги:${NC}"
echo -e "  1. Отредактируйте /etc/mihomo/config.yaml (укажите данные прокси)"
echo -e "  2. Настройте USB ЦАП: aplay -l"
echo -e "  3. Настройте Jellyfin: http://localhost:8096"
echo -e "  4. Настройте Sonarr/Radarr для автозагрузки"
echo -e "  5. Добавьте IP-камеры в Go2RTC"
echo -e "  6. Настройте Home Assistant"
echo ""

echo -e "${GREEN}🎉 Перезагрузите систему для применения всех настроек:${NC}"
echo -e "  sudo reboot"
echo ""
