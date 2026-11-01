import { motion } from 'framer-motion';
import { Play, Search, Filter, Star, Clock, Film, Tv, Sparkles } from 'lucide-react';
import { useState } from 'react';

const categories = ['Все', 'Фильмы', 'Сериалы', 'Аниме', '4K HDR', 'Недавние'];

const movies = [
  { title: 'Дюна: Часть вторая', year: 2024, rating: 8.6, genre: 'Фантастика', progress: 65, quality: '4K HDR' },
  { title: 'Оппенгеймер', year: 2023, rating: 8.9, genre: 'Драма', progress: 100, quality: '4K' },
  { title: 'Бедные-несчастные', year: 2024, rating: 8.3, genre: 'Фэнтези', progress: 30, quality: '1080p' },
  { title: 'Анатомия падения', year: 2023, rating: 8.1, genre: 'Триллер', progress: 85, quality: '1080p' },
  { title: 'Зона интересов', year: 2024, rating: 7.8, genre: 'Драма', progress: 0, quality: '4K HDR' },
  { title: 'Прошлые жизни', year: 2023, rating: 8.0, genre: 'Драма', progress: 0, quality: '1080p' },
  { title: 'Убийцы цветочной луны', year: 2023, rating: 8.2, genre: 'Криминал', progress: 45, quality: '4K' },
  { title: 'Барби', year: 2023, rating: 7.4, genre: 'Комедия', progress: 0, quality: '4K HDR' },
];

const series = [
  { title: 'The Last of Us', season: 'S02', episodes: '8', rating: 9.1, progress: 12 },
  { title: 'Shōgun', season: 'S01', episodes: '10', rating: 9.3, progress: 100 },
  { title: 'Fallout', season: 'S01', episodes: '8', rating: 8.7, progress: 50 },
  { title: 'True Detective: Night Country', season: 'S04', episodes: '6', rating: 8.0, progress: 0 },
];

export default function VideoSection() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Film className="w-7 h-7 text-red-400" />
          Видеотека
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              className="bg-gray-800/60 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 w-64"
            />
          </div>
          <button className="p-2 bg-gray-800/60 rounded-xl border border-gray-700/50 hover:border-gray-600">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                : 'bg-gray-800/60 text-gray-400 hover:text-white border border-gray-700/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Continue Watching Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-gray-700/30 p-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-32 h-44 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <Film className="w-12 h-12 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Продолжить</span>
              <span className="text-xs text-gray-400">65% просмотрено</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Дюна: Часть вторая</h2>
            <p className="text-sm text-gray-400 mb-3">2024 • Фантастика • 4K HDR10+ • 2ч 46мин</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                Продолжить
              </button>
              <button className="flex items-center gap-2 bg-gray-700/60 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-gray-600/60 transition-colors">
                <Sparkles className="w-4 h-4" />
                Стрим (Stremio)
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Movies Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Фильмы
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden mb-2 border border-gray-700/30 group-hover:border-blue-500/50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="w-10 h-10 text-gray-600" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-10 h-10 text-white fill-white" />
                </div>
                {movie.quality && (
                  <span className="absolute top-2 right-2 text-[10px] bg-black/70 text-blue-300 px-1.5 py-0.5 rounded">
                    {movie.quality}
                  </span>
                )}
                {movie.progress > 0 && movie.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-blue-500" style={{ width: `${movie.progress}%` }} />
                  </div>
                )}
              </div>
              <h4 className="text-sm font-medium text-white truncate">{movie.title}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{movie.year}</span>
                <span>•</span>
                <span className="text-yellow-400">★ {movie.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Series */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Tv className="w-5 h-5 text-purple-400" />
          Сериалы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {series.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Tv className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{s.title}</h4>
                <p className="text-xs text-gray-400">{s.season} • {s.episodes} эп. • ★ {s.rating}</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${s.progress === 100 ? 'bg-green-500' : 'bg-purple-500'}`} style={{ width: `${s.progress}%` }} />
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {s.progress === 100 ? '✓ Завершён' : `${s.progress}% просмотрено`}
                </span>
              </div>
              <Play className="w-8 h-8 text-gray-500 group-hover:text-white" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
