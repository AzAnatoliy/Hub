#!/bin/bash

# Настройка USB ЦАП для Hi-Res аудио
# Использование: chmod +x setup-audio.sh && ./setup-audio.sh

set -e

echo "🎵 Настройка USB ЦАП для Hi-Res аудио..."

# Проверка ALSA
if ! command -v aplay &> /dev/null; then
    echo "📦 Установка alsa-utils..."
    sudo apt install -y alsa-utils
fi

# Список аудиоустройств
echo ""
echo "📋 Доступные аудиоустройства:"
echo "=============================="
aplay -l
echo ""
echo "📋 Устройства с именами (для stable binding):"
echo "=============================="
cat /proc/asound/cards
echo ""

# Запрос имени карты (более стабильно, чем номер)
read -p "Введите имя USB ЦАП (из списка выше, например 'Pro' или 'DAC'): " CARD_NAME

if [ -z "$CARD_NAME" ]; then
    echo "❌ Имя карты не указано"
    exit 1
fi

# Создание конфигурации ALSA с использованием имени карты
echo "⚙️  Создание конфигурации ALSA..."
cat > ~/.asoundrc << EOF
# USB ЦАП - Hi-Res аудио (бит-в-бит)
# Карта: $CARD_NAME

# Дефолтное устройство - прямой доступ к USB ЦАП
pcm.!default {
    type hw
    card "$CARD_NAME"
    device 0
}

# Контроль
ctl.!default {
    type hw
    card "$CARD_NAME"
}

# Устройства с передискретизацией (для приложений, не поддерживающих Hi-Res)
pcm.softvol {
    type softvol
    slave.pcm "default"
    control {
        name "Master"
        card "$CARD_NAME"
    }
}

# Upsampler для 24/96
pcm.!upmix96 {
    type plug
    slave {
        pcm "default"
        rate 96000
        format S24_LE
    }
}

# Upsampler для 24/192
pcm.!upmix192 {
    type plug
    slave {
        pcm "default"
        rate 192000
        format S24_LE
    }
}
EOF

echo "✅ Конфигурация создана: ~/.asoundrc"

# Проверка поддерживаемых форматов
echo ""
echo "🔍 Проверка поддерживаемых форматов..."
echo "=============================="
echo "⚠️  Тесты воспроизведут короткий звук на полной громкости!"
read -p "Продолжить? (y/n): " confirm

if [ "$confirm" = "y" ]; then
    # Правильные флаги: -F для формата, -r для частоты
    echo "Тест 44.1kHz/16bit:"
    speaker-test -D default -c 2 -r 44100 -F S16_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
    
    echo "Тест 96kHz/24bit:"
    speaker-test -D default -c 2 -r 96000 -F S24_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
    
    echo "Тест 192kHz/24bit:"
    speaker-test -D default -c 2 -r 192000 -F S24_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
else
    echo "Пропуск тестов"
fi

# Создание конфига mpv
echo ""
echo "⚙️  Создание конфигурации mpv..."
mkdir -p ~/.config/mpv
cat > ~/.config/mpv/mpv.conf << 'EOF'
# mpv конфигурация для Hi-Res аудио

# Аудио вывод - ALSA exclusive
audio-device=alsa/default
audio-exclusive=yes
audio-format=s24

# Видео - VA-API
hwdec=vaapi
vo=gpu
gpu-context=auto

# Субтитры
sub-auto=fuzzy
sub-font-size=28

# OSD
osd-level=1
osd-duration=2000

# Кэширование
cache=yes
demuxer-max-bytes=500MiB
demuxer-max-back-bytes=100MiB
EOF

echo "✅ Конфигурация mpv создана: ~/.config/mpv/mpv.conf"

echo ""
echo "✅ Настройка звука завершена!"
echo ""
echo "📋 Проверка:"
echo "  aplay -l                    # Список устройств"
echo "  cat /proc/asound/cards      # Имена устройств"
echo "  speaker-test -D default -c 2 -r 96000 -F S24_LE  # Тест"
echo ""
echo "🎵 Воспроизведение:"
echo "  mpv --audio-device=alsa/default файл.flac"
echo ""
echo "⚠️  Важно: Если USB ЦАП отключается/переподключается, номер может измениться."
echo "   Используйте имя устройства (как в конфиге выше) для стабильной работы."
echo ""
