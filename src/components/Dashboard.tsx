import { motion } from 'framer-motion';
import { Film, Music, Gamepad2, Camera, HomeIcon, Wifi, Download, Clock, TrendingUp } from 'lucide-react';
import type { Section } from '../App';

interface DashboardProps {
  onNavigate: (section: Section) => void;
}

const mainTiles = [
  { id: 'video' as Section, label: 'Видео', icon: Film, color: 'from-red-500 to-orange-500', desc: 'Фильмы, сериалы, аниме' },
  { id: 'music' as Section, label: 'Музыка', icon: Music, color: 'from-green-500 to-emerald-500', desc: 'Hi-Res аудио, FLAC, DSD' },
  { id: 'games' as Section, label: 'Игры', icon: Gamepad2, color: 'from-purple-500 to-pink-500', desc: 'Steam + эмуляторы' },
  { id: 'cameras' as Section, label: 'Камеры', icon: Camera, color: 'from-blue-500 to-cyan-500', desc: '2 IP-камеры гараж' },
  { id: 'smarthome' as Section, label: 'Умный дом', icon: HomeIcon, color: 'from-yellow-500 to-amber-500', desc: 'Home Assistant' },
  { id: 'network' as Section, label: 'Сеть', icon: Wifi, color: 'from-indigo-500 to-blue-500', desc: 'Модем, прокси, DNS' },
];

const recentMovies = [
  { title: 'Дюна: Часть вторая', progress: 65, year: '2024' },
  { title: 'Оппенгеймер', progress: 100, year: '2023' },
  { title: 'Бедные-несчастные', progress: 30, year: '2024' },
  { title: 'Анатомия падения', progress: 85, year: '2023' },
];

const downloads = [
  { name: 'The.Last.of.Us.S02E01.1080p', progress: 78, speed: '12.4 МБ/с' },
  { name: 'Shogun.S01E08.2160p.WEB-DL', progress: 45, speed: '8.7 МБ/с' },
  { name: 'Dune.Part.2.2024.2160p.BluRay', progress: 12, speed: '15.1 МБ/с' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Main Tiles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainTiles.map((tile, index) => (
          <motion.button
            key={tile.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(tile.id)}
            className="relative overflow-hidden rounded-2xl p-5 bg-gray-800/50 border border-gray-700/30 hover:border-gray-600/50 transition-all group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.color} flex items-center justify-center mb-3 shadow-lg`}>
              <tile.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white text-sm">{tile.label}</h3>
            <p className="text-xs text-gray-400 mt-1">{tile.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Watching */}
        <div className="lg:col-span-2 bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Продолжить просмотр
            </h2>
            <button onClick={() => onNavigate('video')} className="text-xs text-blue-400 hover:text-blue-300">
              Все →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentMovies.map((movie, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Film className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-400">{movie.year}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${movie.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${movie.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {movie.progress === 100 ? '✓ Просмотрено' : `${movie.progress}% просмотрено`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              Загрузки
            </h2>
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              {downloads.length} активно
            </span>
          </div>
          <div className="space-y-3">
            {downloads.map((dl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20"
              >
                <p className="text-xs text-white font-medium truncate mb-2">{dl.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-green-500 transition-all" style={{ width: `${dl.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{dl.progress}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{dl.speed}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Аптайм" value="14д 7ч" color="text-blue-400" />
        <StatCard icon={<Download className="w-4 h-4" />} label="Скорость" value="36.2 МБ/с" color="text-green-400" />
        <StatCard icon={<Film className="w-4 h-4" />} label="Медиатека" value="1,247 файлов" color="text-purple-400" />
        <StatCard icon={<Camera className="w-4 h-4" />} label="Записи" value="23.4 ГБ" color="text-orange-400" />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4 flex items-center gap-3">
      <div className={`${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
