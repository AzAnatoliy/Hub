import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import VideoSection from './components/VideoSection';
import MusicSection from './components/MusicSection';
import GamesSection from './components/GamesSection';
import CamerasSection from './components/CamerasSection';
import SmartHomeSection from './components/SmartHomeSection';
import NetworkSection from './components/NetworkSection';
import SettingsSection from './components/SettingsSection';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';

export type Section = 'dashboard' | 'video' | 'music' | 'games' | 'cameras' | 'smarthome' | 'network' | 'settings';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentSection} />;
      case 'video': return <VideoSection />;
      case 'music': return <MusicSection />;
      case 'games': return <GamesSection />;
      case 'cameras': return <CamerasSection />;
      case 'smarthome': return <SmartHomeSection />;
      case 'network': return <NetworkSection />;
      case 'settings': return <SettingsSection darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
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
  );
}

export default App;
