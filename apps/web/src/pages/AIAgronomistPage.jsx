import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';

const AI_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:5001';

export default function AIAgronomistPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Namaste! I'm your AI Agronomist. How can I assist you with your crops today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post(`${AI_URL}/agronomist/chat`, {
        query: userMessage,
        context: { soilMoisture: 'Low', location: 'Maharashtra' } // Mock context
      });
      setMessages(prev => [...prev, { role: 'ai', content: res.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I am facing network issues connecting to the brain." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto space-y-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
          <Sparkles className="text-nature-400 w-8 h-8" />
          <span>AI Agronomist</span>
        </h1>
        <p className="text-slate-400 mt-2">Powered by Gemini & LangChain vector insights.</p>
      </header>

      <div className="flex-1 glass-dark rounded-2xl p-6 flex flex-col overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-4 space-x-reverse`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-600 ml-4' : 'bg-gradient-to-br from-nature-400 to-nature-600 mr-4 shadow-lg shadow-nature-500/30'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/20 text-blue-50 border border-blue-500/30 rounded-tr-sm' 
                    : 'glass text-slate-200 border-white/10 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="glass text-slate-200 p-4 rounded-2xl rounded-tl-sm flex space-x-2 border-white/10">
                  <div className="w-2 h-2 bg-nature-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-nature-400 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-nature-400 rounded-full animate-bounce delay-150" />
               </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSend} className="mt-6 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crop diseases, weather impact, or fertilization..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-white placeholder-slate-500 focus:outline-none focus:border-nature-500/50 focus:ring-1 focus:ring-nature-500/50 transition-all font-medium"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-nature-500 hover:bg-nature-400 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
