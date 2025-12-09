import React from 'react';

const Confetti: React.FC = () => {
  // Generate random positions and colors for confetti pieces
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 0.5 + Math.random() * 1.5,
    animationDelay: Math.random() * 0.5,
    color: ['#00f0ff', '#7000df', '#ff003c', '#ffffff', '#ffd700'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-sm opacity-0 animate-confetti"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            backgroundColor: p.color,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
            animationFillMode: 'forwards'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
