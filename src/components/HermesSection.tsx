import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, MicOff, Brain, Sparkles, MessageSquare, Zap, Lightbulb, Film, Music, HomeIcon, TrendingUp, Volume2, VolumeX, Cpu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  action?: string;
}

const suggestions = [
  { icon: Film, text: 'Что посмотреть вечером?', color: 'text-red-400' },
  { icon: Music, text: 'Включи расслабляющую музыку', color: 'text-green-400' },
  { icon: HomeIcon, text: 'Выключи свет в гостиной', color: 'text-yellow-400' },
  { icon: TrendingUp, text: 'Как работает система?', color: 'text-blue-400' },
];

const capabilities = [
  { name: 'Управление медиа', icon: Film, status: 'active', desc: 'Поиск, рекомендации, воспроизведение' },
  { name: 'Умный дом', icon: HomeIcon, status: 'active', desc: 'Свет, климат, устройства' },
  { name: 'Голосовое управление', icon: Mic, status: 'active', desc: 'Распознавание речи' },
  { name: 'Автоматизации', icon: Zap, status: 'active', desc: 'Создание сценариев' },
  { name: 'Анализ системы', icon: Cpu, status: 'active', desc: 'Мониторинг и оптимизация' },
  { name: 'Рекомендации', icon: Sparkles, status: 'active', desc: 'Персональные советы' },
];

const recentActions = [
  { text: 'Включил свет в гостиной', time: '5 мин назад', icon: Lightbulb },
  { text: 'Поставил фильм "Дюна 2"', time: '1 час назад', icon: Film },
  { text: 'Установил температуру 22°C', time: '2 часа назад', icon: TrendingUp },
  { text: 'Включил плейлист "Вечерний джаз"', time: '3 часа назад', icon: Music },
];

export default function HermesSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'system',
      content: '🤖 Hermes AI активирован. Я ваш персональный ассистент для управления медиа, умным домом и системой. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Имитация ответа AI
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('посмотреть') || q.includes('фильм') || q.includes('сериал')) {
      return '🎬 Рекомендую сегодня вечером:\n\n• **Дюна: Часть вторая** — вы остановились на 65%, отличный момент для продолжения\n• **Shōgun** — новый исторический сериал, рейтинг 9.3\n• **Fallout** — постапокалиптический сериал от Amazon\n\nХотите, чтобы я запустил один из них?';
    }
    
    if (q.includes('музык') || q.includes('послушать')) {
      return '🎵 Включаю расслабляющую музыку с USB ЦАП Reflex 2.0 Pro...\n\nСейчас играет: **Pink Floyd — The Dark Side of the Moon** (FLAC 24/96)\n\nЭто ваш любимый альбом. Могу переключить на джаз или классику, если хотите.';
    }
    
    if (q.includes('свет') || q.includes('выключи') || q.includes('включи')) {
      return '💡 Выполняю команду...\n\n✅ Свет в гостиной выключен\n\nМогу также:\n• Установить яркость на определенный уровень\n• Включить ночник в спальне\n• Активировать сцену "Кино" (приглушенный свет)';
    }
    
    if (q.includes('систем') || q.includes('работает') || q.includes('статус')) {
      return '📊 Статус системы:\n\n• **CPU**: 23% (норма)\n• **RAM**: 3.2/8 ГБ (40%)\n• **Температура**: 52°C (норма)\n• **Docker**: 7 контейнеров активны\n• **Модем**: 4G LTE, 36.2 МБ/с\n• **Прокси**: Mihomo активен (NL-01)\n\nВсё работает стабильно. Апптайм: 14 дней 7 часов.';
    }
    
    if (q.includes('камер') || q.includes('гараж')) {
      return '📹 Статус камер:\n\n• **Гараж — Вход**: Онлайн ✅\n• **Гараж — Внутрь**: Онлайн ✅, обнаружено движение 15 мин назад\n\nПоследняя запись: сегодня в 14:32. Хотите посмотреть live-поток или архив?';
    }
    
    if (q.includes('погод') || q.includes('температур')) {
      return '🌤️ Погода в Москве:\n\n• **Сейчас**: -3°C, переменная облачность\n• **Ощущается**: -7°C\n• **Ветер**: 5 м/с\n• **Влажность**: 65%\n\nВ гостиной: 22.5°C (комфортно). Могу включить обогреватель, если холодно.';
    }
    
    return '🤔 Понял ваш запрос. Я могу помочь с:\n\n• 🎬 Управлением медиа (фильмы, музыка, фото)\n• 🏠 Умным домом (свет, климат, устройства)\n• 📹 Видеонаблюдением (камеры, записи)\n• 🌐 Сетью (модем, прокси, DNS)\n• 📊 Мониторингом системы\n\nУточните, что именно вас интересует?';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Bot className="w-7 h-7 text-cyan-400" />
          Hermes AI
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Brain className="w-3 h-3" />
            Neural Engine v2.0
          </span>
          <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-gray-800/40 rounded-2xl border border-gray-700/30 flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Hermes Assistant</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Активен
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-lg transition-all ${
                isListening ? 'bg-red-500/20 text-red-400' : 'bg-gray-700/60 text-gray-400 hover:text-white'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                        : message.role === 'system'
                        ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-100'
                        : 'bg-gray-700/60 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[10px] opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-700/60 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спросите что-нибудь..."
                className="flex-1 bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Voice Control */}
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Mic className="w-5 h-5 text-purple-400" />
              Голосовое управление
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsListening(!isListening)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  isListening
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30'
                }`}
              >
                {isListening ? (
                  <span className="flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Слушаю...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Mic className="w-4 h-4" />
                    Начать слушать
                  </span>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Скажите "Привет, Hermes" для активации
              </p>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Быстрые команды
            </h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(suggestion.text);
                    setTimeout(handleSend, 100);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-gray-900/40 hover:bg-gray-900/60 transition-colors text-left"
                >
                  <suggestion.icon className={`w-4 h-4 ${suggestion.color}`} />
                  <span className="text-xs text-gray-300">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              Последние действия
            </h3>
            <div className="space-y-2">
              {recentActions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/40">
                  <action.icon className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-white">{action.text}</p>
                    <p className="text-[10px] text-gray-500">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/30 p-5">
        <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-cyan-400" />
          Возможности Hermes AI
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/20 hover:border-cyan-500/30 transition-all"
            >
              <cap.icon className="w-6 h-6 text-cyan-400 mb-2" />
              <h4 className="text-sm font-medium text-white">{cap.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{cap.desc}</p>
              <span className="text-[10px] text-green-400 mt-2 inline-block">✓ {cap.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
