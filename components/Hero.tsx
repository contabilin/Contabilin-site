
import React, { useEffect } from 'react';
import { SectionId } from '../types';
import { MessageCircle, ArrowRight, ShieldCheck, Zap, Star, Wand2 } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  onWhatsAppClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, onWhatsAppClick }) => {
  return (
    <section id={SectionId.HERO} className="relative pt-24 pb-16 lg:pt-48 lg:pb-36 overflow-hidden">
      {/* Background Decorativo Ultra-Premium */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Badge de Autoridade Refinado */}
          <div className="flex flex-col items-center mb-8 md:mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2.5 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group hover:border-brand-primary/30 transition-colors cursor-default mb-4">
              <div className="relative">
                < Zap className="w-3.5 h-3.5 text-brand-primary fill-brand-primary animate-pulse" />
                <div className="absolute inset-0 bg-brand-primary blur-md opacity-50"></div>
              </div>
              <span className="text-[8px] md:text-[10px] font-black text-gray-300 uppercase tracking-[0.15em] md:tracking-[0.35em]">
                <span className="text-brand-primary">Contabilin</span> 360º Expert Digital
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contabilidade 5 Estrelas</span>
            </div>
          </div>

          {/* Headline Ultra-Impactante Atualizada */}
          {/* Headline Ultra-Impactante Atualizada */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-8 text-white leading-tight md:leading-[1.1] max-w-full animate-fade-in-up delay-100 break-words px-2">
            Escale sua empresa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-violet-400 to-brand-accent block md:inline mt-2 md:mt-0">Blindamos seu Lucro.</span>
          </h1>

          {/* Subheadline estratégica */}
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium animate-fade-in-up delay-200 px-4">
            Muito além da contabilidade: somos o seu braço direito estratégico para <span className="text-white font-bold">MEIs, Negócios digitais e prestadores de serviço.</span>
          </p>

          {/* Chamadas para Ação (CTAs) */}
          <div className="flex flex-col items-center gap-6 md:gap-10 animate-fade-in-up delay-300 w-full px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-full px-4 sm:px-0">
              <button
                onClick={onWhatsAppClick}
                className="w-full sm:w-auto px-6 py-4 md:px-12 md:py-6 bg-gradient-to-br from-[#128C7E] to-[#25D366] hover:scale-[1.02] active:scale-[0.98] text-white rounded-xl md:rounded-[2rem] font-black text-base md:text-xl transition-all shadow-[0_20px_50px_-15px_rgba(37,211,102,0.5)] flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <MessageCircle className="w-5 h-5 md:w-7 md:h-7 fill-white group-hover:rotate-12 transition-transform" />
                <span>Falar com Especialista</span>
              </button>

              <button
                onClick={() => scrollToSection(SectionId.SIMULATOR)}
                className="w-full sm:w-auto px-6 py-4 md:px-12 md:py-6 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-[2rem] font-bold text-base md:text-xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 group backdrop-blur-md"
              >
                Simular Economia <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* NOVO BADGE: Ecossistema Fiscal (Posicionamento de Plataforma) */}
            <div className="relative group/badge max-w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary/50 to-brand-accent/50 rounded-full blur opacity-20 group-hover/badge:opacity-40 transition-opacity"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-2 md:gap-6 bg-brand-dark/40 backdrop-blur-xl px-4 md:px-8 py-3 md:py-4 rounded-3xl md:rounded-full border border-white/10 shadow-2xl w-full md:w-auto">
                <div className="flex items-center gap-2 border-b border-white/10 md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-6 w-full md:w-auto justify-center md:justify-start">
                  <Wand2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Ecossistema <span className="text-white">Fiscal</span>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 w-full md:w-auto text-center">
                  <ShieldCheck className="w-5 h-5 text-brand-success shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-gray-200">
                    Estratégias para <span className="text-brand-primary font-black text-base md:text-lg">baixar imposto</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
