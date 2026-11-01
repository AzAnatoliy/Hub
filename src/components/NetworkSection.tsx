import { motion } from 'framer-motion';
import { Wifi, Signal, Shield, Globe, RefreshCw, Server, HardDrive, Activity } from 'lucide-react';
import { useState } from 'react';

export default function NetworkSection() {
  const [activeTab, setActiveTab] = useState<'modem' | 'proxy' | 'dns' | 'status'>('modem');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Wifi className="w-7 h-7 text-indigo-400" />
          Сеть и Интернет
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'modem', label: 'Модем', icon: Signal },
          { id: 'proxy', label: 'Прокси', icon: Shield },
          { id: 'dns', label: 'DNS', icon: Globe },
          { id: 'status', label: 'Статус', icon: Activity },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/60 text-gray-400 hover:text-white border border-gray-700/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Modem Tab */}
      {activeTab === 'modem' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Modem Info */}
            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Signal className="w-5 h-5 text-green-400" />
                USB Модем
              </h3>
              <div className="space-y-3">
                <InfoRow label="Статус" value="Подключён" valueColor="text-green-400" />
                <InfoRow label="Устройство" value="Huawei E3372h (3595:15ca)" />
                <InfoRow label="Оператор" value="МТС" />
                <InfoRow label="Тип сети" value="4G LTE" />
                <InfoRow label="APN" value="internet.mts.ru" />
                <InfoRow label="IP адрес" value="10.42.128.47" />
                <InfoRow label="IMEI" value="864•••••••••37" />
              </div>
            </div>

            {/* Signal Quality */}
            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                Качество сигнала
              </h3>
              <div className="space-y-4">
                <SignalBar label="RSSI" value={-65} max={-40} min={-110} unit="dBm" color="text-green-400" />
                <SignalBar label="RSRP" value={-85} max={-44} min={-140} unit="dBm" color="text-blue-400" />
                <SignalBar label="SINR" value={18} max={30} min={-20} unit="dB" color="text-purple-400" />
                <SignalBar label="RSRQ" value={-8} max={-3} min={-20} unit="dB" color="text-orange-400" />
                
                <div className="border-t border-gray-700/30 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Скорость ↓</span>
                    <span className="text-white font-medium">36.2 Мбит/с</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Скорость ↑</span>
                    <span className="text-white font-medium">12.8 Мбит/с</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Пинг</span>
                    <span className="text-white font-medium">32 мс</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Failover */}
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <RefreshCw className="w-5 h-5 text-yellow-400" />
              Резервные подключения (Failover)
            </h3>
            <div className="space-y-2">
              <FailoverRow priority={1} name="USB Модем (МТС 4G)" status="active" metric="36.2 Мбит/с" />
              <FailoverRow priority={2} name="Wi-Fi (TP-Link)" status="standby" metric="—" />
              <FailoverRow priority={3} name="Ethernet" status="standby" metric="—" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Proxy Tab */}
      {activeTab === 'proxy' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                Mihomo (Proxy)
              </h3>
              <div className="space-y-3">
                <InfoRow label="Статус" value="Активен" valueColor="text-green-400" />
                <InfoRow label="Режим" value="TUN (прозрачный)" />
                <InfoRow label="Текущий узел" value="🇳🇱 NL-01 (Amsterdam)" />
                <InfoRow label="Протокол" value="VLESS + Reality" />
                <InfoRow label="Порт" value="7890 (HTTP), 7891 (SOCKS5)" />
                <InfoRow label="TTL" value="Изменён (anti-DPI)" />
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-purple-400" />
                Доступные узлы
              </h3>
              <div className="space-y-2">
                {[
                  { name: '🇳🇱 NL-01', protocol: 'VLESS', ping: '142 мс', active: true },
                  { name: '🇩🇪 DE-02', protocol: 'VLESS', ping: '156 мс', active: false },
                  { name: '🇺🇸 US-01', protocol: 'Trojan', ping: '210 мс', active: false },
                  { name: '🇯🇵 JP-01', protocol: 'VMess', ping: '189 мс', active: false },
                  { name: '🇸🇬 SG-01', protocol: 'SS', ping: '175 мс', active: false },
                ].map((node, i) => (
                  <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg ${node.active ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-900/40 hover:bg-gray-900/60 cursor-pointer'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{node.name}</span>
                      <span className="text-xs text-gray-400">{node.protocol}</span>
                    </div>
                    <span className={`text-xs ${node.active ? 'text-green-400' : 'text-gray-500'}`}>{node.ping}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* DNS Tab */}
      {activeTab === 'dns' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                AdGuard Home
              </h3>
              <div className="space-y-3">
                <InfoRow label="Статус" value="Работает (Docker)" valueColor="text-green-400" />
                <InfoRow label="Адрес" value="172.17.0.3:53" />
                <InfoRow label="Веб-интерфейс" value="http://localhost:3000" />
                <InfoRow label="Запросы сегодня" value="12,847" />
                <InfoRow label="Заблокировано" value="2,341 (18.2%)" />
                <InfoRow label="RAM" value="~150 МБ" />
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <HardDrive className="w-5 h-5 text-orange-400" />
                Списки фильтрации
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'AdGuard DNS filter', rules: '52,400', active: true },
                  { name: 'Peter Lowe\'s Blocklist', rules: '2,800', active: true },
                  { name: 'Anti-Porn', rules: '112,000', active: true },
                  { name: 'RU AdList (антиреклама)', rules: '3,200', active: true },
                  { name: 'Phishing Army', rules: '45,000', active: false },
                ].map((list, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-900/40">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${list.active ? 'bg-green-400' : 'bg-gray-600'}`} />
                      <span className="text-sm text-white">{list.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{list.rules} правил</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Tab */}
      {activeTab === 'status' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard label="Интернет" value="Активен" icon={<Wifi className="w-5 h-5" />} color="text-green-400" />
            <StatusCard label="Прокси" value="TUN активен" icon={<Shield className="w-5 h-5" />} color="text-green-400" />
            <StatusCard label="DNS" value="AdGuard" icon={<Globe className="w-5 h-5" />} color="text-green-400" />
            <StatusCard label="Docker" value="7 контейнеров" icon={<Server className="w-5 h-5" />} color="text-blue-400" />
          </div>

          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white mb-4">Docker контейнеры</h3>
            <div className="space-y-2">
              {[
                { name: 'jellyfin', status: 'running', ram: '400 МБ', uptime: '14д 7ч' },
                { name: 'sonarr', status: 'running', ram: '250 МБ', uptime: '14д 7ч' },
                { name: 'radarr', status: 'running', ram: '250 МБ', uptime: '14д 7ч' },
                { name: 'adguardhome', status: 'running', ram: '150 МБ', uptime: '14д 7ч' },
                { name: 'go2rtc', status: 'running', ram: '50 МБ', uptime: '14д 7ч' },
                { name: 'homeassistant', status: 'running', ram: '500 МБ', uptime: '14д 7ч' },
                { name: 'watchtower', status: 'running', ram: '20 МБ', uptime: '14д 7ч' },
              ].map((container, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-white font-mono">{container.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>RAM: {container.ram}</span>
                    <span>⏱ {container.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function InfoRow({ label, value, valueColor = 'text-white' }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}

function SignalBar({ label, value, max, min, unit, color }: { label: string; value: number; max: number; min: number; unit: string; color: string }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className={color}>{value} {unit}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div className={`h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500`} style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
      </div>
    </div>
  );
}

function FailoverRow({ priority, name, status, metric }: { priority: number; name: string; status: string; metric: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-900/40">
      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">#{priority}</span>
      <span className="text-sm text-white flex-1">{name}</span>
      <span className={`text-xs px-2 py-0.5 rounded ${status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/60 text-gray-400'}`}>
        {status === 'active' ? 'Активно' : 'Ожидание'}
      </span>
      <span className="text-xs text-gray-400">{metric}</span>
    </div>
  );
}

function StatusCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/30 p-4">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
