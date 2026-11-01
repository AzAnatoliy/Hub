# 📤 Публикация на GitHub

## 🚀 Быстрый старт

### 1. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Заполните:
   - **Repository name**: `media-hub`
   - **Description**: `Мультимедийная система с веб-интерфейсом для управления видео, музыкой, играми, камерами и умным домом`
   - **Public** (или Private)
   - **НЕ** инициализируйте с README, .gitignore или лицензией

3. Нажмите **Create repository**

### 2. Инициализируйте Git и загрузите код

```bash
# Перейдите в папку проекта
cd /path/to/media-hub

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: Media Hub v3.0"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/media-hub.git

# Отправьте в main ветку
git branch -M main
git push -u origin main
```

### 3. Создайте релиз

```bash
# Создайте тег версии
git tag -a v3.0.0 -m "Media Hub v3.0.0"

# Отправьте тег
git push origin v3.0.0
```

Затем на GitHub:
1. Перейдите в **Releases** → **Draft a new release**
2. Выберите тег `v3.0.0`
3. Заполните описание (можно скопировать из CHANGELOG.md)
4. Прикрепите файлы из папки `dist/` (опционально)
5. Нажмите **Publish release**

## 📝 Обновление README

Замените `YOUR_USERNAME` в README.md на ваше имя пользователя GitHub:

```bash
# Замените во всех файлах
sed -i 's/YOUR_USERNAME/ваш_username/g' README.md
sed -i 's/YOUR_USERNAME/ваш_username/g' CONTRIBUTING.md
sed -i 's/YOUR_USERNAME/ваш_username/g' docs/DEPLOYMENT.md
```

## 🎨 Добавление скриншотов

1. Сделайте скриншоты интерфейса
2. Загрузите их в папку `screenshots/`
3. Добавьте в README.md:

```markdown
## 📸 Скриншоты

![Dashboard](screenshots/dashboard.png)
![Video](screenshots/video.png)
![Music](screenshots/music.png)
```

## 🔧 Настройка GitHub Actions (опционально)

Создайте `.github/workflows/build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Upload artifact
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/
```

## 📊 Статистика проекта

Добавьте бейджи в README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/media-hub?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/media-hub?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/media-hub)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YOUR_USERNAME/media-hub)
![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/media-hub)
```

## 🌐 GitHub Pages (опционально)

Для публикации веб-интерфейса на GitHub Pages:

1. Установите gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в package.json:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/media-hub",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Разверните:
```bash
npm run deploy
```

4. Включите GitHub Pages в настройках репозитория

## 📋 Чеклист перед публикацией

- [ ] Замените `YOUR_USERNAME` во всех файлах
- [ ] Обновите описание в README.md
- [ ] Добавьте скриншоты (опционально)
- [ ] Проверьте, что все ссылки работают
- [ ] Убедитесь, что .gitignore корректен
- [ ] Протестируйте установку на чистой системе
- [ ] Создайте первый релиз
- [ ] Добавьте темы (Topics) в настройках репозитория

## 🎯 Темы для репозитория

Добавьте эти темы в настройках репозитория:

- media-hub
- multimedia
- linux
- docker
- jellyfin
- home-assistant
- retrogaming
- videoplayer
- music-player
- smart-home
- iptv
- mediaplayer
- linuxmint
- self-hosted

## 📞 Социальные ссылки

Добавьте в README.md:

```markdown
## 🌐 Ссылки

- **Website**: https://your-website.com
- **Documentation**: https://docs.your-website.com
- **Telegram**: https://t.me/your_channel
- **YouTube**: https://youtube.com/your_channel
- **Discord**: https://discord.gg/your_server
```

## 🔄 Автоматизация обновлений

Создайте GitHub Actions для автоматической сборки при каждом push:

```yaml
# .github/workflows/auto-build.yml
name: Auto Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
```

## 📈 Продвижение проекта

1. **Reddit**: Опубликуйте в r/selfhosted, r/homelab, r/linux
2. **Hacker News**: Submit story
3. **Product Hunt**: Запустите продукт
4. **Dev.to**: Напишите статью
5. **Medium**: Опубликуйте tutorial
6. **YouTube**: Создайте видео-обзор

## 🎉 Готово!

Ваш проект готов к публикации на GitHub!

---

**Удачи с проектом Media Hub!** 🚀
