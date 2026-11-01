# 🎯 Медиа-Хаб v3.0

Полнофункциональная мультимедийная система на базе Linux Mint XFCE с кастомной веб-оболочкой для управления видео, музыкой, играми, камерами и умным домом.

![Media Hub](https://img.shields.io/badge/Version-3.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Platform](https://img.shields.io/badge/Platform-Linux%20Mint%20XFCE-orange)

## 📋 Возможности

### 🎬 Медиа
- **Видео**: Фильмы, сериалы, аниме (Jellyfin + mpv с VA-API)
- **Музыка**: Hi-Res аудио, FLAC, DSD, бит-в-бит через USB ЦАП
- **Фото**: Галереи, RAW форматы, слайд-шоу с музыкой
- **Автоматизация**: Sonarr/Radarr + qBittorrent для автозагрузки

### 🎮 Игры
- **Steam**: Нативные игры + Windows через Proton
- **Эмуляторы**: RetroArch (NES, SNES, N64, PS1, PS2, PSP, Sega, Arcade и др.)
- **Управление**: Единая библиотека с обложками и сохранениями

### 📹 Видеонаблюдение
- **Go2RTC**: 2 IP-камеры с записью по движению
- **Уведомления**: Telegram, Email
- **Архив**: Поиск по дате/времени

### 🏠 Умный дом
- **Home Assistant**: Управление устройствами (Zigbee, Z-Wave, Wi-Fi)
- **Автоматизации**: Сценарии, триггеры, расписания
- **Мониторинг**: Датчики температуры, влажности, протечек

### 🤖 Hermes AI
- **Голосовой ассистент**: Управление через голосовые команды
- **Wake word**: "Привет, Гермес"
- **Распознавание речи**: Whisper AI (OpenAI)
- **Интеграции**: Media Hub, Home Assistant, MQTT
- **Команды**: Медиа, умный дом, система

### 🌐 Сеть
- **USB-модем**: Автоподключение любого модема (Huawei, ZTE, Quectel)
- **Прокси**: Mihomo (VLESS, VMess, Trojan) с обходом блокировок
- **DNS**: AdGuard Home для блокировки рекламы
- **Failover**: Приоритет модем → Wi-Fi → Ethernet

### 🖥️ Интерфейс
- **Веб-панель**: Адаптивный дизайн для ТВ и мобильных
- **Управление**: Пульт ДУ (CEC с USB-адаптером), геймпад, клавиатура
- **Мониторинг**: Графики CPU, RAM, сети в реальном времени

## 📊 Системные требования

**Минимальные:**
- CPU: Intel i3 / AMD Ryzen 3 (x86_64)
- RAM: 8 ГБ
- Диск: 1 ТБ (SSD рекомендуется)
- GPU: Intel/AMD с поддержкой VA-API
- ОС: Linux Mint 22 XFCE

**Оптимальные:**
- CPU: Intel i5 / AMD Ryzen 5
- RAM: 16 ГБ
- Диск: 2 ТБ NVMe SSD
- GPU: Intel Iris Xe / AMD Radeon
- USB ЦАП: Reflex 2.0 Pro или аналог

## 🚀 Быстрая установка

### 1. Установка ОС

```bash
# Скачайте Linux Mint XFCE
# https://linuxmint.com/edition.php?id=313
# Проверьте контрольную сумму!

# Запишите на USB (замените /dev/sdX)
sudo dd if=linuxmint-22-xfce-64bit.iso of=/dev/sdX bs=4M status=progress

# Установите на мини-ПК с разметкой:
# / (root): 50 ГБ
# /home: остаток (для медиатеки)
# swap: 8 ГБ
```

### 2. Клонирование проекта

```bash
git clone https://github.com/YOUR_USERNAME/Hub.git
cd Hub
```

### 3. Установка зависимостей

```bash
# ВАЖНО: НЕ запускайте от root!
chmod +x install.sh
./install.sh
```

### 4. Настройка .env

```bash
# Отредактируйте .env и укажите свои данные
nano .env
```

### 5. Настройка прокси Mihomo

```bash
# Отредактируйте конфиг (замените данные прокси)
sudo nano /etc/mihomo/config.yaml

# Перезапустите сервис
sudo systemctl restart mihomo
```

### 6. Настройка USB ЦАП

```bash
# Найдите USB ЦАП
aplay -l
cat /proc/asound/cards

# Отредактируйте ~/.asoundrc (используйте имя устройства)
nano ~/.asoundrc
```

### 7. Настройка IP-камер

```bash
# Отредактируйте конфиг Go2RTC
nano configs/go2rtc/go2rtc.yaml

# Укажите RTSP ссылки на ваши камеры
# Перезапустите контейнер
cd docker && docker compose restart go2rtc
```

### 8. Перезагрузка

```bash
sudo reboot
```

## 📁 Структура проекта

```
Hub/
├── src/                    # Исходный код веб-интерфейса
│   ├── components/         # React компоненты
│   ├── App.tsx            # Главный компонент
│   └── main.tsx           # Точка входа
├── docker/                 # Docker конфигурации
│   └── docker-compose.yml
├── scripts/               # Скрипты установки
│   ├── install-mihomo.sh
│   ├── install-hermes.sh
│   ├── setup-audio.sh
│   └── setup-autostart.sh
├── configs/               # Примеры конфигураций
│   ├── mihomo/
│   ├── go2rtc/
│   └── mpv/
├── docs/                  # Документация
├── dist/                  # Production сборка (создается npm run build)
├── data/                  # Данные контейнеров (создается автоматически)
├── .env                   # Переменные окружения (НЕ коммитить!)
├── .env.example           # Пример .env
├── package.json
├── README.md
└── LICENSE
```

## 🎮 Использование

### Веб-интерфейс

Откройте браузер и перейдите на `http://localhost:8080`

**Разделы:**
- **Главная**: Дашборд с виджетами погоды, системным мониторингом, уведомлениями
- **Видео**: Библиотека фильмов и сериалов с продолжением просмотра
- **Музыка**: Hi-Res плеер с управлением USB ЦАП
- **Фото**: Галерея с поддержкой RAW и слайд-шоу
- **Игры**: Библиотека Steam и эмуляторов
- **Камеры**: Видеонаблюдение с записью по движению
- **Умный дом**: Управление устройствами Home Assistant
- **Hermes AI**: Голосовой ассистент
- **Сеть**: Статус модема, прокси, DNS
- **Монитор**: Графики ресурсов в реальном времени
- **Настройки**: Конфигурация системы

### Управление

- **Пульт ДУ**: Через USB CEC адаптер (HDMI на ноутбуках не поддерживает CEC!)
- **Геймпад**: Эмуляция мыши/клавиатуры
- **Мобильный**: Доступ с любого устройства в сети
- **Клавиатура**: Беспроводная с тачпадом

## 🔧 Конфигурация

### Переменные окружения (.env)

```bash
# Скопируйте пример
cp .env.example .env

# Отредактируйте
nano .env
```

Основные параметры:
- `PUID/PGID` - ID пользователя и группы
- `MEDIA_DIR` - директория с медиа-файлами
- `LAN_IP` - IP для привязки портов (127.0.0.1 для безопасности)
- `HA_TOKEN` - токен Home Assistant
- `CAM1_RTSP/CAM2_RTSP` - RTSP ссылки на камеры

### Прокси Mihomo

Отредактируйте `/etc/mihomo/config.yaml`:

```yaml
# Замените на свои данные прокси
proxies:
  - name: "proxy-1"
    type: vless
    server: your-server.com
    port: 443
    uuid: your-uuid
    network: ws
```

### Docker контейнеры

Порты привязаны к `127.0.0.1` для безопасности. Для доступа из сети измените `LAN_IP` в `.env`.

### Звук

Используйте **имя устройства** вместо номера (номер может меняться):

```bash
# Посмотрите имена
cat /proc/asound/cards

# Используйте имя в ~/.asoundrc
pcm.!default {
    type hw
    card "Pro"  # Имя из /proc/asound/cards
    device 0
}
```

## 📊 Распределение ресурсов (8 ГБ ОЗУ)

```
Linux Mint XFCE              ~1.0 ГБ
mpv (видеоплеер)             ~0.5 ГБ
Mihomo (прокси)              ~0.15 ГБ
qBittorrent                  ~0.1 ГБ
Браузер (оболочка)           ~0.4 ГБ
─────────────────────────────────────
Docker (база)                ~0.2 ГБ
├── Jellyfin                 ~0.4 ГБ
├── Sonarr                   ~0.25 ГБ
├── Radarr                   ~0.25 ГБ
├── qBittorrent              ~0.2 ГБ
├── AdGuard Home             ~0.15 ГБ
├── Go2RTC                   ~0.05 ГБ
└── Home Assistant           ~0.5 ГБ
─────────────────────────────────────
ИТОГО:                       ~4.2 ГБ
Свободно:                    ~3.8 ГБ
```

## 🔒 Безопасность

### Firewall

Docker публикует порты **в обход UFW**! Поэтому:

1. Порты привязаны к `127.0.0.1` в `docker-compose.yml`
2. Для доступа из сети измените `LAN_IP` в `.env` на ваш IP
3. **НЕ используйте `0.0.0.0`** без дополнительной защиты

### Секреты

- **НЕ коммитьте `.env`** (уже в `.gitignore`)
- **НЕ коммитьте `configs/mihomo/config.yaml`** (содержит пароли)
- **НЕ коммитьте `configs/go2rtc/go2rtc.yaml`** (содержит пароли камер)
- Используйте `.env.example` как шаблон

### Обновления

- Watchtower **НЕ используется** (обновления вручную)
- Образы закреплены по версиям (не `:latest`)
- Обновляйте вручную: `docker compose pull && docker compose up -d`

## 🛠️ Разработка

```bash
# Режим разработки
npm run dev

# Сборка
npm run build

# Проверка типов
npm run typecheck

# Линтинг
npm run lint
```

## 📝 Полезные команды

```bash
# Статус сервисов
systemctl --user status media-hub-web
sudo systemctl status mihomo
docker ps

# Логи
journalctl --user -u media-hub-web -f
sudo journalctl -u mihomo -f
docker logs jellyfin -f

# Перезапуск
systemctl --user restart media-hub-web
sudo systemctl restart mihomo
cd docker && docker compose restart

# Обновление системы
sudo apt update && sudo apt upgrade -y
cd docker && docker compose pull && docker compose up -d
```

## 📦 Клонирование системы

```bash
# Создайте снапшот
sudo timeshift --create --comments "Before update"

# Полный образ диска
sudo rescuezilla

# Восстановление
sudo timeshift --restore
```

## 🤝 Вклад

Pull requests приветствуются! Для крупных изменений сначала откройте issue для обсуждения.

См. [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 🙏 Благодарности

- [Linux Mint](https://linuxmint.com/)
- [Jellyfin](https://jellyfin.org/)
- [Home Assistant](https://www.home-assistant.io/)
- [RetroArch](https://www.retroarch.com/)
- [Mihomo](https://github.com/MetaCubeX/mihomo)
- [AdGuard Home](https://adguard.com/adguard-home/overview.html)
- [Go2RTC](https://github.com/AlexxIT/go2rtc)
- [OpenAI Whisper](https://github.com/openai/whisper)

## 📞 Поддержка

- GitHub Issues: [Создать issue](https://github.com/YOUR_USERNAME/Hub/issues)
- Документация: [Wiki](https://github.com/YOUR_USERNAME/Hub/wiki)

## ⚠️ Известные ограничения

1. **HDMI CEC**: На обычных ноутбуках HDMI не пропускает CEC сигналы. Нужен USB-адаптер Pulse-Eight или аналог.

2. **USB ЦАП**: Номер карты может меняться после перезагрузки. Используйте имя устройства из `/proc/asound/cards`.

3. **Docker + UFW**: Docker публикует порты в обход UFW. Порты привязаны к 127.0.0.1 для безопасности.

4. **AdGuard Home**: При первом запуске мастер настройки слушает порт 3000 внутри контейнера. Доступ: http://localhost:3000

5. **mpv на X11**: Используется `gpu-context=auto` для совместимости с X11 (Linux Mint).

---

**Сделано с ❤️ для медиа-энтузиастов**
