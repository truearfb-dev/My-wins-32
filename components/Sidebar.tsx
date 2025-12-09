import React from 'react';
import { X, Trash2, Calendar } from 'lucide-react';
import { Victory } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  victories: Victory[];
  onDelete: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, victories, onDelete }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-[#0f0f0f] border-r border-white/10 z-50 transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-white">
            История Побед
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
          {victories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Calendar size={48} className="mb-4 opacity-20" />
              <p>История пуста...</p>
              <p className="text-sm">Время совершить подвиг!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {victories.map((victory) => (
                <div 
                  key={victory.id} 
                  className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-primary/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-cyber-primary/80 px-2 py-1 rounded bg-cyber-primary/10">
                      {victory.date}
                    </span>
                    <button 
                      onClick={() => onDelete(victory.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-200 font-medium leading-snug">
                    {victory.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
