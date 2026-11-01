#!/bin/bash

# Установка Mihomo прокси (Россия)
# Использование: chmod +x install-mihomo.sh && ./install-mihomo.sh
# ВАЖНО: НЕ запускайте от root!

set -e

if [ "$EUID" -eq 0 ]; then
    echo "❌ НЕ запускайте от root!"
    exit 1
fi

echo "🚀 Установка Mihomo прокси..."

# Создание директорий
echo "📁 Создание директорий..."
sudo mkdir -p /etc/mihomo
sudo mkdir -p /var/log/mihomo
sudo chown $USER:$USER /etc/mihomo

# Скачивание последней версии
echo "📥 Скачивание Mihomo..."
VERSION=$(curl -s https://api.github.com/repos/MetaCubeX/mihomo/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
wget -q "https://github.com/MetaCubeX/mihomo/releases/download/${VERSION}/mihomo-linux-amd64-${VERSION}.gz" -O /tmp/mihomo.gz

# Распаковка
echo "📦 Распаковка..."
gunzip -f /tmp/mihomo.gz
sudo mv /tmp/mihomo /usr/local/bin/mihomo
sudo chmod +x /usr/local/bin/mihomo

# Создание конфигурации (копирование из example)
echo "⚙️  Создание конфигурации..."
if [ ! -f /etc/mihomo/config.yaml ]; then
    if [ -f "configs/mihomo/config.yaml.example" ]; then
        sudo cp configs/mihomo/config.yaml.example /etc/mihomo/config.yaml
        echo "✅ Конфигурация скопирована из configs/mihomo/config.yaml.example"
    else
        echo "⚠️  configs/mihomo/config.yaml.example не найден"
        echo "   Создайте конфигурацию вручную: sudo nano /etc/mihomo/config.yaml"
    fi
else
    echo "ℹ️  Конфигурация уже существует: /etc/mihomo/config.yaml"
fi

echo "⚠️  Отредактируйте /etc/mihomo/config.yaml и укажите свои данные прокси!"
echo "   ВАЖНО: Настройте authentication и external-controller!"

# Создание systemd сервиса
echo "🔧 Создание systemd сервиса..."
sudo tee /etc/systemd/system/mihomo.service > /dev/null << 'EOF'
[Unit]
Description=Mihomo Proxy Service
Documentation=https://wiki.metacubex.one/
After=network.target NetworkManager.service systemd-networkd.service

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
Restart=on-failure
RestartSec=5s
LimitNOFILE=65535

# Безопасность
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
EOF

# Активация сервиса
echo "🚀 Активация сервиса..."
sudo systemctl daemon-reload
sudo systemctl enable mihomo
sudo systemctl start mihomo

# Проверка статуса
echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  sudo systemctl status mihomo     # Статус сервиса"
echo "  sudo systemctl restart mihomo    # Перезапуск"
echo "  sudo journalctl -u mihomo -f     # Логи"
echo ""
echo "🌐 Веб-интерфейс (если настроен external-controller):"
echo "  http://127.0.0.1:9090/ui         # Yacd/Metacubexd панель"
echo ""
echo "⚙️  Настройка:"
echo "  sudo nano /etc/mihomo/config.yaml"
echo ""
echo "🔒 Безопасность:"
echo "  - Настройте authentication для LAN доступа"
echo "  - Настройте secret для панели управления"
echo "  - external-controller привязан к 127.0.0.1"
echo ""
