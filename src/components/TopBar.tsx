import { useState, useEffect } from 'react';
import { Wifi, Signal, Shield, Thermometer, Clock, Bell, X } from 'lucide-react';

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [modemStatus] = useState({ connected: true, operator: 'МТС', signal: 78, network: '4G LTE' });
  const [proxyStatus] = useState({ active: true, node: '🇳🇱 NL-01', protocol: 'VLESS' });

  const notifications = [
    { id: 1, text: 'Загрузка завершена: Shogun S01E08', time: '2 мин', type: 'success' },
    { id: 2, text: 'Движение обнаружено — Гараж', time: '15 мин', type: 'warning' },
    { id: 3, text: 'Обновление Docker доступно', time: '1 час', type: 'info' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 flex items-center justify-between px-6 relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-sm font-bold text-white">М</span>
        </div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Медиа-Хаб v3.0
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Modem Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full border border-gray-700/30">
          <Signal className={`w-4 h-4 ${modemStatus.connected ? 'text-green-400' : 'text-red-400'}`} />
          <span className="text-xs text-gray-300">{modemStatus.operator}</span>
          <span className="text-xs text-blue-400 font-medium">{modemStatus.network}</span>
          <div className="flex gap-0.5 ml-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1 rounded-full ${i <= Math.ceil(modemStatus.signal / 20) ? 'bg-green-400' : 'bg-gray-600'}`}
                style={{ height: `${i * 3 + 4}px` }} />
            ))}
          </div>
        </div>

        {/* Proxy Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full border border-gray-700/30">
          <Shield className={`w-4 h-4 ${proxyStatus.active ? 'text-green-400' : 'text-gray-500'}`} />
          <span className="text-xs text-gray-300">{proxyStatus.node}</span>
          <span className="text-xs text-purple-400">{proxyStatus.protocol}</span>
        </div>

        {/* System Info */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full border border-gray-700/30">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-gray-300">CPU: 23%</span>
          <span className="text-xs text-gray-300">RAM: 3.2/8 ГБ</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-gray-800/60 rounded-full border border-gray-700/30 hover:border-gray-600 transition-colors"
          >
            <Bell className="w-4 h-4 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-gray-700/50 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Уведомления</span>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-3 border-b border-gray-700/30 hover:bg-gray-800/50 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        notif.type === 'success' ? 'bg-green-400' :
                        notif.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <p className="text-xs text-white">{notif.text}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{notif.time} назад</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full border border-gray-700/30">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-mono text-white">
            {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </header>
  );
}
