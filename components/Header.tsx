
import React, { useState, startTransition } from 'react';
import { Menu, X, Lightbulb, Brain, MessageCircle, ClipboardCheck, Lock } from 'lucide-react';
import { SectionId, Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, sectionId?: SectionId) => void;
  logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: Page, sectionId?: SectionId) => {
    onNavigate(page, sectionId);
    startTransition(() => {
      setIsOpen(false);
    });
  };

  return (
    <header className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-dark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav('home', SectionId.HERO)}>
            {logoUrl ? (
              <img src={logoUrl} alt="Contabilin Logo" className="h-10 w-auto object-contain" />
            ) : (
              <>
                <div className="relative mr-2 md:mr-3">
                  <div className="absolute inset-0 bg-brand-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary to-brand-accent p-2 rounded-xl border border-white/10 shadow-lg shadow-brand-primary/20">
                    <div className="relative w-6 h-6">
                      <Lightbulb className="w-6 h-6 text-white absolute top-0 left-0 z-10" />
                      <Brain className="w-4 h-4 text-white/90 absolute bottom-0 right-0 z-20 translate-x-1 translate-y-1" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">Contabilin</span>
                  <span className="text-[8px] md:text-[10px] font-medium text-brand-primary tracking-widest uppercase">Contabilidade Inteligente</span>
                </div>
              </>
            )}
          </div>

          {/* Nav Principal */}
          <nav className="hidden lg:flex space-x-8 items-center">
            <button onClick={() => handleNav('home', SectionId.SIMULATOR)} className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Economia</button>
            <button onClick={() => handleNav('home', SectionId.PRICING)} className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Planos</button>
            <button onClick={() => handleNav('home', SectionId.TOOLS)} className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Ferramentas</button>
            <button onClick={() => handleNav('blog')} className={`text-sm font-bold transition-colors ${currentPage === 'blog' ? 'text-brand-primary' : 'text-gray-300 hover:text-white'}`}>Blog</button>

            <button
              onClick={() => handleNav('onboarding')}
              className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white/10 hover:border-brand-primary/30 transition-all text-sm flex items-center gap-2 group/diag"
            >
              <ClipboardCheck className="w-4 h-4 text-brand-primary group-hover/diag:animate-bounce" /> Fazer Diagnóstico
            </button>

            <button
              onClick={() => window.open('https://wa.me/5547989165863?text=Olá! Quero falar com um contador.', '_blank')}
              className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-black hover:shadow-lg transition-all transform hover:scale-105 text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-[#020617] border-b border-white/10 absolute w-full backdrop-blur-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => handleNav('home', SectionId.SIMULATOR)} className="block w-full text-left px-4 py-4 text-gray-300 font-bold border-b border-white/5">Calculadora de Economia</button>
            <button onClick={() => handleNav('home', SectionId.PRICING)} className="block w-full text-left px-4 py-4 text-gray-300 font-bold border-b border-white/5">Planos</button>
            <button onClick={() => handleNav('home', SectionId.TOOLS)} className="block w-full text-left px-4 py-4 text-gray-300 font-bold border-b border-white/5 flex items-center gap-2">
              Ferramentas
            </button>
            <button onClick={() => handleNav('blog')} className="block w-full text-left px-4 py-4 text-gray-300 font-bold border-b border-white/5">Blog</button>
            <button onClick={() => handleNav('onboarding')} className="block w-full text-left px-4 py-4 text-brand-primary font-black border-b border-white/5 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" /> Iniciar Diagnóstico Fiscal
            </button>

            <button
              onClick={() => window.open('https://wa.me/5547989165863?text=Olá! Quero falar com um contador.', '_blank')}
              className="block w-full text-center mt-6 bg-[#25D366] text-white px-4 py-4 rounded-xl font-black text-lg"
            >
              Chamar no WhatsApp
            </button>

            {/* Acesso Admin Mobile */}
            <button
              onClick={() => handleNav('login')}
              className="flex items-center justify-center gap-2 w-full py-4 text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors mt-4 border border-white/10 rounded-xl bg-white/5"
            >
              <Lock className="w-3 h-3" /> Área Restrita Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
