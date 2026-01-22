
import React from 'react';

const platforms = [
  "Hotmart", "Kiwify", "Eduzz", "Monetizze", "Ticto", "Kirvano", "Herospark", "Greenn", "Cora", "Asaas", "Stripe"
];

const Integrations: React.FC = () => {
  return (
    <div className="py-12 bg-[#020617] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] text-gray-600 mb-8 font-black uppercase tracking-[0.3em]">
           Especialistas nas Maiores Plataformas
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="py-4 animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {platforms.map((platform, index) => (
              <span key={index} className="text-2xl md:text-3xl font-black text-white tracking-tighter cursor-default">
                {platform}
              </span>
            ))}
            {/* Repetir para loop infinito */}
            {platforms.map((platform, index) => (
              <span key={`dup-${index}`} className="text-2xl md:text-3xl font-black text-white tracking-tighter cursor-default">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Integrations;
