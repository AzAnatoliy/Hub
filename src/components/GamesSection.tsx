import { motion } from 'framer-motion';
import { Gamepad2, Joystick, Monitor, Star, Clock, Trophy } from 'lucide-react';
import { useState } from 'react';

const tabs = ['Все', 'Steam', 'Эмуляторы', 'Недавние', 'Избранное'];

const steamGames = [
  { title: 'Cyberpunk 2077', status: 'Установлена', hours: 124, rating: 9, platform: 'PC (Proton)' },
  { title: 'Elden Ring', status: 'Установлена', hours: 89, rating: 10, platform: 'PC (Proton)' },
  { title: 'Hades II', status: 'Установлена', hours: 45, rating: 9, platform: 'PC (Native)' },
  { title: 'Baldur\'s Gate 3', status: 'Установлена', hours: 210, rating: 10, platform: 'PC (Native)' },
];

const emulators = [
  { name: 'Nintendo', consoles: ['NES', 'SNES', 'N64', 'GameCube', 'Wii', 'GB', 'GBA', 'DS'] },
  { name: 'Sony', consoles: ['PS1', 'PS2', 'PSP', 'PS Vita'] },
  { name: 'Sega', consoles: ['Genesis', 'Saturn', 'Dreamcast'] },
  { name: 'Arcade', consoles: ['MAME', 'FinalBurn Neo'] },
  { name: 'Microsoft', consoles: ['Xbox', 'Xbox 360'] },
  { name: 'Atari', consoles: ['2600', '7800', 'Jaguar'] },
];

const recentGames = [
  { title: 'Elden Ring', platform: 'Steam', lastPlayed: '2 часа назад', progress: 'NG+3' },
  { title: 'Super Mario World', platform: 'SNES', lastPlayed: 'Вчера', progress: '78%' },
  { title: 'Cyberpunk 2077', platform: 'Steam', lastPlayed: '3 дня назад', progress: 'Основная сюжетка' },
  { title: 'Castlevania: SotN', platform: 'PS1', lastPlayed: 'Неделю назад', progress: '100%' },
];

export default function GamesSection() {
  const [activeTab, setActiveTab] = useState('Все');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Gamepad2 className="w-7 h-7 text-purple-400" />
          Игры
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
            RetroArch + Steam
          </span>
          <span className="text-xs bg-gray-700/60 text-gray-300 px-3 py-1 rounded-full">
            🎮 Геймпад подключён
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-800/60 text-gray-400 hover:text-white border border-gray-700/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Continue Playing Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-gray-700/30 p-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-32 h-44 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gamepad2 className="w-12 h-12 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Продолжить</span>
              <span className="text-xs text-gray-400">NG+3</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Elden Ring</h2>
            <p className="text-sm text-gray-400 mb-3">89 часов • Steam (Proton) • Последний раз: 2 часа назад</p>
            <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              <Gamepad2 className="w-4 h-4" />
              Запустить
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Steam Games */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-blue-400" />
            Steam (Proton)
          </h3>
          <div className="space-y-3">
            {steamGames.map((game, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-purple-500/30 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{game.title}</h4>
                  <p className="text-xs text-gray-400">{game.platform} • {game.hours}ч</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-400">{game.rating}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emulators */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Joystick className="w-5 h-5 text-pink-400" />
            Эмуляторы (RetroArch)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {emulators.map((emu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-pink-500/30 transition-all cursor-pointer"
              >
                <h4 className="font-medium text-white text-sm mb-2">{emu.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {emu.consoles.map(c => (
                    <span key={c} className="text-[10px] bg-gray-700/60 text-gray-300 px-1.5 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-orange-400" />
          Недавние игры
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentGames.map((game, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/20 hover:border-orange-500/30 transition-all cursor-pointer"
            >
              <div className="w-full aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-gray-600" />
              </div>
              <h4 className="font-medium text-white text-sm">{game.title}</h4>
              <p className="text-xs text-gray-400">{game.platform} • {game.lastPlayed}</p>
              <p className="text-xs text-orange-400 mt-1">{game.progress}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Последние достижения
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { game: 'Elden Ring', achievement: 'Эlden Lord', rare: '2.1%' },
            { game: 'Hades II', achievement: 'Первый побег', rare: '45%' },
            { game: 'Cyberpunk 2077', achievement: 'The Star', rare: '12%' },
            { game: 'BG3', achievement: 'Absolute Power', rare: '5.3%' },
          ].map((ach, i) => (
            <div key={i} className="flex-shrink-0 bg-gray-900/60 rounded-xl p-3 border border-yellow-500/20 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-400">{ach.rare} игроков</span>
              </div>
              <p className="text-sm font-medium text-white">{ach.achievement}</p>
              <p className="text-xs text-gray-400">{ach.game}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
