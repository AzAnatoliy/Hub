import { Home, Film, Music, Gamepad2, Camera, HomeIcon, Wifi, Settings } from 'lucide-react';
import type { Section } from '../App';

interface SidebarProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const menuItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Главная', icon: <Home className="w-5 h-5" /> },
  { id: 'video', label: 'Видео', icon: <Film className="w-5 h-5" /> },
  { id: 'music', label: 'Музыка', icon: <Music className="w-5 h-5" /> },
  { id: 'games', label: 'Игры', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'cameras', label: 'Камеры', icon: <Camera className="w-5 h-5" /> },
  { id: 'smarthome', label: 'Умный дом', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'network', label: 'Сеть', icon: <Wifi className="w-5 h-5" /> },
  { id: 'settings', label: 'Настройки', icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar({ currentSection, onNavigate }: SidebarProps) {
  return (
    <nav className="w-20 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/30 flex flex-col items-center py-4 gap-2">
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            currentSection === item.id
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
          }`}
        >
          {item.icon}
          <span className="text-[9px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
