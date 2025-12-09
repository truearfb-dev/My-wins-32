"use client"
import React, { useState, useEffect } from 'react';
import { Menu, Plus, Zap } from 'lucide-react';
import { Victory } from './types';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';

function App() {
  const [victories, setVictories] = useState<Victory[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentVictory, setCurrentVictory] = useState<Victory | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration fix / Initial Load
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('my-victories');
    if (stored) {
      try {
        setVictories(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse victories", e);
      }
    }
  }, []);

  // Persistence
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('my-victories', JSON.stringify(victories));
    }
  }, [victories, isMounted]);

  const handleAddVictory = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newVictory: Victory = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      date: dateStr,
      timestamp: Date.now(),
    };

    // Add to start of list
    setVictories(prev => [newVictory, ...prev]);
    setCurrentVictory(newVictory);
    setInputValue('');
  };

  const handleDeleteVictory = (id: string) => {
    setVictories(prev => prev.filter(v => v.id !== id));
  };

  // Prevent flash during hydration
  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white bg-cyber-black selection:bg-cyber-primary selection:text-black">
      
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-secondary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyber-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyber-accent/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid Overlay for texture */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Navbar / Header */}
      <header className="fixed top-0 left-0 right-0 z-30 p-4 md:p-6 flex justify-between items-center">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyber-primary/50 transition-all text-white group"
        >
          <Menu className="group-hover:text-cyber-primary transition-colors" />
        </button>
        <div className="flex items-center gap-2">
            <Zap className="text-cyber-primary fill-cyber-primary" size={20} />
            <h1 className="text-xl font-bold tracking-widest uppercase">My Victories</h1>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-2xl mx-auto w-full">
        
        <div className="w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-lg">
               ЗАФИКСИРУЙ<br />СВОЙ УСПЕХ
             </h2>
             <p className="text-gray-400 text-lg font-light">
               Маленькие шаги ведут к большим целям.
             </p>
          </div>

          <form onSubmit={handleAddVictory} className="w-full space-y-6">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-secondary via-cyber-primary to-cyber-accent rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Какая победа сегодня?"
                className="relative w-full p-6 bg-cyber-dark/90 text-xl md:text-2xl text-white placeholder-gray-500 rounded-2xl border border-white/10 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all shadow-2xl"
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`
                group relative w-full py-5 rounded-2xl font-bold text-xl uppercase tracking-wider overflow-hidden transition-all duration-300
                ${!inputValue.trim() 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'}
              `}
            >
               <span className="relative z-10 flex items-center justify-center gap-3">
                 Зафиксировать победу <Plus strokeWidth={3} />
               </span>
               {inputValue.trim() && (
                 <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary via-white to-cyber-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
               )}
            </button>
          </form>

          {/* Quick Stats or Last Victory */}
          {victories.length > 0 && (
            <div className="mt-12 text-center animate-slide-in">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Всего побед</p>
              <div className="text-5xl font-mono text-cyber-primary font-bold shadow-cyber-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                {victories.length}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Components */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        victories={victories}
        onDelete={handleDeleteVictory}
      />
      
      <Modal 
        victory={currentVictory} 
        onClose={() => setCurrentVictory(null)} 
      />

    </div>
  );
}

export default App;
