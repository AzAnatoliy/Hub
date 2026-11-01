import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Activity, Thermometer, Clock, Server, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateHistory = (baseValue: number, variance: number) => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${20 - i}м`,
    value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance)),
  }));
};

const processes = [
  { name: 'mpv', pid: 2847, cpu: 12.3, ram: 487, type: 'Видеоплеер' },
  { name: 'jellyfin', pid: 1203, cpu: 8.1, ram: 412, type: 'Docker' },
  { name: 'firefox', pid: 3102, cpu: 6.7, ram: 398, type: 'Браузер' },
  { name: 'homeassistant', pid: 1456, cpu: 4.2, ram: 512, type: 'Docker' },
  { name: 'sonarr', pid: 1567, cpu: 2.1, ram: 248, type: 'Docker' },
  { name: 'radarr', pid: 1678, cpu: 1.8, ram: 245, type: 'Docker' },
  { name: 'qbittorrent', pid: 2345, cpu: 3.4, ram: 102, type: 'Торрент' },
  { name: 'mihomo', pid: 1890, cpu: 0.8, ram: 156, type: 'Прокси' },
  { name: 'go2rtc', pid: 1789, cpu: 1.2, ram: 48, type: 'Docker' },
  { name: 'adguardhome', pid: 1345, cpu: 0.5, ram: 148, type: 'Docker' },
];

const dockerContainers = [
  { name: 'jellyfin', status: 'running', cpu: 8.1, ram: 412, network: '12.4 МБ/с', uptime: '14д 7ч' },
  { name: 'sonarr', status: 'running', cpu: 2.1, ram: 248, network: '0.3 МБ/с', uptime: '14д 7ч' },
  { name: 'radarr', status: 'running', cpu: 1.8, ram: 245, network: '0.2 МБ/с', uptime: '14д 7ч' },
  { name: 'homeassistant', status: 'running', cpu: 4.2, ram: 512, network: '1.1 МБ/с', uptime: '14д 7ч' },
  { name: 'adguardhome', status: 'running', cpu: 0.5, ram: 148, network: '0.8 МБ/с', uptime: '14д 7ч' },
  { name: 'go2rtc', status: 'running', cpu: 1.2, ram: 48, network: '4.2 МБ/с', uptime: '14д 7ч' },
  { name: 'watchtower', status: 'running', cpu: 0.1, ram: 20, network: '0 МБ/с', uptime: '14д 7ч' },
];

export default function MonitorSection() {
  const [cpuHistory, setCpuHistory] = useState(generateHistory(23, 15));
  const [ramHistory, setRamHistory] = useState(generateHistory(40, 8));
  const [networkHistory, setNetworkHistory] = useState(generateHistory(36, 20));
  const [temp, setTemp] = useState(52);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory(prev => [...prev.slice(1), { time: '0м', value: Math.max(5, Math.min(95, prev[prev.length - 1].value + (Math.random() - 0.5) * 20)) }]);
      setRamHistory(prev => [...prev.slice(1), { time: '0м', value: Math.max(30, Math.min(70, prev[prev.length - 1].value + (Math.random() - 0.5) * 5)) }]);
      setNetworkHistory(prev => [...prev.slice(1), { time: '0м', value: Math.max(0, Math.min(100, prev[prev.length - 1].value + (Math.random() - 0.5) * 30)) }]);
      setTemp(Math.floor(48 + Math.random() * 12));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Activity className="w-7 h-7 text-cyan-400" />
          Системный монитор
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Обновление: 2 сек
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Cpu className="w-5 h-5" />}
          label="CPU"
          value={`${cpuHistory[cpuHistory.length - 1].value.toFixed(0)}%`}
          subtext="Intel i3-1215U"
          color="text-blue-400"
          bgColor="bg-blue-500/10"
        />
        <MetricCard
          icon={<MemoryStick className="w-5 h-5" />}
          label="ОЗУ"
          value={`${(ramHistory[ramHistory.length - 1].value / 100 * 8).toFixed(1)} / 8 ГБ`}
          subtext={`${ramHistory[ramHistory.length - 1].value.toFixed(0)}%`}
          color="text-purple-400"
          bgColor="bg-purple-500/10"
        />
        <MetricCard
          icon={<Thermometer className="w-5 h-5" />}
          label="Температура"
          value={`${temp}°C`}
          subtext="CPU Package"
          color={temp > 60 ? 'text-red-400' : 'text-green-400'}
          bgColor={temp > 60 ? 'bg-red-500/10' : 'bg-green-500/10'}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Сеть"
          value={`${networkHistory[networkHistory.length - 1].value.toFixed(1)} МБ/с`}
          subtext="↓ Download"
          color="text-green-400"
          bgColor="bg-green-500/10"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Chart */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            CPU загрузка (последние 20 мин)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={cpuHistory}>
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#cpuGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RAM Chart */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <MemoryStick className="w-4 h-4 text-purple-400" />
            ОЗУ (последние 20 мин)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ramHistory}>
              <defs>
                <linearGradient id="ramGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Area type="monotone" dataKey="value" stroke="#a855f7" fill="url(#ramGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Network Chart */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Сеть (МБ/с, последние 20 мин)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={networkHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Disk I/O */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-orange-400" />
            Дисковая активность
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Чтение</span>
                <span className="text-orange-400">245 МБ/с</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  animate={{ width: '48%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Запись</span>
                <span className="text-yellow-400">89 МБ/с</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  animate={{ width: '18%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="border-t border-gray-700/30 pt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">NVMe SSD</span>
                <span className="text-white">665 / 1000 ГБ (66%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">SMART статус</span>
                <span className="text-green-400">✓ Healthy</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Температура диска</span>
                <span className="text-white">38°C</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">TBW</span>
                <span className="text-white">42 / 600 ТБ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processes */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          Процессы (топ по CPU)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/30">
                <th className="text-left py-2 text-xs text-gray-500 font-medium">Процесс</th>
                <th className="text-left py-2 text-xs text-gray-500 font-medium">PID</th>
                <th className="text-left py-2 text-xs text-gray-500 font-medium">Тип</th>
                <th className="text-right py-2 text-xs text-gray-500 font-medium">CPU %</th>
                <th className="text-right py-2 text-xs text-gray-500 font-medium">RAM (МБ)</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((proc, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-700/10 hover:bg-gray-700/20"
                >
                  <td className="py-2 text-white font-mono text-xs">{proc.name}</td>
                  <td className="py-2 text-gray-400 font-mono text-xs">{proc.pid}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      proc.type === 'Docker' ? 'bg-blue-500/20 text-blue-300' :
                      proc.type === 'Видеоплеер' ? 'bg-red-500/20 text-red-300' :
                      proc.type === 'Браузер' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-gray-700/60 text-gray-300'
                    }`}>{proc.type}</span>
                  </td>
                  <td className="py-2 text-right text-xs">
                    <span className={proc.cpu > 10 ? 'text-red-400' : proc.cpu > 5 ? 'text-yellow-400' : 'text-gray-300'}>
                      {proc.cpu}%
                    </span>
                  </td>
                  <td className="py-2 text-right text-xs text-gray-300">{proc.ram}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Docker Containers */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          Docker контейнеры
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dockerContainers.map((container, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-mono text-white">{container.name}</span>
                </div>
                <span className="text-xs text-green-400">{container.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">CPU:</span>
                  <span className="text-white ml-1">{container.cpu}%</span>
                </div>
                <div>
                  <span className="text-gray-500">RAM:</span>
                  <span className="text-white ml-1">{container.ram} МБ</span>
                </div>
                <div>
                  <span className="text-gray-500">Сеть:</span>
                  <span className="text-white ml-1">{container.network}</span>
                </div>
                <div>
                  <span className="text-gray-500">⏱</span>
                  <span className="text-white ml-1">{container.uptime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, subtext, color, bgColor }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
  bgColor: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${bgColor} rounded-xl border border-gray-700/30 p-4`}
    >
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{subtext}</p>
    </motion.div>
  );
}
