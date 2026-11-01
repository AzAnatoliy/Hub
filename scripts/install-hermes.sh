#!/bin/bash

# Установка Hermes AI для Media Hub
# Использование: chmod +x install-hermes.sh && ./install-hermes.sh

set -e

echo "🤖 Установка Hermes AI..."

# Проверка прав
if [ "$EUID" -ne 0 ]; then
    echo "❌ Запустите скрипт с правами root: sudo $0"
    exit 1
fi

# Получение пользователя
REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

# Создание директорий
echo "📁 Создание директорий..."
mkdir -p /opt/hermes-ai
mkdir -p /etc/hermes-ai
mkdir -p /var/log/hermes-ai

# Установка зависимостей
echo "📦 Установка зависимостей..."
apt update
apt install -y \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    portaudio19-dev \
    python3-dev

# Создание виртуального окружения
echo "🐍 Создание виртуального окружения..."
python3 -m venv /opt/hermes-ai/venv
source /opt/hermes-ai/venv/bin/activate

# Установка Python пакетов
echo "📥 Установка Python пакетов..."
pip install --upgrade pip
pip install \
    openai-whisper \
    torch \
    torchvision \
    torchaudio \
    pyaudio \
    sounddevice \
    numpy \
    flask \
    flask-cors \
    requests \
    paho-mqtt \
    homeassistant \
    pyyaml

# Создание конфигурации
echo "⚙️  Создание конфигурации..."
cat > /etc/hermes-ai/config.yaml << 'EOF'
# Hermes AI Configuration

# Основные настройки
name: "Hermes"
language: "ru"
voice_wake_word: "привет гермес"

# Whisper модель (tiny, base, small, medium, large)
whisper_model: "base"
whisper_device: "cpu"  # или "cuda" для GPU

# API настройки
api:
  host: "0.0.0.0"
  port: 5000
  debug: false

# Интеграция с Home Assistant
home_assistant:
  enabled: true
  url: "http://localhost:8123"
  token: "YOUR_LONG_LIVED_ACCESS_TOKEN"

# Интеграция с Media Hub
media_hub:
  enabled: true
  url: "http://localhost:8080"

# MQTT (для умного дома)
mqtt:
  enabled: false
  broker: "localhost"
  port: 1883
  username: ""
  password: ""

# Голосовые команды
commands:
  media:
    - "включи музыку"
    - "поставь фильм"
    - "следующий трек"
    - "предыдущий трек"
    - "громче"
    - "тише"
    - "пауза"
    - "продолжить"
  
  smarthome:
    - "включи свет"
    - "выключи свет"
    - "установи температуру"
    - "какая температура"
    - "включи кондиционер"
  
  system:
    - "статус системы"
    - "сколько места"
    - "какая нагрузка"
    - "перезагрузи"

# TTS (Text-to-Speech)
tts:
  enabled: true
  engine: "espeak"  # или "google", "yandex"
  language: "ru"
  speed: 150

# Логи
logging:
  level: "INFO"
  file: "/var/log/hermes-ai/hermes.log"
  max_size: "10MB"
  backup_count: 5
EOF

echo "✅ Конфигурация создана: /etc/hermes-ai/config.yaml"
echo "⚠️  Отредактируйте файл и укажите токен Home Assistant!"

# Создание основного скрипта
echo "🔧 Создание основного скрипта..."
cat > /opt/hermes-ai/main.py << 'PYEOF'
#!/usr/bin/env python3
"""
Hermes AI - Voice Assistant for Media Hub
"""

import os
import yaml
import logging
import whisper
import sounddevice as sd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
import queue
import threading
import time

# Загрузка конфигурации
with open('/etc/hermes-ai/config.yaml', 'r') as f:
    config = yaml.safe_load(f)

# Настройка логирования
logging.basicConfig(
    level=getattr(logging, config['logging']['level']),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(config['logging']['file']),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('hermes')

# Инициализация Flask
app = Flask(__name__)
CORS(app)

# Загрузка Whisper модели
logger.info(f"Загрузка Whisper модели: {config['whisper_model']}")
model = whisper.load_model(config['whisper_model'], device=config['whisper_device'])
logger.info("Модель загружена")

# Очередь аудио
audio_queue = queue.Queue()
is_listening = False

def audio_callback(indata, frames, time, status):
    """Callback для захвата аудио"""
    if status:
        logger.warning(status)
    audio_queue.put(indata.copy())

def listen_for_wake_word():
    """Слушает wake word"""
    global is_listening
    
    sample_rate = 16000
    duration = 3  # секунды
    
    logger.info("Слушаю wake word...")
    
    while True:
        audio_data = []
        for _ in range(int(sample_rate * duration / 1024)):
            if not audio_queue.empty():
                audio_data.append(audio_queue.get())
        
        if audio_data:
            audio = np.concatenate(audio_data)
            
            # Транскрибация
            result = model.transcribe(audio, language=config['language'])
            text = result['text'].lower().strip()
            
            logger.info(f"Распознано: {text}")
            
            # Проверка wake word
            if config['voice_wake_word'] in text:
                logger.info("Wake word обнаружен!")
                is_listening = True
                process_command()
                is_listening = False

def process_command():
    """Обрабатывает команду после wake word"""
    logger.info("Слушаю команду...")
    
    sample_rate = 16000
    duration = 5  # секунд на команду
    
    audio_data = []
    for _ in range(int(sample_rate * duration / 1024)):
        if not audio_queue.empty():
            audio_data.append(audio_queue.get())
    
    if audio_data:
        audio = np.concatenate(audio_data)
        result = model.transcribe(audio, language=config['language'])
        command = result['text'].strip()
        
        logger.info(f"Команда: {command}")
        execute_command(command)

def execute_command(command):
    """Выполняет распознанную команду"""
    command_lower = command.lower()
    
    # Медиа команды
    if any(word in command_lower for word in ['музык', 'песн', 'трек']):
        logger.info("Медиа команда: музыка")
        # Интеграция с Media Hub
        # requests.post(f"{config['media_hub']['url']}/api/music/play")
        
    elif any(word in command_lower for word in ['фильм', 'кино', 'сериал']):
        logger.info("Медиа команда: видео")
        
    # Умный дом команды
    elif 'свет' in command_lower:
        if 'включи' in command_lower:
            logger.info("Умный дом: включить свет")
            # Интеграция с Home Assistant
            if config['home_assistant']['enabled']:
                # requests.post(...)
                pass
        elif 'выключи' in command_lower:
            logger.info("Умный дом: выключить свет")
    
    elif 'температур' in command_lower:
        logger.info("Умный дом: температура")
        
    # Системные команды
    elif 'статус' in command_lower:
        logger.info("Системная команда: статус")
        
    else:
        logger.info(f"Неизвестная команда: {command}")

@app.route('/api/status', methods=['GET'])
def status():
    """Статус Hermes AI"""
    return jsonify({
        'status': 'running',
        'listening': is_listening,
        'model': config['whisper_model'],
        'language': config['language']
    })

@app.route('/api/command', methods=['POST'])
def command():
    """Принять текстовую команду"""
    data = request.json
    text = data.get('text', '')
    
    if text:
        execute_command(text)
        return jsonify({'status': 'ok', 'command': text})
    
    return jsonify({'status': 'error', 'message': 'No text provided'}), 400

@app.route('/api/listen', methods=['POST'])
def listen():
    """Начать/остановить прослушивание"""
    global is_listening
    data = request.json
    action = data.get('action', 'start')
    
    if action == 'start':
        is_listening = True
        logger.info("Прослушивание включено")
    elif action == 'stop':
        is_listening = False
        logger.info("Прослушивание выключено")
    
    return jsonify({'status': 'ok', 'listening': is_listening})

def main():
    """Главная функция"""
    logger.info("Запуск Hermes AI...")
    
    # Запуск потока прослушивания
    listen_thread = threading.Thread(target=listen_for_wake_word, daemon=True)
    listen_thread.start()
    
    # Запуск потока захвата аудио
    def audio_stream():
        with sd.InputStream(
            callback=audio_callback,
            channels=1,
            samplerate=16000,
            blocksize=1024
        ):
            while True:
                time.sleep(0.1)
    
    audio_thread = threading.Thread(target=audio_stream, daemon=True)
    audio_thread.start()
    
    # Запуск Flask API
    logger.info(f"API запущен на {config['api']['host']}:{config['api']['port']}")
    app.run(
        host=config['api']['host'],
        port=config['api']['port'],
        debug=config['api']['debug']
    )

if __name__ == '__main__':
    main()
PYEOF

chmod +x /opt/hermes-ai/main.py

# Создание systemd сервиса
echo "🔧 Создание systemd сервиса..."
cat > /etc/systemd/system/hermes-ai.service << 'EOF'
[Unit]
Description=Hermes AI Voice Assistant
After=network.target home-assistant.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/hermes-ai
ExecStart=/opt/hermes-ai/venv/bin/python /opt/hermes-ai/main.py
Restart=on-failure
RestartSec=10s
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

# Активация сервиса
echo "🚀 Активация сервиса..."
systemctl daemon-reload
systemctl enable hermes-ai
systemctl start hermes-ai

# Проверка статуса
echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Полезные команды:"
echo "  systemctl status hermes-ai     # Статус сервиса"
echo "  systemctl restart hermes-ai    # Перезапуск"
echo "  journalctl -u hermes-ai -f     # Логи"
echo ""
echo "🌐 API endpoints:"
echo "  GET  http://localhost:5000/api/status    # Статус"
echo "  POST http://localhost:5000/api/command   # Текстовая команда"
echo "  POST http://localhost:5000/api/listen    # Управление прослушиванием"
echo ""
echo "🎤 Голосовое управление:"
echo "  Wake word: 'Привет, Гермес'"
echo "  Затем скажите команду"
echo ""
echo "⚙️  Настройка:"
echo "  sudo nano /etc/hermes-ai/config.yaml"
echo ""
