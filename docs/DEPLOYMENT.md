# 📖 Руководство по развертыванию Media Hub v3.0

## 🎯 Обзор

Media Hub v3.0 — это комплексная мультимедийная система, включающая:
- Веб-интерфейс управления (React + TypeScript)
- Медиасерверы (Jellyfin, Sonarr, Radarr)
- Видеонаблюдение (Go2RTC)
- Умный дом (Home Assistant)
- DNS фильтрация (AdGuard Home)
- Прокси (Mihomo)

## 📋 Требования

### Аппаратные
- **CPU**: Intel i3+ / AMD Ryzen 3+ (x86_64)
- **RAM**: 8 ГБ (минимум), 16 ГБ (рекомендуется)
- **Диск**: 1 ТБ (SSD рекомендуется)
- **GPU**: Intel/AMD с поддержкой VA-API
- **Сеть**: Ethernet + USB-модем (опционально)
- **USB ЦАП**: Reflex 2.0 Pro или аналог (опционально)

### Программные
- **ОС**: Linux Mint 22 XFCE (рекомендуется)
- **Docker**: 20.10+
- **Node.js**: 20.x
- **Браузер**: Firefox/Chrome (для веб-интерфейса)

## 🚀 Установка

### Метод 1: Автоматическая установка (рекомендуется)

```bash
# 1. Установите Linux Mint XFCE
# Скачайте: https://linuxmint.com/edition.php?id=313
# Запишите на USB и установите

# 2. Клонируйте репозиторий
cd ~
git clone https://github.com/YOUR_USERNAME/media-hub.git
cd media-hub

# 3. Запустите установщик
chmod +x install.sh
sudo ./install.sh

# 4. Перезагрузите систему
sudo reboot
```

### Метод 2: Ручная установка

Следуйте инструкциям в [README.md](README.md#быстрая-установка)

## ⚙️ Первоначальная настройка

### 1. Настройка прокси Mihomo

```bash
sudo nano /etc/mihomo/config.yaml
```

Замените данные прокси на свои:
```yaml
proxies:
  - name: "my-proxy"
    type: vless
    server: your-server.com
    port: 443
    uuid: your-uuid-here
    network: ws
    tls: true
```

Перезапустите сервис:
```bash
sudo systemctl restart mihomo
```

### 2. Настройка Jellyfin

Откройте: http://localhost:8096

1. Создайте аккаунт администратора
2. Добавьте медиатеки:
   - Фильмы: `/home/media/movies`
   - Сериалы: `/home/media/tv`
   - Музыка: `/home/media/music`
3. Настройте метаданные (язык: Русский)

### 3. Настройка Sonarr (сериалы)

Откройте: http://localhost:8989

1. Создайте аккаунт
2. Добавьте qBittorrent как клиент загрузки:
   - Хост: `localhost`
   - Порт: `8080`
   - Путь: `/home/media/downloads`
3. Добавьте корневую папку: `/home/media/tv`
4. Настройте профили качества

### 4. Настройка Radarr (фильмы)

Откройте: http://localhost:7878

1. Создайте аккаунт
2. Добавьте qBittorrent как клиент загрузки
3. Добавьте корневую папку: `/home/media/movies`
4. Настройте профили качества

### 5. Настройка Go2RTC (камеры)

Отредактируйте конфиг:
```bash
nano ~/media-hub/configs/go2rtc/go2rtc.yaml
```

Укажите RTSP ссылки на ваши камеры:
```yaml
streams:
  cam1:
    - rtsp://username:password@192.168.1.101:554/stream1
  cam2:
    - rtsp://username:password@192.168.1.102:554/stream1
```

Перезапустите контейнер:
```bash
cd ~/media-hub/docker
docker-compose restart go2rtc
```

Откройте: http://localhost:1984

### 6. Настройка Home Assistant

Откройте: http://localhost:8123

1. Создайте аккаунт
2. Добавьте устройства (Zigbee, Z-Wave, Wi-Fi)
3. Настройте автоматизации

### 7. Настройка AdGuard Home

Откройте: http://localhost:3000

1. Пройдите мастер настройки
2. Добавьте списки фильтрации:
   - AdGuard DNS filter
   - Peter Lowe's Blocklist
   - RU AdList

### 8. Настройка USB ЦАП

```bash
# Найдите устройство
aplay -l

# Отредактируйте конфиг
nano ~/.asoundrc

# Замените номер карты
pcm.!default {
    type hw
    card 1  # Ваш номер
    device 0
}
```

## 🌐 Доступ из сети

### Локальная сеть

Веб-интерфейс доступен по адресу:
```
http://<IP-адрес-сервера>:8080
```

### Удаленный доступ (опционально)

#### Вариант 1: Port forwarding
Настройте роутер для проброса портов:
- 8080 (Media Hub)
- 8096 (Jellyfin)
- 8123 (Home Assistant)

#### Вариант 2: VPN
Установите WireGuard или OpenVPN для безопасного доступа.

#### Вариант 3: Reverse Proxy
Используйте Nginx или Caddy с SSL:

```nginx
server {
    listen 443 ssl;
    server_name media.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Обслуживание

### Обновление системы

```bash
# Обновление ОС
sudo apt update && sudo apt upgrade -y

# Обновление Docker контейнеров
cd ~/media-hub/docker
docker-compose pull
docker-compose up -d

# Обновление веб-интерфейса
cd ~/media-hub
git pull
npm install
npm run build
sudo systemctl restart media-hub-web
```

### Резервное копирование

```bash
# Снапшот системы
sudo timeshift --create --comments "Before update"

# Бэкап конфигураций
tar -czf backup-$(date +%Y%m%d).tar.gz \
    /etc/mihomo \
    ~/media-hub/docker \
    ~/media-hub/configs \
    ~/.asoundrc

# Полный образ диска
sudo rescuezilla
```

### Восстановление

```bash
# Из снапшота
sudo timeshift --restore

# Из бэкапа
tar -xzf backup-20250115.tar.gz -C /
```

## 📊 Мониторинг

### Системные ресурсы

```bash
# Общая нагрузка
htop

# Docker контейнеры
docker stats

# Использование диска
df -h

# Температура
sensors
```

### Логи

```bash
# Веб-интерфейс
sudo journalctl -u media-hub-web -f

# Docker контейнеры
docker logs jellyfin -f
docker logs sonarr -f

# Прокси
sudo journalctl -u mihomo -f
```

## 🐛 Решение проблем

### Веб-интерфейс не открывается

```bash
# Проверьте статус сервиса
sudo systemctl status media-hub-web

# Перезапустите
sudo systemctl restart media-hub-web

# Проверьте firewall
sudo ufw status
sudo ufw allow 8080/tcp
```

### Docker контейнеры не запускаются

```bash
# Проверьте логи
docker-compose logs

# Перезапустите
docker-compose down
docker-compose up -d

# Проверьте ресурсы
docker stats
```

### USB ЦАП не работает

```bash
# Проверьте устройство
aplay -l

# Проверьте права
sudo usermod -aG audio $USER

# Перезагрузитесь
sudo reboot
```

### Модем не подключается

```bash
# Проверьте устройство
mmcli -L

# Проверьте подключение
nmcli connection show

# Перезапустите ModemManager
sudo systemctl restart ModemManager
```

## 📞 Поддержка

- **GitHub Issues**: [Создать issue](https://github.com/YOUR_USERNAME/media-hub/issues)
- **Документация**: [Wiki](https://github.com/YOUR_USERNAME/media-hub/wiki)
- **Telegram**: @your_telegram

## 🎓 Дополнительные ресурсы

- [Linux Mint Documentation](https://linuxmint.com/documentation.php)
- [Docker Documentation](https://docs.docker.com/)
- [Jellyfin Documentation](https://jellyfin.org/docs/)
- [Home Assistant Documentation](https://www.home-assistant.io/docs/)

---

**Удачи в использовании Media Hub v3.0!** 🎉
