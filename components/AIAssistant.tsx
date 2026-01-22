
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { getGeminiRecommendation } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your SabMilta Assistant. Ask me for recommendations or help finding gifts!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGeminiRecommendation(input);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response || "I'm sorry, I couldn't find an answer for that.", sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', text: "I encountered an error. Please check your API key.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-full max-w-[90vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#2874f0] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Sparkles size={18} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm">SabMilta AI Assistant</h3>
                <span className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Always online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${m.sender === 'user' ? 'bg-[#2874f0] text-white' : 'bg-white text-blue-500'}`}>
                    {m.sender === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-[#2874f0] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
                    {m.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="flex gap-2 max-w-[85%] items-center text-gray-400 italic text-xs">
                    <Loader2 size={16} className="animate-spin" /> Assistant is thinking...
                 </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me for gift ideas..."
                className="w-full bg-gray-100 pl-4 pr-12 py-3 rounded-xl outline-none focus:ring-2 ring-blue-500/20 text-sm transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 top-1.5 p-1.5 bg-[#2874f0] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-[#2874f0] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-blue-500/30 active:scale-95 transition-all"
      >
        {!isOpen && (
          <span className="font-bold text-sm tracking-wide">Ask AI Assistant</span>
        )}
        <Bot size={28} className={`${isOpen ? 'rotate-180' : ''} transition-transform duration-500`} />
        {isOpen ? <X size={20} className="absolute inset-0 m-auto" /> : null}
        
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};
