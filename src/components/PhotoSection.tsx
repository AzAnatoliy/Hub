import { motion } from 'framer-motion';
import { ImageIcon, Camera, FolderOpen, Play, Grid3X3, LayoutGrid, Film, Download, Star } from 'lucide-react';
import { useState } from 'react';

const albums = [
  { name: 'Отпуск 2024 — Турция', count: 342, date: 'Август 2024', cover: '🏖️' },
  { name: 'День рождения', count: 156, date: 'Июнь 2024', cover: '🎂' },
  { name: 'Семейные фото', count: 1240, date: '2020-2024', cover: '👨‍👩‍👧‍👦' },
  { name: 'Природа', count: 89, date: 'Разное', cover: '🌿' },
  { name: 'Город', count: 234, date: '2023-2024', cover: '🏙️' },
  { name: 'RAW фотографии', count: 67, date: '2024', cover: '📷' },
];

const photos = [
  { id: 1, title: 'Закат на море', date: '15.08.2024', format: 'JPEG', size: '8.4 МБ', resolution: '6000x4000', favorite: true },
  { id: 2, title: 'Горы утром', date: '12.07.2024', format: 'RAW (CR3)', size: '32.1 МБ', resolution: '6960x4640', favorite: false },
  { id: 3, title: 'Портрет', date: '01.06.2024', format: 'JPEG', size: '5.2 МБ', resolution: '4000x6000', favorite: true },
  { id: 4, title: 'Архитектура', date: '22.05.2024', format: 'JPEG', size: '7.8 МБ', resolution: '5472x3648', favorite: false },
  { id: 5, title: 'Макро цветок', date: '10.05.2024', format: 'RAW (NEF)', size: '28.5 МБ', resolution: '5568x3712', favorite: true },
  { id: 6, title: 'Ночной город', date: '03.04.2024', format: 'JPEG', size: '6.1 МБ', resolution: '6000x4000', favorite: false },
  { id: 7, title: 'Лес осенью', date: '15.10.2023', format: 'JPEG', size: '9.2 МБ', resolution: '6000x4000', favorite: false },
  { id: 8, title: 'Снежные вершины', date: '28.01.2024', format: 'RAW (ARW)', size: '41.3 МБ', resolution: '7952x5304', favorite: true },
];

const slideshows = [
  { name: 'Лучшие 2024', photos: 48, duration: '15 мин', music: 'Chill Vibes' },
  { name: 'Семейный альбом', photos: 120, duration: '32 мин', music: 'Classic Piano' },
  { name: 'Путешествия', photos: 85, duration: '22 мин', music: 'Ambient' },
];

export default function PhotoSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <ImageIcon className="w-7 h-7 text-pink-400" />
          Фотогалерея
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-pink-500/20 text-pink-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('large')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'large' ? 'bg-pink-500/20 text-pink-400' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-pink-500/20 text-pink-300 px-3 py-2 rounded-lg text-sm hover:bg-pink-500/30 transition-colors">
            <Film className="w-4 h-4" />
            Слайд-шоу
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4">
          <p className="text-xs text-gray-400">Всего фото</p>
          <p className="text-xl font-bold text-white">2,128</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4">
          <p className="text-xs text-gray-400">RAW файлы</p>
          <p className="text-xl font-bold text-white">67</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4">
          <p className="text-xs text-gray-400">Занимают места</p>
          <p className="text-xl font-bold text-white">18.4 ГБ</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4">
          <p className="text-xs text-gray-400">Избранное</p>
          <p className="text-xl font-bold text-white">234</p>
        </div>
      </div>

      {/* Albums */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-yellow-400" />
          Альбомы
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {albums.map((album, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4 hover:border-pink-500/30 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3">{album.cover}</div>
              <h4 className="text-sm font-medium text-white truncate group-hover:text-pink-300">{album.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{album.count} фото • {album.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Camera className="w-5 h-5 text-pink-400" />
          Недавние фото
        </h3>
        <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-2 md:grid-cols-3'}`}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedPhoto(selectedPhoto === photo.id ? null : photo.id)}
              className={`relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                selectedPhoto === photo.id ? 'border-pink-500/50 shadow-lg shadow-pink-500/10 scale-95' : 'border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-600" />
              </div>
              {photo.favorite && (
                <div className="absolute top-2 right-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              )}
              {photo.format.includes('RAW') && (
                <span className="absolute top-2 left-2 text-[10px] bg-purple-500/80 text-white px-1.5 py-0.5 rounded">
                  RAW
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{photo.title}</p>
                <p className="text-[10px] text-gray-300">{photo.resolution}</p>
              </div>
              {selectedPhoto === photo.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2"
                >
                  <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                    <Play className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slideshows */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Film className="w-5 h-5 text-purple-400" />
          Слайд-шоу
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slideshows.map((show, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-gray-700/30 p-4 hover:border-purple-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Film className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{show.name}</h4>
                  <p className="text-xs text-gray-400">{show.photos} фото • {show.duration}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">🎵 {show.music}</span>
                <button className="flex items-center gap-1 bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg text-xs hover:bg-purple-500/30">
                  <Play className="w-3 h-3" />
                  Запустить
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
