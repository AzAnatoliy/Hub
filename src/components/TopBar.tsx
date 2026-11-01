import { useState, useEffect } from 'react';
import { Wifi, Signal, Shield, Thermometer, Clock } from 'lucide-react';

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [modemStatus] = useState({ connected: true, operator: 'МТС', signal: 78, network: '4G LTE', rssi: -65 });
  const [proxyStatus] = useState({ active: true, node: '🇳🇱 NL-01', protocol: 'VLESS' });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-sm font-bold">М</span>
        </div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Медиа-Хаб v3.0
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Modem Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full">
          <Signal className={`w-4 h-4 ${modemStatus.connected ? 'text-green-400' : 'text-red-400'}`} />
          <span className="text-xs text-gray-300">{modemStatus.operator}</span>
          <span className="text-xs text-blue-400 font-medium">{modemStatus.network}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1 h-${i + 1} rounded-full ${i <= Math.ceil(modemStatus.signal / 20) ? 'bg-green-400' : 'bg-gray-600'}`} 
                style={{ height: `${i * 3 + 4}px` }} />
            ))}
          </div>
        </div>

        {/* Proxy Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full">
          <Shield className={`w-4 h-4 ${proxyStatus.active ? 'text-green-400' : 'text-gray-500'}`} />
          <span className="text-xs text-gray-300">{proxyStatus.node}</span>
          <span className="text-xs text-purple-400">{proxyStatus.protocol}</span>
        </div>

        {/* System Info */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-gray-300">CPU: 23%</span>
          <span className="text-xs text-gray-300">RAM: 3.2/8 ГБ</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-full">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-mono text-white">
            {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </header>
  );
}
