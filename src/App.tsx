import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import VideoSection from './components/VideoSection';
import MusicSection from './components/MusicSection';
import PhotoSection from './components/PhotoSection';
import GamesSection from './components/GamesSection';
import CamerasSection from './components/CamerasSection';
import SmartHomeSection from './components/SmartHomeSection';
import NetworkSection from './components/NetworkSection';
import SettingsSection from './components/SettingsSection';
import MonitorSection from './components/MonitorSection';
import HermesSection from './components/HermesSection';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';

export type Section = 'dashboard' | 'video' | 'music' | 'photo' | 'games' | 'cameras' | 'smarthome' | 'network' | 'monitor' | 'hermes' | 'settings';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentSection} />;
      case 'video': return <VideoSection />;
      case 'music': return <MusicSection />;
      case 'photo': return <PhotoSection />;
      case 'games': return <GamesSection />;
      case 'cameras': return <CamerasSection />;
      case 'smarthome': return <SmartHomeSection />;
      case 'network': return <NetworkSection />;
      case 'monitor': return <MonitorSection />;
      case 'hermes': return <HermesSection />;
      case 'settings': return <SettingsSection darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className={`min-h-screen ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900'
      } overflow-hidden relative`}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'} rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${darkMode ? 'bg-purple-500/5' : 'bg-purple-500/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10">
          <TopBar darkMode={darkMode} />
          <div className="flex h-[calc(100vh-64px)]">
            <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} darkMode={darkMode} />
            <main className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
