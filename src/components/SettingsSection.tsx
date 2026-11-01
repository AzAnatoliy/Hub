import { motion } from 'framer-motion';
import { Settings, Monitor, Palette, HardDrive, Download, Clock, RefreshCw, Save } from 'lucide-react';
import { useState } from 'react';

interface SettingsSectionProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function SettingsSection({ darkMode, setDarkMode }: SettingsSectionProps) {
  const [activeTab, setActiveTab] = useState<'display' | 'system' | 'backup' | 'about'>('display');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Settings className="w-7 h-7 text-gray-400" />
          Настройки
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'display', label: 'Дисплей', icon: Monitor },
          { id: 'system', label: 'Система', icon: HardDrive },
          { id: 'backup', label: 'Бэкап', icon: Download },
          { id: 'about', label: 'О системе', icon: Clock },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                : 'bg-gray-800/60 text-gray-400 hover:text-white border border-gray-700/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Display Settings */}
      {activeTab === 'display' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white">Тема оформления</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setDarkMode(true)}
                className={`flex-1 p-4 rounded-xl border transition-all ${darkMode ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-700/30 hover:border-gray-600'}`}
              >
                <div className="w-full h-16 bg-gray-900 rounded-lg mb-2" />
                <p className="text-sm text-white">Тёмная</p>
              </button>
              <button
                onClick={() => setDarkMode(false)}
                className={`flex-1 p-4 rounded-xl border transition-all ${!darkMode ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-700/30 hover:border-gray-600'}`}
              >
                <div className="w-full h-16 bg-gray-100 rounded-lg mb-2" />
                <p className="text-sm text-white">Светлая</p>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              Дисплей
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Разрешение</span>
                <select className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-white">
                  <option>3840x2160 (4K)</option>
                  <option>1920x1080 (FHD)</option>
                  <option>2560x1440 (QHD)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Частота обновления</span>
                <select className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-white">
                  <option>60 Гц</option>
                  <option>30 Гц</option>
                  <option>24 Гц (кино)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">HDR</span>
                <span className="text-sm text-green-400">HDR10 ✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Масштабирование</span>
                <select className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-white">
                  <option>100%</option>
                  <option>125%</option>
                  <option>150%</option>
                  <option>200%</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white">Режим киоска</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Автозапуск оболочки</span>
                <button className="w-10 h-5 rounded-full bg-blue-500">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Скрыть курсор мыши</span>
                <button className="w-10 h-5 rounded-full bg-blue-500">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">CEC управление (HDMI пульт)</span>
                <button className="w-10 h-5 rounded-full bg-blue-500">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* System Settings */}
      {activeTab === 'system' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-400" />
              Хранилище
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Система (/)</span>
                  <span className="text-white">24 ГБ / 50 ГБ</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '48%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Медиатека (/home/media)</span>
                  <span className="text-white">623 ГБ / 900 ГБ</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: '69%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Docker (/var/lib/docker)</span>
                  <span className="text-white">18 ГБ / 50 ГБ</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '36%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white">Звук (ALSA)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Устройство вывода</span>
                <select className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-white">
                  <option>USB ЦАП Reflex 2.0 Pro (hw:1,0)</option>
                  <option>HDMI Audio (hw:0,3)</option>
                  <option>Встроенная (hw:0,0)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Режим</span>
                <span className="text-sm text-green-400">Exclusive (бит-в-бит)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Макс. разрешение</span>
                <span className="text-sm text-white">32bit / 384kHz, DSD256</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white">Видео (VA-API)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Аппаратное ускорение</span>
                <span className="text-sm text-green-400">Intel VA-API ✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Декодер</span>
                <span className="text-sm text-white">H.264, H.265/HEVC, VP9, AV1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Плеер</span>
                <span className="text-sm text-white">mpv (VA-API copy-back)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Backup Settings */}
      {activeTab === 'backup' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-green-400" />
              Портативность и клонирование
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/20">
                <h4 className="text-sm font-medium text-white mb-2">Timeshift снапшоты</h4>
                <p className="text-xs text-gray-400 mb-3">Быстрое восстановление системы</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-300">• Последний: Сегодня, 03:00</p>
                  <p className="text-xs text-gray-300">• Всего снапшотов: 14</p>
                  <p className="text-xs text-gray-300">• Размер: 8.2 ГБ</p>
                </div>
                <button className="mt-3 w-full bg-green-500/20 text-green-300 px-3 py-2 rounded-lg text-xs hover:bg-green-500/30 transition-colors">
                  Создать снапшот
                </button>
              </div>
              <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/20">
                <h4 className="text-sm font-medium text-white mb-2">Полный образ диска</h4>
                <p className="text-xs text-gray-400 mb-3">Rescuezilla / Clonezilla</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-300">• Последний образ: 12.01.2025</p>
                  <p className="text-xs text-gray-300">• Размер: 45 ГБ</p>
                  <p className="text-xs text-gray-300">• Формат: .img (сжатый)</p>
                </div>
                <button className="mt-3 w-full bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg text-xs hover:bg-blue-500/30 transition-colors">
                  Создать образ
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Save className="w-5 h-5 text-purple-400" />
              Бэкап конфигураций
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Docker контейнеры', size: '2.1 ГБ', lastBackup: 'Сегодня' },
                { name: 'Mihomo конфиг', size: '45 КБ', lastBackup: 'Сегодня' },
                { name: 'Sonarr/Radarr', size: '120 МБ', lastBackup: 'Вчера' },
                { name: 'Оболочка (веб-панель)', size: '12 МБ', lastBackup: '3 дня назад' },
                { name: 'Home Assistant', size: '340 МБ', lastBackup: 'Вчера' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/40">
                  <div>
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} • {item.lastBackup}</p>
                  </div>
                  <button className="text-xs bg-gray-700/60 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-700">
                    Бэкап
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Бэкап всего (один клик)
            </button>
          </div>
        </motion.div>
      )}

      {/* About */}
      {activeTab === 'about' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
            <h3 className="font-semibold text-white">О системе</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Название</span>
                <span className="text-sm text-white">Медиа-Хаб v3.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">ОС</span>
                <span className="text-sm text-white">Linux Mint 22 XFCE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Ядро</span>
                <span className="text-sm text-white">6.8.0-51-generic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Процессор</span>
                <span className="text-sm text-white">Intel Core i3-1215U</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">ОЗУ</span>
                <span className="text-sm text-white">8 ГБ DDR4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Диск</span>
                <span className="text-sm text-white">1 ТБ NVMe SSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">GPU</span>
                <span className="text-sm text-white">Intel Iris Xe (VA-API)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Docker</span>
                <span className="text-sm text-white">27.4.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Аптайм</span>
                <span className="text-sm text-white">14 дней 7 часов 23 минуты</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white mb-4">Распределение ОЗУ (8 ГБ)</h3>
            <div className="space-y-2">
              {[
                { name: 'Linux Mint XFCE', ram: 1.0, color: 'bg-blue-500' },
                { name: 'Docker (база)', ram: 0.2, color: 'bg-indigo-500' },
                { name: 'Jellyfin', ram: 0.4, color: 'bg-red-500' },
                { name: 'Home Assistant', ram: 0.5, color: 'bg-yellow-500' },
                { name: 'Sonarr + Radarr', ram: 0.5, color: 'bg-purple-500' },
                { name: 'AdGuard Home', ram: 0.15, color: 'bg-cyan-500' },
                { name: 'Go2RTC', ram: 0.05, color: 'bg-green-500' },
                { name: 'mpv + браузер', ram: 0.9, color: 'bg-orange-500' },
                { name: 'Mihomo + qBit', ram: 0.25, color: 'bg-pink-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-300 flex-1">{item.name}</span>
                  <span className="text-sm text-white font-mono">~{item.ram} ГБ</span>
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${(item.ram / 8) * 100}%` }} />
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-700/30 pt-2 mt-2 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="text-sm text-gray-300 flex-1">Свободно</span>
                <span className="text-sm text-green-400 font-mono">~4.05 ГБ</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-gray-500" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
