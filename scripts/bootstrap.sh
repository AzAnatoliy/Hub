cd ~/Hub && cat > fix-repo.sh << 'FIXEOF'
#!/bin/bash
set -e
echo "🔧 Создание недостающих файлов..."

# bootstrap.sh
cat > scripts/bootstrap.sh << 'EOF'
#!/bin/bash
set -e
if [ "$EUID" -ne 0 ]; then echo "❌ Запустите от root: sudo $0"; exit 1; fi
TARGET_USER="${SUDO_USER:-az}"
if [ "$TARGET_USER" = "root" ]; then read -p "Имя пользователя [az]: " TARGET_USER; TARGET_USER=${TARGET_USER:-az}; fi
if ! id "$TARGET_USER" &>/dev/null; then echo "❌ Пользователь не существует"; exit 1; fi
TARGET_HOME=$(eval echo "~$TARGET_USER")
echo "✅ Пользователь: $TARGET_USER"
apt update
apt install -y ca-certificates curl wget gnupg lsb-release git sudo mpv va-driver-all vainfo alsa-utils modemmanager network-manager-gnome python3 python3-pip python3-venv python3-dev portaudio19-dev ffmpeg ufw
if ! command -v docker &>/dev/null; then
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi
usermod -aG docker "$TARGET_USER"
if ! command -v node &>/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt install -y nodejs
fi
sudo -u "$TARGET_USER" mkdir -p "$TARGET_HOME/media"/{movies,tv,music,photos,downloads,recordings}
sudo -u "$TARGET_USER" mkdir -p "$TARGET_HOME/Hub/data"
ufw default deny incoming && ufw default allow outgoing && ufw allow 22/tcp && ufw allow 8080/tcp && ufw --force enable
echo "✅ Bootstrap завершён! Теперь: cd ~/Hub && ./install.sh"
EOF
chmod +x scripts/bootstrap.sh

# .env
[ ! -f .env ] && cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
PUID=1000
PGID=1000
DATA_DIR=./data
MEDIA_DIR=/home/media
CONFIG_DIR=./configs
LAN_IP=127.0.0.1
EOF

# Конфиги
mkdir -p configs/mihomo configs/go2rtc
[ ! -f configs/mihomo/config.yaml ] && [ -f configs/mihomo/config.yaml.example ] && cp configs/mihomo/config.yaml.example configs/mihomo/config.yaml
[ ! -f configs/go2rtc/go2rtc.yaml ] && [ -f configs/go2rtc/go2rtc.yaml.example ] && cp configs/go2rtc/go2rtc.yaml.example configs/go2rtc/go2rtc.yaml

chmod +x install.sh scripts/*.sh
npm install --silent
npm run build

echo ""
echo "✅ Все файлы созданы!"
echo "📋 Теперь: ./install.sh"
FIXEOF

chmod +x fix-repo.sh
./fix-repo.sh
