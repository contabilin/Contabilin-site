import React, { useEffect } from 'react';
import { 
  CheckCircle2, ShieldCheck, Sparkles,
  Activity, ChevronDown, ArrowRight,
  ArrowUpRight, Mail, MessageCircle
} from 'lucide-react';

interface OnboardingProcessPageProps {
  onBack: () => void;
  onWhatsAppClick: () => void;
}

const OnboardingProcessPage: React.FC<OnboardingProcessPageProps> = ({ onBack, onWhatsAppClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const steps = [
    { id: 'acordo', title: 'O Acordo', desc: 'Sincronia.' },
    { id: 'separacao', title: 'Separação', desc: 'Regra PF x PJ.' },
    { id: 'lucros', title: 'Lucros', desc: 'Regra dos 50k.' },
    { id: 'rotina', title: 'Rotina', desc: 'Notas e Prazos.' },
    { id: 'ferramentas', title: 'Ferramentas', desc: 'Portal e Drive.' }
  ];

  return (
    <div className="bg-[#01040a] min-h-screen text-slate-300 font-sans selection:bg-brand-primary/30 pb-20">
      
      {/* 01. HERO - Proporções Refinadas */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          
          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up relative group">
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/40 rotate-12 group-hover:rotate-0 transition-transform">
              <ArrowUpRight size={14} className="text-white" />
            </div>
            <Sparkles size={14} className="text-brand-primary" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Sua Empresa no Próximo Nível</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 animate-fade-in-up delay-100 leading-[1.1]">
            Seja bem-vindo(a) à<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Contabilidade Inteligente.</span>
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed animate-fade-in-up delay-200">
            Simplificamos a burocracia para que você foque no que realmente importa: escalar seu negócio digital com segurança fiscal.
          </p>

          <button 
            onClick={() => scrollToId('roadmap')}
            className="bg-brand-primary hover:bg-violet-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 animate-fade-in-up delay-300"
          >
            Iniciar Onboarding <ArrowRight size={18} />
          </button>
          
          <div className="mt-16 animate-bounce text-gray-800 flex justify-center cursor-pointer" onClick={() => scrollToId('roadmap')}>
            <ChevronDown size={32} />
          </div>
        </div>
      </section>

      {/* 02. ROADMAP NAV */}
      <section id="roadmap" className="py-16 bg-[#020617]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
            <div>
               <p className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">Roadmap</p>
               <h2 className="text-3xl font-black text-white tracking-tight">O que vamos ver hoje?</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <button 
                key={i}
                onClick={() => scrollToId(step.id)}
                className="group relative bg-[#0f172a] border border-white/5 p-6 rounded-3xl text-left hover:border-brand-primary/40 transition-all hover:bg-brand-primary/5 flex flex-col h-full"
              >
                <span className="block text-2xl font-black text-white/5 group-hover:text-brand-primary/10 mb-2 transition-colors">0{i+1}</span>
                <h3 className="text-white font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-[10px] leading-relaxed group-hover:text-gray-400">{step.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO ACORDO (Resumida para brevidade) */}
      <section id="acordo" className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">Mão Dupla</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">Parceria é sincronia. Nós cuidamos do fiscal, você cuida da operação.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-brand-primary/20">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-brand-primary" /> Nossa Parte</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" /> Cálculo de impostos preciso.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" /> CNPJ 100% regular.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" /> Obrigações sempre no prazo.</li>
              </ul>
            </div>
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Activity className="text-brand-accent" /> Sua Parte</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" /> Envio de extratos e notas.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" /> Separação de contas PF e PJ.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" /> Comunicar contratações/alterações.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO EQUIPE - EXATAMENTE COMO A IMAGEM DE REFERÊNCIA */}
      <section className="py-24 bg-[#01040a] border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white tracking-tighter mb-4 leading-tight">Estamos aqui por você</h2>
                <p className="text-gray-400 text-base font-medium">Conheça quem cuida da saúde da sua empresa</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
               {[
                 { name: 'Gisele', role: 'Contadora', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' },
                 { name: 'Iago', role: 'Contador', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400' }
               ].map((m, i) => (
                 <div key={i} className="bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all hover:border-brand-primary/20 group text-center shadow-2xl">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-8 border-4 border-[#1e293b] shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                       <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">{m.name}</h3>
                    <p className="text-[#6366f1] font-black text-sm uppercase tracking-widest">{m.role}</p>
                 </div>
               ))}
            </div>

            <div className="bg-[#0b0f1a] border border-white/5 p-12 rounded-[2.5rem] max-w-4xl mx-auto shadow-2xl relative overflow-hidden text-center">
               <h4 className="text-white font-black text-sm uppercase tracking-widest mb-12">Canais de Atendimento</h4>
               
               <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <div className="w-full md:w-auto bg-[#020617] border border-white/10 p-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-white/5 group px-10">
                     <Mail size={20} className="text-gray-400 group-hover:text-white" />
                     <span className="text-sm font-bold text-gray-300">contabilin@contabilin.com.br</span>
                  </div>
                  
                  <button 
                    onClick={onWhatsAppClick} 
                    className="w-full md:w-auto bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] p-5 rounded-2xl flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-[1.02] px-12 shadow-lg"
                  >
                     <MessageCircle size={22} className="text-white" />
                     <span className="text-sm font-black text-white tracking-widest">(47) 98916-5863</span>
                  </button>
               </div>
               
               <p className="mt-12 text-[11px] text-gray-500 font-medium leading-relaxed">
                Envie comprovantes, tire dúvidas e registre solicitações pelo nosso WhatsApp ou E-mail.
               </p>
               <div className="mt-8 pt-8 border-t border-white/5 opacity-40">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Contabilin Inteligência Fiscal &copy; 2026</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default OnboardingProcessPage;