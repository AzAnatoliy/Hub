#!/bin/bash

# Настройка автозапуска веб-оболочки
# Использование: chmod +x setup-autostart.sh && ./setup-autostart.sh
# ВАЖНО: Запускайте от имени пользователя, НЕ от root!

set -e

if [ "$EUID" -eq 0 ]; then
    echo "❌ НЕ запускайте от root! Запустите: ./setup-autostart.sh"
    exit 1
fi

REAL_USER=$USER
REAL_HOME=$HOME

echo "🚀 Настройка автозапуска веб-оболочки..."

# Проверка наличия сборки
if [ ! -d "dist" ]; then
    echo "⚠️  Папка dist не найдена. Запустите 'npm run build'"
    exit 1
fi

# Создание директории для веб-интерфейса в домашней папке пользователя
WEB_DIR="$REAL_HOME/.local/share/media-hub"
echo "📁 Создание директории: $WEB_DIR"
mkdir -p "$WEB_DIR"
cp -r dist/* "$WEB_DIR/"

# Создание systemd сервиса для веб-сервера (от имени пользователя)
echo "🔧 Создание systemd сервиса пользователя..."
mkdir -p "$REAL_HOME/.config/systemd/user"

cat > "$REAL_HOME/.config/systemd/user/media-hub-web.service" << EOF
[Unit]
Description=Media Hub Web Interface
After=network.target

[Service]
Type=simple
User=$REAL_USER
WorkingDirectory=$WEB_DIR
ExecStart=/usr/bin/python3 -m http.server 8080 --bind 127.0.0.1
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF

# Активация сервиса пользователя
echo "🚀 Активация веб-сервера..."
systemctl --user daemon-reload
systemctl --user enable media-hub-web
systemctl --user start media-hub-web

# Включаем linger для работы без входа в систему
sudo loginctl enable-linger $REAL_USER

# Создание .desktop файла для автозапуска браузера
echo "🌐 Настройка автозапуска браузера..."
mkdir -p "$REAL_HOME/.config/autostart"

cat > "$REAL_HOME/.config/autostart/media-hub.desktop" << EOF
[Desktop Entry]
Type=Application
Name=Media Hub
Comment=Media Hub Web Interface
Exec=$REAL_HOME/.local/bin/start-media-hub.sh
X-GNOME-Autostart-enabled=true
Terminal=false
StartupNotify=false
EOF

# Создание скрипта для запуска в полноэкранном режиме
mkdir -p "$REAL_HOME/.local/bin"

cat > "$REAL_HOME/.local/bin/start-media-hub.sh" << 'EOF'
#!/bin/bash
# Запуск Media Hub в полноэкранном режиме

# Ожидание запуска веб-сервера
sleep 5

# Проверка доступности
if curl -s http://127.0.0.1:8080 > /dev/null; then
    echo "✅ Media Hub доступен"
else
    echo "❌ Media Hub недоступен"
    exit 1
fi

# Запуск браузера в режиме киоска
firefox --kiosk http://127.0.0.1:8080 &

# Скрыть курсор мыши (опционально)
if command -v unclutter &> /dev/null; then
    unclutter -idle 3 &
fi

echo "🎯 Media Hub запущен!"
EOF

chmod +x "$REAL_HOME/.local/bin/start-media-hub.sh"

# Создание ярлыка на рабочем столе
DESKTOP_FILE="$REAL_HOME/Desktop/Media Hub.desktop"
mkdir -p "$REAL_HOME/Desktop"

cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Media Hub
Comment=Media Hub Control Panel
Exec=$REAL_HOME/.local/bin/start-media-hub.sh
Icon=applications-multimedia
Terminal=false
Categories=AudioVideo;Player;
EOF

chmod +x "$DESKTOP_FILE"

# Настройка CEC (предупреждение о совместимости)
echo ""
echo "📺 HDMI CEC:"
echo "⚠️  ВНИМАНИЕ: HDMI на обычных ноутбуках НЕ пропускает CEC сигналы!"
echo "   Для управления пультом нужен USB-адаптер Pulse-Eight или аналог."
echo "   Документация: https://www.pulse-eight.com/p/104-usb-hdmi-cec-adapter"
echo ""

# Если есть USB CEC адаптер
if command -v cec-client &> /dev/null; then
    echo "✅ cec-client найден"
    
    cat > "$REAL_HOME/.local/bin/cec-control.sh" << 'EOF'
#!/bin/bash
# Управление через HDMI CEC (только с USB-адаптером!)

# Активация TV
echo "on 0" | cec-client -s -d 1

# Переключение на правильный вход
echo "as" | cec-client -s -d 1

# Запуск браузера
~/.local/bin/start-media-hub.sh
EOF
    
    chmod +x "$REAL_HOME/.local/bin/cec-control.sh"
else
    echo "📦 Для CEC установите: sudo apt install cec-utils"
    echo "   И подключите USB CEC адаптер"
fi

echo ""
echo "✅ Настройка автозапуска завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  systemctl --user status media-hub-web     # Статус веб-сервера"
echo "  systemctl --user restart media-hub-web    # Перезапуск"
echo "  ~/.local/bin/start-media-hub.sh           # Запуск вручную"
echo ""
echo "🌐 Веб-интерфейс доступен:"
echo "  http://127.0.0.1:8080                     # Локально"
echo ""
echo "⚠️  Порт привязан к 127.0.0.1 (безопасно)"
echo "   Для доступа из сети измените --bind в сервисе"
echo ""
