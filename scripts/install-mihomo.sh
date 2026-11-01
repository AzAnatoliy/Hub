#!/bin/bash

# Установка Mihomo прокси
# Использование: chmod +x install-mihomo.sh && ./install-mihomo.sh

set -e

echo "🚀 Установка Mihomo прокси..."

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Запустите скрипт с правами root: sudo $0"
    exit 1
fi

# Создание директорий
echo "📁 Создание директорий..."
mkdir -p /etc/mihomo
mkdir -p /var/log/mihomo

# Скачивание последней версии
echo "📥 Скачивание Mihomo..."
VERSION=$(curl -s https://api.github.com/repos/MetaCubeX/mihomo/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
wget -q "https://github.com/MetaCubeX/mihomo/releases/download/${VERSION}/mihomo-linux-amd64-${VERSION}.gz" -O /tmp/mihomo.gz

# Распаковка
echo "📦 Распаковка..."
gunzip -f /tmp/mihomo.gz
mv /tmp/mihomo /usr/local/bin/mihomo
chmod +x /usr/local/bin/mihomo

# Создание конфигурации по умолчанию
echo "⚙️  Создание конфигурации..."
cat > /etc/mihomo/config.yaml << 'EOF'
# Mihomo конфигурация
# Документация: https://wiki.metacubex.one/

mixed-port: 7890
allow-lan: true
bind-address: '*'
mode: rule
log-level: info
ipv6: false

# DNS настройки
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - '*.lan'
    - localhost.ptlogin2.qq.com
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://dns.cloudflare.com/dns-query
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4

# Пример прокси-сервера (замените на свои данные)
proxies:
  - name: "example-vless"
    type: vless
    server: your-server.com
    port: 443
    uuid: your-uuid-here
    network: ws
    tls: true
    udp: true
    ws-opts:
      path: /path
      headers:
        Host: your-server.com

# Правила маршрутизации
proxy-groups:
  - name: "Proxy"
    type: select
    proxies:
      - example-vless
      - DIRECT

rules:
  # Китайские домены -> прямой доступ
  - GEOIP,CN,DIRECT
  # Остальное -> через прокси
  - MATCH,Proxy
EOF

echo "✅ Конфигурация создана: /etc/mihomo/config.yaml"
echo "⚠️  Отредактируйте файл и укажите свои данные прокси!"

# Создание systemd сервиса
echo "🔧 Создание systemd сервиса..."
cat > /etc/systemd/system/mihomo.service << 'EOF'
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
systemctl daemon-reload
systemctl enable mihomo
systemctl start mihomo

# Проверка статуса
echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  systemctl status mihomo     # Статус сервиса"
echo "  systemctl restart mihomo    # Перезапуск"
echo "  journalctl -u mihomo -f     # Логи"
echo ""
echo "🌐 Веб-интерфейс:"
echo "  http://127.0.0.1:9090/ui    # Yacd面板"
echo ""
echo "⚙️  Настройка:"
echo "  sudo nano /etc/mihomo/config.yaml"
echo ""
