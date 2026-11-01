import { motion } from 'framer-motion';
import { HomeIcon, Thermometer, Droplets, Lightbulb, Lock, Bell, Zap, Wind } from 'lucide-react';
import { useState } from 'react';

const rooms = [
  { name: 'Гостиная', icon: HomeIcon, devices: 5 },
  { name: 'Спальня', icon: Lightbulb, devices: 3 },
  { name: 'Кухня', icon: Wind, devices: 2 },
  { name: 'Гараж', icon: Lock, devices: 4 },
];

const sensors = [
  { name: 'Температура', value: '22.5°C', icon: Thermometer, color: 'text-orange-400', status: 'normal' },
  { name: 'Влажность', value: '45%', icon: Droplets, color: 'text-blue-400', status: 'normal' },
  { name: 'Освещённость', value: '320 lux', icon: Lightbulb, color: 'text-yellow-400', status: 'normal' },
  { name: 'Протечка', value: 'Нет', icon: Droplets, color: 'text-green-400', status: 'ok' },
];

const automations = [
  { name: 'Движение в гараже → Камера + Свет', active: true, trigger: 'Датчик движения' },
  { name: 'Закат → Включить уличное освещение', active: true, trigger: 'Время (20:30)' },
  { name: 'Температура > 28°C → Кондиционер', active: false, trigger: 'Датчик температуры' },
  { name: 'Ночь → Выключить все светильники', active: true, trigger: 'Время (23:00)' },
];

const devices = [
  { name: 'Люстра', room: 'Гостиная', type: 'light', state: true, brightness: 80 },
  { name: 'Торшер', room: 'Гостиная', type: 'light', state: false, brightness: 0 },
  { name: 'Термостат', room: 'Гостиная', type: 'climate', state: true, value: '22°C' },
  { name: 'Розетка TV', room: 'Гостиная', type: 'switch', state: true },
  { name: 'Датчик двери', room: 'Гостиная', type: 'sensor', state: false },
  { name: 'LED лента', room: 'Спальня', type: 'light', state: true, brightness: 30 },
  { name: 'Ночник', room: 'Спальня', type: 'light', state: false, brightness: 0 },
  { name: 'Кондиционер', room: 'Спальня', type: 'climate', state: false, value: '24°C' },
];

export default function SmartHomeSection() {
  const [activeRoom, setActiveRoom] = useState('Гостиная');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <HomeIcon className="w-7 h-7 text-yellow-400" />
          Умный дом
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Home Assistant
          </span>
          <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
            14 устройств онлайн
          </span>
        </div>
      </div>

      {/* Sensors Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sensors.map((sensor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4"
          >
            <sensor.icon className={`w-6 h-6 ${sensor.color} mb-2`} />
            <p className="text-xs text-gray-400">{sensor.name}</p>
            <p className="text-lg font-bold text-white">{sensor.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rooms */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="font-semibold text-white mb-4">Комнаты</h3>
          <div className="space-y-2">
            {rooms.map(room => (
              <button
                key={room.name}
                onClick={() => setActiveRoom(room.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeRoom === room.name
                    ? 'bg-yellow-500/10 border border-yellow-500/30'
                    : 'hover:bg-gray-700/30 border border-transparent'
                }`}
              >
                <room.icon className={`w-5 h-5 ${activeRoom === room.name ? 'text-yellow-400' : 'text-gray-400'}`} />
                <span className="text-sm text-white flex-1 text-left">{room.name}</span>
                <span className="text-xs text-gray-400">{room.devices} устр.</span>
              </button>
            ))}
          </div>
        </div>

        {/* Devices in Room */}
        <div className="lg:col-span-2 bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="font-semibold text-white mb-4">Устройства — {activeRoom}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {devices.filter(d => d.room === activeRoom).map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {device.type === 'light' && <Lightbulb className={`w-5 h-5 ${device.state ? 'text-yellow-400' : 'text-gray-500'}`} />}
                    {device.type === 'climate' && <Thermometer className={`w-5 h-5 ${device.state ? 'text-orange-400' : 'text-gray-500'}`} />}
                    {device.type === 'switch' && <Zap className={`w-5 h-5 ${device.state ? 'text-green-400' : 'text-gray-500'}`} />}
                    {device.type === 'sensor' && <Bell className={`w-5 h-5 ${device.state ? 'text-red-400' : 'text-gray-500'}`} />}
                    <span className="text-sm font-medium text-white">{device.name}</span>
                  </div>
                  <button className={`w-10 h-5 rounded-full transition-colors ${device.state ? 'bg-yellow-500' : 'bg-gray-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${device.state ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                {device.type === 'light' && device.state && (
                  <div className="mt-2">
                    <input type="range" min="0" max="100" defaultValue={device.brightness} className="w-full accent-yellow-400" />
                    <p className="text-xs text-gray-400 text-center">{device.brightness}%</p>
                  </div>
                )}
                {device.type === 'climate' && (
                  <p className="text-sm text-orange-400 mt-1">{device.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Automations */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Автоматизации
        </h3>
        <div className="space-y-3">
          {automations.map((auto, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 border border-gray-700/20"
            >
              <button className={`w-10 h-5 rounded-full transition-colors ${auto.active ? 'bg-purple-500' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${auto.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <div className="flex-1">
                <p className={`text-sm ${auto.active ? 'text-white' : 'text-gray-400'}`}>{auto.name}</p>
                <p className="text-xs text-gray-500">Триггер: {auto.trigger}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
