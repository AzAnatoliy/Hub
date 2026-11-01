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

# Запрос номера карты
read -p "Введите номер карты USB ЦАП (из списка выше): " CARD_NUM

if [ -z "$CARD_NUM" ]; then
    echo "❌ Номер карты не указан"
    exit 1
fi

# Создание конфигурации ALSA
echo "⚙️  Создание конфигурации ALSA..."
cat > ~/.asoundrc << EOF
# USB ЦАП - Hi-Res аудио (бит-в-бит)
# Карта: $CARD_NUM

# Дефолтное устройство - прямой доступ к USB ЦАП
pcm.!default {
    type hw
    card $CARD_NUM
    device 0
}

# Контроль
ctl.!default {
    type hw
    card $CARD_NUM
}

# Устройства с передискретизацией (для приложений, не поддерживающих Hi-Res)
pcm.softvol {
    type softvol
    slave.pcm "default"
    control {
        name "Master"
        card $CARD_NUM
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
if command -v aplay &> /dev/null; then
    echo "Тест 44.1kHz/16bit:"
    speaker-test -D hw:$CARD_NUM,0 -c 2 -r 44100 -f S16_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
    
    echo "Тест 96kHz/24bit:"
    speaker-test -D hw:$CARD_NUM,0 -c 2 -r 96000 -f S24_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
    
    echo "Тест 192kHz/24bit:"
    speaker-test -D hw:$CARD_NUM,0 -c 2 -r 192000 -f S24_LE -t sine -l 1 2>/dev/null && echo "✓ OK" || echo "✗ Не поддерживается"
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
gpu-context=wayland

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

# Профили для разных форматов
profile=high-quality

[high-quality]
scale=spline36
cscale=mitchell
dscale=mitchell
dither=fruit
EOF

echo "✅ Конфигурация mpv создана: ~/.config/mpv/mpv.conf"

echo ""
echo "✅ Настройка звука завершена!"
echo ""
echo "📋 Проверка:"
echo "  aplay -l                    # Список устройств"
echo "  speaker-test -D hw:$CARD_NUM,0 -c 2 -r 96000 -f S24_LE  # Тест"
echo ""
echo "🎵 Воспроизведение:"
echo "  mpv --audio-device=alsa/hw:$CARD_NUM,0 файл.flac"
echo ""
