#!/bin/bash

# Настройка автозапуска веб-оболочки
# Использование: chmod +x setup-autostart.sh && ./setup-autostart.sh

set -e

echo "🚀 Настройка автозапуска веб-оболочки..."

# Проверка наличия сборки
if [ ! -d "dist" ]; then
    echo "⚠️  Папка dist не найдена. Запустите 'npm run build'"
    exit 1
fi

# Создание директории для веб-интерфейса
WEB_DIR="/var/www/media-hub"
echo "📁 Создание директории: $WEB_DIR"
sudo mkdir -p "$WEB_DIR"
sudo cp -r dist/* "$WEB_DIR/"
sudo chown -R $USER:$USER "$WEB_DIR"

# Создание systemd сервиса для веб-сервера
echo "🔧 Создание systemd сервиса..."
sudo tee /etc/systemd/system/media-hub-web.service > /dev/null << EOF
[Unit]
Description=Media Hub Web Interface
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$WEB_DIR
ExecStart=/usr/bin/python3 -m http.server 8080 --bind 0.0.0.0
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

# Активация сервиса
echo "🚀 Активация веб-сервера..."
sudo systemctl daemon-reload
sudo systemctl enable media-hub-web
sudo systemctl start media-hub-web

# Создание .desktop файла для автозапуска браузера
echo "🌐 Настройка автозапуска браузера..."
mkdir -p ~/.config/autostart

cat > ~/.config/autostart/media-hub.desktop << EOF
[Desktop Entry]
Type=Application
Name=Media Hub
Comment=Media Hub Web Interface
Exec=firefox --kiosk http://localhost:8080
X-GNOME-Autostart-enabled=true
Terminal=false
StartupNotify=false
EOF

# Создание скрипта для запуска в полноэкранном режиме
cat > ~/start-media-hub.sh << 'EOF'
#!/bin/bash
# Запуск Media Hub в полноэкранном режиме

# Ожидание запуска веб-сервера
sleep 5

# Проверка доступности
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Media Hub доступен"
else
    echo "❌ Media Hub недоступен"
    exit 1
fi

# Запуск браузера в режиме киоска
firefox --kiosk http://localhost:8080 &

# Скрыть курсор мыши (опционально)
if command -v unclutter &> /dev/null; then
    unclutter -idle 3 &
fi

echo "🎯 Media Hub запущен!"
EOF

chmod +x ~/start-media-hub.sh

# Создание ярлыка на рабочем столе
DESKTOP_FILE=~/Desktop/Media\ Hub.desktop
cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Media Hub
Comment=Media Hub Control Panel
Exec=$HOME/start-media-hub.sh
Icon=applications-multimedia
Terminal=false
Categories=AudioVideo;Player;
EOF

chmod +x "$DESKTOP_FILE"

# Настройка CEC (управление пультом через HDMI)
echo "📺 Настройка HDMI CEC..."
if ! command -v cec-client &> /dev/null; then
    echo "📦 Установка libcec..."
    sudo apt install -y cec-utils
fi

# Создание скрипта для CEC
cat > ~/cec-control.sh << 'EOF'
#!/bin/bash
# Управление через HDMI CEC

# Активация TV
echo "on 0" | cec-client -s -d 1

# Переключение на правильный вход
echo "as" | cec-client -s -d 1

# Запуск браузера
~/start-media-hub.sh
EOF

chmod +x ~/cec-control.sh

echo ""
echo "✅ Настройка автозапуска завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  systemctl status media-hub-web     # Статус веб-сервера"
echo "  systemctl restart media-hub-web    # Перезапуск"
echo "  ~/start-media-hub.sh               # Запуск вручную"
echo "  ~/cec-control.sh                   # Запуск с HDMI CEC"
echo ""
echo "🌐 Веб-интерфейс доступен:"
echo "  http://localhost:8080              # Локально"
echo "  http://<IP-адрес>:8080             # Из сети"
echo ""
echo "🔧 Настройка firewall (опционально):"
echo "  sudo ufw allow 8080/tcp            # Открыть порт"
echo ""
