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
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';

export type Section = 'dashboard' | 'video' | 'music' | 'photo' | 'games' | 'cameras' | 'smarthome' | 'network' | 'monitor' | 'settings';

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
      case 'settings': return <SettingsSection darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10">
          <TopBar />
          <div className="flex h-[calc(100vh-64px)]">
            <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} />
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
