import { motion } from 'framer-motion';
import { Camera, Maximize2, Circle, Settings, AlertTriangle, Archive, Eye } from 'lucide-react';
import { useState } from 'react';

const cameras = [
  { id: 1, name: 'Гараж — Вход', location: 'Входная дверь', status: 'online', resolution: '1080p', motion: false },
  { id: 2, name: 'Гараж — Внутрь', location: 'Рабочая зона', status: 'online', resolution: '1080p', motion: true },
];

const motionEvents = [
  { camera: 'Гараж — Внутрь', time: '14:32', date: 'Сегодня', thumbnail: true },
  { camera: 'Гараж — Вход', time: '12:15', date: 'Сегодня', thumbnail: true },
  { camera: 'Гараж — Внутрь', time: '09:47', date: 'Сегодня', thumbnail: true },
  { camera: 'Гараж — Вход', time: '22:03', date: 'Вчера', thumbnail: true },
  { camera: 'Гараж — Внутрь', time: '18:22', date: 'Вчера', thumbnail: true },
];

export default function CamerasSection() {
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [recording, setRecording] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Camera className="w-7 h-7 text-blue-400" />
          Видеонаблюдение
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Go2RTC
          </span>
          <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${recording ? 'bg-red-500/20 text-red-300' : 'bg-gray-700/60 text-gray-300'}`}>
            <Circle className={`w-3 h-3 ${recording ? 'fill-red-400' : ''}`} />
            {recording ? 'Запись' : 'Пауза'}
          </span>
        </div>
      </div>

      {/* Camera Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cameras.map((cam, i) => (
          <motion.div
            key={cam.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl overflow-hidden border transition-all cursor-pointer ${
              selectedCamera === cam.id ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-700/30'
            }`}
            onClick={() => setSelectedCamera(cam.id)}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <Camera className="w-16 h-16 text-gray-600" />
              
              {/* Overlay Info */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cam.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-xs text-white bg-black/50 px-2 py-0.5 rounded">{cam.resolution}</span>
              </div>
              
              {cam.motion && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500/80 px-2 py-1 rounded text-xs text-white animate-pulse">
                  <AlertTriangle className="w-3 h-3" />
                  Движение
                </div>
              )}

              {/* Camera Name */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">{cam.name}</p>
                <p className="text-xs text-gray-300 bg-black/50 px-2 py-0.5 rounded mt-1">{cam.location}</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-3 right-3 flex gap-1">
                <button className="w-7 h-7 bg-black/50 rounded flex items-center justify-center hover:bg-black/70">
                  <Maximize2 className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Motion Events */}
        <div className="lg:col-span-2 bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              События движения
            </h3>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Archive className="w-3 h-3" />
              Архив
            </button>
          </div>
          <div className="space-y-3">
            {motionEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-yellow-500/30 transition-all cursor-pointer"
              >
                <div className="w-20 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{event.camera}</p>
                  <p className="text-xs text-gray-400">{event.date} в {event.time}</p>
                </div>
                <button className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30">
                  Смотреть
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Настройки
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Запись по движению</span>
              <button
                onClick={() => setRecording(!recording)}
                className={`w-10 h-5 rounded-full transition-colors ${recording ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${recording ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Уведомления</span>
              <button className="w-10 h-5 rounded-full bg-blue-500">
                <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Telegram</span>
              <button className="w-10 h-5 rounded-full bg-blue-500">
                <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
              </button>
            </div>

            <div className="border-t border-gray-700/30 pt-3">
              <p className="text-xs text-gray-400 mb-2">Хранилище записей</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '35%' }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">23.4 ГБ / 100 ГБ</p>
            </div>

            <div className="border-t border-gray-700/30 pt-3">
              <p className="text-xs text-gray-400 mb-2">RTSP потоки</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-300 font-mono">cam1: rtsp://192.168.1.101:554/stream1</p>
                <p className="text-xs text-gray-300 font-mono">cam2: rtsp://192.168.1.102:554/stream1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
