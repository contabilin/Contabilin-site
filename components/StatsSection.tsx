
import React from 'react';
import { Users, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Clientes Ativos', value: '100+', icon: <Users className="w-5 h-5" /> },
  { label: 'Imposto Economizado', value: 'R$ 4.2M', icon: <TrendingDown className="w-5 h-5" /> },
  { label: 'Suporte em até', value: '15 min', icon: <Clock className="w-5 h-5" /> },
  { label: 'Segurança Fiscal', value: '100%', icon: <ShieldCheck className="w-5 h-5" /> },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#020617] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group p-2">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter break-words">{stat.value}</p>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
