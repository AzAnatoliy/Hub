import { motion } from 'framer-motion';
import { Film, Music, ImageIcon, Gamepad2, Camera, HomeIcon, Wifi, Download, Clock, TrendingUp, Sun, CloudRain, Thermometer, Wind, Bell, Play } from 'lucide-react';
import type { Section } from '../App';
import { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (section: Section) => void;
}

const mainTiles = [
  { id: 'video' as Section, label: 'Видео', icon: Film, color: 'from-red-500 to-orange-500', desc: 'Фильмы, сериалы, аниме', count: '1,247' },
  { id: 'music' as Section, label: 'Музыка', icon: Music, color: 'from-green-500 to-emerald-500', desc: 'Hi-Res, FLAC, DSD', count: '842' },
  { id: 'photo' as Section, label: 'Фото', icon: ImageIcon, color: 'from-pink-500 to-rose-500', desc: 'Галереи, RAW, слайд-шоу', count: '2,128' },
  { id: 'games' as Section, label: 'Игры', icon: Gamepad2, color: 'from-purple-500 to-pink-500', desc: 'Steam + эмуляторы', count: '34' },
  { id: 'cameras' as Section, label: 'Камеры', icon: Camera, color: 'from-blue-500 to-cyan-500', desc: '2 IP-камеры гараж', count: '2' },
  { id: 'smarthome' as Section, label: 'Умный дом', icon: HomeIcon, color: 'from-yellow-500 to-amber-500', desc: 'Home Assistant', count: '14' },
];

const recentMovies = [
  { title: 'Дюна: Часть вторая', progress: 65, year: '2024', genre: 'Фантастика' },
  { title: 'Оппенгеймер', progress: 100, year: '2023', genre: 'Драма' },
  { title: 'Бедные-несчастные', progress: 30, year: '2024', genre: 'Фэнтези' },
  { title: 'Анатомия падения', progress: 85, year: '2023', genre: 'Триллер' },
];

const downloads = [
  { name: 'The.Last.of.Us.S02E01.1080p', progress: 78, speed: '12.4 МБ/с', eta: '4 мин' },
  { name: 'Shogun.S01E08.2160p.WEB-DL', progress: 45, speed: '8.7 МБ/с', eta: '12 мин' },
  { name: 'Dune.Part.2.2024.2160p.BluRay', progress: 12, speed: '15.1 МБ/с', eta: '28 мин' },
];

const notifications = [
  { type: 'download', text: 'Shogun S01E08 готов к просмотру', time: '2 мин назад', color: 'text-green-400' },
  { type: 'camera', text: 'Движение обнаружено — Гараж', time: '15 мин назад', color: 'text-yellow-400' },
  { type: 'system', text: 'Обновление Docker: 2 контейнера', time: '1 час назад', color: 'text-blue-400' },
  { type: 'smarthome', text: 'Температура в гостиной: 22.5°C', time: '2 часа назад', color: 'text-orange-400' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [cpuUsage, setCpuUsage] = useState(23);
  const [ramUsage, setRamUsage] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 15);
      setRamUsage(Math.floor(Math.random() * 10) + 35);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Row: Weather + Quick Stats + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-2xl border border-blue-500/20 p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-400">Москва</p>
                <p className="text-3xl font-bold text-white">-3°C</p>
              </div>
              <Sun className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-300">Переменная облачность</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> 5 м/с</span>
              <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" /> Ощущ: -7°</span>
              <span className="flex items-center gap-1"><CloudRain className="w-3 h-3" /> 10%</span>
            </div>
          </div>
        </motion.div>

        {/* System Monitor Mini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5"
        >
          <h3 className="text-sm font-medium text-gray-400 mb-3">Система</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">CPU</span>
                <span className="text-white">{cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  animate={{ width: `${cpuUsage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">ОЗУ</span>
                <span className="text-white">3.2 / 8 ГБ ({ramUsage}%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{ width: `${ramUsage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Диск</span>
                <span className="text-white">665 / 1000 ГБ</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '66%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">GPU</span>
                <span className="text-white">12% (VA-API idle)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Уведомления
            </h3>
            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">4</span>
          </div>
          <div className="space-y-2">
            {notifications.map((notif, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-700/30 cursor-pointer transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.color.replace('text-', 'bg-')}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{notif.text}</p>
                  <p className="text-[10px] text-gray-500">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Tiles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainTiles.map((tile, index) => (
          <motion.button
            key={tile.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(tile.id)}
            className="relative overflow-hidden rounded-2xl p-5 bg-gray-800/50 border border-gray-700/30 hover:border-gray-600/50 transition-all group text-left"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.color} flex items-center justify-center mb-3 shadow-lg`}>
              <tile.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white text-sm">{tile.label}</h3>
            <p className="text-xs text-gray-400 mt-1">{tile.desc}</p>
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-white font-medium">{tile.count}</span> элементов
            </div>
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
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-blue-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <Film className="w-6 h-6 text-gray-500" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{movie.title}</h4>
                    <p className="text-xs text-gray-400">{movie.year} • {movie.genre}</p>
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
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20"
              >
                <p className="text-xs text-white font-medium truncate mb-2">{dl.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-green-500 transition-all" style={{ width: `${dl.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{dl.progress}%</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{dl.speed}</span>
                  <span className="text-xs text-gray-500">ETA: {dl.eta}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700/30">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Общая скорость</span>
              <span className="text-green-400 font-medium">36.2 МБ/с</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions + System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Аптайм" value="14д 7ч" color="text-blue-400" />
        <StatCard icon={<Download className="w-4 h-4" />} label="Скорость" value="36.2 МБ/с" color="text-green-400" />
        <StatCard icon={<Film className="w-4 h-4" />} label="Медиатека" value="1,247 файлов" color="text-purple-400" />
        <StatCard icon={<Camera className="w-4 h-4" />} label="Записи" value="23.4 ГБ" color="text-orange-400" />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Снапшот', icon: '📸', action: 'Timeshift' },
            { label: 'Обновить', icon: '🔄', action: 'Docker pull' },
            { label: 'Перезапуск', icon: '⚡', action: 'Системы' },
            { label: 'Бэкап', icon: '💾', action: 'Конфигурации' },
            { label: 'Очистка', icon: '🧹', action: 'Кэш/логи' },
            { label: 'Терминал', icon: '🖥️', action: 'SSH' },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-gray-600/50 transition-all text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="text-xs text-white mt-1 font-medium">{action.label}</p>
              <p className="text-[10px] text-gray-500">{action.action}</p>
            </motion.button>
          ))}
        </div>
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
