
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  onClick: () => void;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end pointer-events-none">
      <div className="bg-white text-brand-dark px-4 py-2 rounded-l-full shadow-lg mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 hidden md:block font-medium text-sm">
        Falar com Contador
      </div>
      <button 
        onClick={onClick}
        className="pointer-events-auto group relative w-14 h-14 flex items-center justify-center outline-none"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 hover:scale-110 transition-transform duration-300 z-10">
           <MessageCircle className="w-8 h-8 text-white fill-white" />
        </div>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
