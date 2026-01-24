
import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink, Sparkles, MessageSquare, Zap, Percent, ScrollText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SalesTab: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const materials = [
    {
      id: 'onboarding-process',
      name: 'Nossa Metodologia (Customer Journey)',
      desc: 'Página pública que explica o passo a passo da Contabilin para novos clientes.',
      icon: <Sparkles className="text-brand-primary" />,
      url: window.location.origin + '?page=onboarding-process'
    },
    {
      id: 'tool-simples',
      name: 'Calculadora Simples Nacional 2026',
      desc: 'Simulador de alíquota efetiva para leads de comércio e serviços.',
      icon: <Percent className="text-brand-accent" />,
      url: window.location.origin + '?page=tool-simples'
    },
    {
      id: 'tool-fatorr',
      name: 'Simulador de Fator R',
      desc: 'Ferramenta para convencer leads a reduzirem de 15,5% para 6%.',
      icon: <Zap className="text-yellow-400" />,
      url: window.location.origin + '?page=tool-fatorr'
    },
    {
        id: 'onboarding-form',
        name: 'Formulário de Diagnóstico Fiscal',
        desc: 'Quiz de 4 perguntas para captação de leads qualificados.',
        icon: <ScrollText className="text-violet-400" />,
        url: window.location.origin + '?page=onboarding'
      }
  ];

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Share2 className="text-brand-primary" /> Vendas & Materiais Públicos
        </h2>
      </div>

      <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
        Use estes links para enviar aos seus leads no WhatsApp ou redes sociais. Eles são projetados para educar e converter o cliente antes mesmo da primeira reunião.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((item) => (
          <div key={item.id} className="bg-[#1e293b]/50 p-6 rounded-[2rem] border border-white/5 space-y-4 group hover:border-brand-primary/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(item.url, '_blank')}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                  title="Abrir página"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-base mb-1">{item.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-4 flex gap-2">
               <div className="flex-1 bg-black/30 border border-white/5 rounded-xl px-4 py-2.5 text-[9px] text-gray-500 font-mono truncate items-center flex">
                  {item.url}
               </div>
               <button 
                onClick={() => handleCopy(item.id, item.url)}
                className={`px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                  copiedId === item.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-brand-primary text-white hover:bg-violet-600'
                }`}
               >
                 {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                 {copiedId === item.id ? 'Copiado' : 'Copiar'}
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-primary/5 border border-brand-primary/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="text-brand-primary" size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
              <h4 className="text-white font-bold mb-1">Dica de Conversão</h4>
              <p className="text-gray-500 text-xs">
                  Sempre envie o link da <strong>Metodologia</strong> após a primeira conversa. Isso reduz o ciclo de vendas em até 40% pois o cliente entende que você possui um processo estruturado.
              </p>
          </div>
      </div>
    </div>
  );
};

export default SalesTab;
