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

### 🌐 Сеть
- **USB-модем**: Автоподключение любого модема (Huawei, ZTE, Quectel)
- **Прокси**: Mihomo (VLESS, VMess, Trojan) с обходом блокировок
- **DNS**: AdGuard Home для блокировки рекламы
- **Failover**: Приоритет модем → Wi-Fi → Ethernet

### 🖥️ Интерфейс
- **Веб-панель**: Адаптивный дизайн для ТВ и мобильных
- **Управление**: Пульт ДУ (CEC), геймпад, клавиатура
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
wget https://mirror.yandex.ru/linuxmint-pdf/stable/22/linuxmint-22-xfce-64bit.iso

# Запишите на USB (замените /dev/sdX)
sudo dd if=linuxmint-22-xfce-64bit.iso of=/dev/sdX bs=4M status=progress

# Установите на мини-ПК с разметкой:
# / (root): 50 ГБ
# /home: остаток (для медиатеки)
# swap: 8 ГБ
```

### 2. Клонирование проекта

```bash
git clone https://github.com/YOUR_USERNAME/media-hub.git
cd media-hub
```

### 3. Установка зависимостей

```bash
# Системные пакеты
sudo apt update
sudo apt install -y \
  modemmanager network-manager-gnome \
  alsa-utils mpv va-driver-all \
  qbittorrent retroarch \
  docker.io docker-compose

# Node.js зависимости
npm install
```

### 4. Настройка модема

```bash
# Проверьте подключение модема
mmcli -L

# Создайте подключение (замените APN)
sudo nmcli connection add type gsm ifname '*' conname 'Mobile' apn 'internet.mts.ru'
sudo nmcli connection up 'Mobile'
```

### 5. Настройка прокси Mihomo

```bash
# Запустите скрипт установки
chmod +x scripts/install-mihomo.sh
./scripts/install-mihomo.sh

# Отредактируйте конфиг
sudo nano /etc/mihomo/config.yaml
```

### 6. Развертывание Docker-контейнеров

```bash
cd docker
docker-compose up -d

# Проверьте статус
docker ps
```

### 7. Настройка звука

```bash
# Найдите USB ЦАП
aplay -l

# Создайте конфиг (замените card number)
./scripts/setup-audio.sh
```

### 8. Сборка веб-интерфейса

```bash
npm run build

# Запустите локальный сервер
cd dist
python3 -m http.server 8080
```

### 9. Автозагрузка

```bash
# Настройте автозапуск оболочки
./scripts/setup-autostart.sh
```

## 📁 Структура проекта

```
media-hub/
├── src/                    # Исходный код веб-интерфейса
│   ├── components/         # React компоненты
│   ├── App.tsx            # Главный компонент
│   └── main.tsx           # Точка входа
├── docker/                 # Docker конфигурации
│   └── docker-compose.yml
├── scripts/               # Скрипты установки
│   ├── install-mihomo.sh
│   ├── setup-audio.sh
│   └── setup-autostart.sh
├── configs/               # Примеры конфигураций
│   ├── mihomo/
│   ├── alsa/
│   └── mpv/
├── dist/                  # Production сборка
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
- **Сеть**: Статус модема, прокси, DNS
- **Монитор**: Графики ресурсов в реальном времени
- **Настройки**: Конфигурация системы

### Управление

- **Пульт ДУ**: Через HDMI CEC
- **Геймпад**: Эмуляция мыши/клавиатуры
- **Мобильный**: Доступ с любого устройства в сети
- **Клавиатура**: Беспроводная с тачпадом

## 🔧 Конфигурация

### Прокси Mihomo

Отредактируйте `/etc/mihomo/config.yaml`:

```yaml
mixed-port: 7890
allow-lan: true
mode: rule
log-level: info

proxies:
  - name: "NL-01"
    type: vless
    server: your-server.com
    port: 443
    uuid: your-uuid
    network: ws
```

### Docker контейнеры

Отредактируйте `docker/docker-compose.yml` для изменения путей и портов.

### Звук

Отредактируйте `~/.asoundrc` для выбора USB ЦАП:

```
pcm.!default {
    type hw
    card 1  # Номер из aplay -l
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
├── AdGuard Home             ~0.15 ГБ
├── Go2RTC                   ~0.05 ГБ
└── Home Assistant           ~0.5 ГБ
─────────────────────────────────────
ИТОГО:                       ~4.0 ГБ
Свободно:                    ~4.0 ГБ
```

## 🛠️ Разработка

```bash
# Режим разработки
npm run dev

# Сборка
npm run build

# Проверка типов
npm run typecheck
```

## 📝 Полезные команды

```bash
# Статус сервисов
systemctl status mihomo
docker ps

# Логи
journalctl -u mihomo -f
docker logs jellyfin -f

# Перезапуск
sudo systemctl restart mihomo
docker-compose restart

# Обновление системы
sudo apt update && sudo apt upgrade -y
docker-compose pull && docker-compose up -d
```

## 🔒 Безопасность

- Измените стандартные пароли в Docker контейнерах
- Настройте firewall (ufw)
- Используйте SSH ключи вместо паролей
- Регулярно обновляйте систему
- Делайте бэкапы конфигураций

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

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 🙏 Благодарности

- [Linux Mint](https://linuxmint.com/)
- [Jellyfin](https://jellyfin.org/)
- [Home Assistant](https://www.home-assistant.io/)
- [RetroArch](https://www.retroarch.com/)
- [Mihomo](https://github.com/MetaCubeX/mihomo)
- [AdGuard Home](https://adguard.com/adguard-home/overview.html)

## 📞 Поддержка

- GitHub Issues: [Создать issue](https://github.com/YOUR_USERNAME/media-hub/issues)
- Документация: [Wiki](https://github.com/YOUR_USERNAME/media-hub/wiki)

---

**Сделано с ❤️ для медиа-энтузиастов**
