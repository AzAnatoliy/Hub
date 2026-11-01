import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Heart, Repeat, Shuffle, Disc3 } from 'lucide-react';
import { useState } from 'react';

const albums = [
  { title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973, tracks: 10, format: 'FLAC 24/96' },
  { title: 'Kind of Blue', artist: 'Miles Davis', year: 1959, tracks: 5, format: 'FLAC 24/192' },
  { title: 'Abbey Road', artist: 'The Beatles', year: 1969, tracks: 17, format: 'FLAC 16/44.1' },
  { title: 'A Love Supreme', artist: 'John Coltrane', year: 1965, tracks: 4, format: 'DSD64' },
  { title: 'Rumours', artist: 'Fleetwood Mac', year: 1977, tracks: 11, format: 'FLAC 24/96' },
  { title: 'OK Computer', artist: 'Radiohead', year: 1997, tracks: 12, format: 'FLAC 16/44.1' },
];

const currentTrack = {
  title: 'Time',
  artist: 'Pink Floyd',
  album: 'The Dark Side of the Moon',
  duration: '6:53',
  currentTime: '2:34',
  format: 'FLAC 24bit/96kHz',
  bitrate: '4608 kbps',
};

const playlist = [
  { title: 'Speak to Me', artist: 'Pink Floyd', duration: '1:30', playing: false },
  { title: 'Breathe', artist: 'Pink Floyd', duration: '2:43', playing: false },
  { title: 'On the Run', artist: 'Pink Floyd', duration: '3:36', playing: false },
  { title: 'Time', artist: 'Pink Floyd', duration: '6:53', playing: true },
  { title: 'The Great Gig in the Sky', artist: 'Pink Floyd', duration: '4:36', playing: false },
  { title: 'Money', artist: 'Pink Floyd', duration: '6:22', playing: false },
  { title: 'Us and Them', artist: 'Pink Floyd', duration: '7:49', playing: false },
  { title: 'Any Colour You Like', artist: 'Pink Floyd', duration: '3:26', playing: false },
  { title: 'Brain Damage', artist: 'Pink Floyd', duration: '3:50', playing: false },
  { title: 'Eclipse', artist: 'Pink Floyd', duration: '2:03', playing: false },
];

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Music className="w-7 h-7 text-green-400" />
          Музыка
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Disc3 className="w-3 h-3" />
            Reflex 2.0 Pro • ALSA Exclusive
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Now Playing */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6">
          <div className="flex items-start gap-6">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-40 h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-gray-600 shadow-2xl"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
              </div>
            </motion.div>
            <div className="flex-1">
              <p className="text-xs text-green-400 font-medium mb-1">Сейчас играет</p>
              <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
              <p className="text-gray-400">{currentTrack.artist}</p>
              <p className="text-sm text-gray-500">{currentTrack.album}</p>
              
              {/* Audio Info */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">{currentTrack.format}</span>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">{currentTrack.bitrate}</span>
                <span className="text-xs text-green-400">✓ Bit-perfect</span>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-1.5 cursor-pointer">
                  <div className="h-1.5 rounded-full bg-green-500" style={{ width: '37%' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{currentTrack.currentTime}</span>
                  <span className="text-xs text-gray-500">{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Repeat className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Volume & Output */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5 space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-400" />
            Вывод звука
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-900/60 rounded-xl p-3 border border-green-500/30">
              <p className="text-sm font-medium text-green-400">USB ЦАП Reflex 2.0 Pro</p>
              <p className="text-xs text-gray-400 mt-1">ALSA Exclusive Mode</p>
              <p className="text-xs text-gray-500">24bit / 96kHz • HW:1,0</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Громкость</label>
              <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-green-500" />
              <p className="text-xs text-gray-500 text-center">75%</p>
            </div>
          </div>
          <div className="border-t border-gray-700/30 pt-3 space-y-2">
            <p className="text-xs text-gray-400">Стриминг с телефона:</p>
            <div className="flex gap-2">
              <span className="text-xs bg-gray-700/60 text-gray-300 px-2 py-1 rounded">Spotify Connect</span>
              <span className="text-xs bg-gray-700/60 text-gray-300 px-2 py-1 rounded">AirPlay</span>
              <span className="text-xs bg-gray-700/60 text-gray-300 px-2 py-1 rounded">DLNA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Плейлист — The Dark Side of the Moon</h3>
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-lg transition-colors ${liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="space-y-1">
          {playlist.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-4 p-2.5 rounded-lg cursor-pointer transition-all ${
                track.playing ? 'bg-green-500/10 border border-green-500/20' : 'hover:bg-gray-700/30'
              }`}
            >
              <span className={`text-sm w-6 text-center ${track.playing ? 'text-green-400' : 'text-gray-500'}`}>
                {track.playing ? '♫' : i + 1}
              </span>
              <div className="flex-1">
                <p className={`text-sm ${track.playing ? 'text-green-400 font-medium' : 'text-white'}`}>{track.title}</p>
                <p className="text-xs text-gray-500">{track.artist}</p>
              </div>
              <span className="text-xs text-gray-500">{track.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Library */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Music className="w-5 h-5 text-green-400" />
          Библиотека
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {albums.map((album, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-2 flex items-center justify-center border border-gray-700/30 group-hover:border-green-500/30 transition-all">
                <Disc3 className="w-10 h-10 text-gray-600" />
              </div>
              <h4 className="text-sm font-medium text-white truncate">{album.title}</h4>
              <p className="text-xs text-gray-400">{album.artist}</p>
              <p className="text-xs text-green-400/60">{album.format}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
