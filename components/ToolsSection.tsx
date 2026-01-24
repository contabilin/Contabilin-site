
import React from 'react';
import { SectionId, Page } from '../types';
import { 
  Percent, 
  Zap, 
  ArrowUpRight, 
  Sparkles,
  Map
} from 'lucide-react';

interface ToolsSectionProps {
  onNavigate: (page: Page) => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onNavigate }) => {
  const tools = [
    { 
      id: 'tool-simples', 
      label: 'Simples Nacional 2026', 
      desc: 'Simulador de Alíquota Efetiva', 
      icon: <Percent />,
      color: 'from-brand-primary to-violet-600'
    },
    { 
      id: 'tool-fatorr', 
      label: 'Simulador Fator R', 
      desc: 'Anexo III (6%) vs Anexo V (15.5%)', 
      icon: <Zap />,
      color: 'from-brand-accent to-blue-600'
    },
    { 
      id: 'onboarding-process', 
      label: 'Jornada Contabilin 360º', 
      desc: 'Nossa Metodologia Passo a Passo', 
      icon: <Map />,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section id={SectionId.TOOLS} className="py-24 bg-[#01040a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Suas Ferramentas de Gestão</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Inteligência <span className="text-brand-primary">Fiscal de Elite</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Acesse nossas ferramentas especializadas para blindar seu lucro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id as Page)}
              className="group relative p-1 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-brand-primary/30 transition-all hover:scale-[1.02] flex flex-col text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-[2.4rem] pointer-events-none"></div>
              
              <div className="p-8 md:p-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-8 shadow-xl`}>
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  {tool.label}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-8">
                  {tool.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest">
                  Abrir Ferramenta <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
