#!/bin/bash

# Установка Hermes AI для Media Hub
# Использование: chmod +x install-hermes.sh && ./install-hermes.sh
# ВАЖНО: НЕ запускайте от root!

set -e

if [ "$EUID" -eq 0 ]; then
    echo "❌ НЕ запускайте от root!"
    exit 1
fi

REAL_USER=$USER
REAL_HOME=$HOME

echo "🤖 Установка Hermes AI..."

# Создание директорий
echo "📁 Создание директорий..."
mkdir -p "$REAL_HOME/.local/share/hermes-ai"
mkdir -p "$REAL_HOME/.config/hermes-ai"
mkdir -p "$REAL_HOME/.local/log/hermes-ai"

# Установка системных зависимостей (через sudo)
echo "📦 Установка системных зависимостей..."
sudo apt install -y \
    python3 python3-pip python3-venv \
    python3-dev portaudio19-dev \
    ffmpeg

# Создание виртуального окружения (от имени пользователя)
echo "🐍 Создание виртуального окружения..."
python3 -m venv "$REAL_HOME/.local/share/hermes-ai/venv"
source "$REAL_HOME/.local/share/hermes-ai/venv/bin/activate"

# Установка Python пакетов
echo "📥 Установка Python пакетов..."
pip install --upgrade pip
pip install \
    openai-whisper \
    torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu \
    pyaudio sounddevice numpy \
    flask flask-cors requests \
    paho-mqtt pyyaml

# Создание конфигурации
echo "⚙️  Создание конфигурации..."
cat > "$REAL_HOME/.config/hermes-ai/config.yaml" << EOF
# Hermes AI Configuration

name: "Hermes"
language: "ru"
voice_wake_word: "привет гермес"

# Whisper модель (tiny, base, small, medium, large)
whisper_model: "base"
whisper_device: "cpu"

# API настройки (привязка к localhost для безопасности)
api:
  host: "127.0.0.1"
  port: 5000
  debug: false

# Интеграция с Home Assistant
home_assistant:
  enabled: true
  url: "http://127.0.0.1:8123"
  token: "YOUR_LONG_LIVED_ACCESS_TOKEN"

# Интеграция с Media Hub
media_hub:
  enabled: true
  url: "http://127.0.0.1:8080"

# MQTT (опционально)
mqtt:
  enabled: false
  broker: "127.0.0.1"
  port: 1883

# TTS
tts:
  enabled: true
  engine: "espeak"
  language: "ru"
  speed: 150

# Логи
logging:
  level: "INFO"
  file: "$REAL_HOME/.local/log/hermes-ai/hermes.log"
  max_size: "10MB"
  backup_count: 5
EOF

echo "✅ Конфигурация создана: ~/.config/hermes-ai/config.yaml"
echo "⚠️  Отредактируйте файл и укажите токен Home Assistant!"

# Создание основного скрипта
echo "🔧 Создание основного скрипта..."
cat > "$REAL_HOME/.local/share/hermes-ai/main.py" << 'PYEOF'
#!/usr/bin/env python3
"""Hermes AI - Voice Assistant for Media Hub"""

import os
import yaml
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS

# Загрузка конфигурации
config_path = os.path.expanduser('~/.config/hermes-ai/config.yaml')
with open(config_path, 'r') as f:
    config = yaml.safe_load(f)

# Настройка логирования
logging.basicConfig(
    level=getattr(logging, config['logging']['level']),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.expanduser(config['logging']['file'])),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('hermes')

# Инициализация Flask
app = Flask(__name__)
CORS(app)

is_listening = False

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        'status': 'running',
        'listening': is_listening,
        'model': config['whisper_model'],
        'language': config['language']
    })

@app.route('/api/command', methods=['POST'])
def command():
    data = request.json
    text = data.get('text', '')
    if text:
        logger.info(f"Command: {text}")
        return jsonify({'status': 'ok', 'command': text})
    return jsonify({'status': 'error', 'message': 'No text provided'}), 400

@app.route('/api/listen', methods=['POST'])
def listen():
    global is_listening
    data = request.json
    action = data.get('action', 'start')
    is_listening = (action == 'start')
    logger.info(f"Listening: {is_listening}")
    return jsonify({'status': 'ok', 'listening': is_listening})

def main():
    logger.info("Запуск Hermes AI...")
    logger.info(f"API: {config['api']['host']}:{config['api']['port']}")
    app.run(
        host=config['api']['host'],
        port=config['api']['port'],
        debug=config['api']['debug']
    )

if __name__ == '__main__':
    main()
PYEOF

chmod +x "$REAL_HOME/.local/share/hermes-ai/main.py"

# Создание systemd сервиса пользователя
echo "🔧 Создание systemd сервиса..."
mkdir -p "$REAL_HOME/.config/systemd/user"

cat > "$REAL_HOME/.config/systemd/user/hermes-ai.service" << EOF
[Unit]
Description=Hermes AI Voice Assistant
After=network.target

[Service]
Type=simple
User=$REAL_USER
WorkingDirectory=$REAL_HOME/.local/share/hermes-ai
ExecStart=$REAL_HOME/.local/share/hermes-ai/venv/bin/python $REAL_HOME/.local/share/hermes-ai/main.py
Restart=on-failure
RestartSec=10s
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=default.target
EOF

# Активация сервиса
echo "🚀 Активация сервиса..."
systemctl --user daemon-reload
systemctl --user enable hermes-ai
systemctl --user start hermes-ai

echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  systemctl --user status hermes-ai     # Статус"
echo "  systemctl --user restart hermes-ai    # Перезапуск"
echo "  journalctl --user -u hermes-ai -f     # Логи"
echo ""
echo "🌐 API endpoints (localhost only):"
echo "  GET  http://127.0.0.1:5000/api/status"
echo "  POST http://127.0.0.1:5000/api/command"
echo "  POST http://127.0.0.1:5000/api/listen"
echo ""
echo "⚙️  Настройка:"
echo "  nano ~/.config/hermes-ai/config.yaml"
echo ""
