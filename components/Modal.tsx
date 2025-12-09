import React, { useEffect, useState } from 'react';
import { X, Share2, Trophy } from 'lucide-react';
import { Victory, Quote } from '../types';
import { QUOTES } from '../constants';
import Confetti from './Confetti';

interface ModalProps {
  victory: Victory | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ victory, onClose }) => {
  const [quote, setQuote] = useState<Quote>(QUOTES[0]);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (victory) {
      // Pick random quote
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setQuote(randomQuote);

      // Generate a "stable" random image based on victory ID to avoid flickering during renders,
      // but strictly speaking, we just want a fresh motivational image.
      // Using picsum with a timestamp query to ensure no caching between different victories.
      setImageUrl(`https://picsum.photos/800/600?grayscale&blur=2&random=${Date.now()}`);
    }
  }, [victory]);

  if (!victory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Confetti Animation */}
      <Confetti />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-cyber-dark/80 border border-white/10 rounded-2xl shadow-2xl shadow-cyber-primary/20 overflow-hidden transform transition-all scale-100 animate-fade-in flex flex-col">
        
        {/* Header Image Area */}
        <div className="relative h-48 sm:h-64 w-full bg-gray-800 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent z-10" />
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Victory" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          
          <div className="absolute top-4 right-4 z-20">
            <button 
              onClick={onClose}
              className="p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 z-20">
             <div className="flex items-center gap-2 text-cyber-primary mb-1">
                <Trophy size={18} />
                <span className="text-sm font-bold tracking-wider uppercase">Победа зафиксирована</span>
             </div>
             <h2 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">
               {victory.date}
             </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-lg text-gray-400 font-medium">Вы достигли:</h3>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              "{victory.text}"
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative">
            <p className="text-gray-300 italic text-center font-light">
              "{quote.text}"
            </p>
            {quote.author && (
              <p className="text-right text-xs text-gray-500 mt-2 uppercase tracking-widest">
                — {quote.author}
              </p>
            )}
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-cyber-primary to-blue-600 hover:from-white hover:to-white hover:text-black text-black font-extrabold text-lg uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
          >
            Продолжить путь
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
