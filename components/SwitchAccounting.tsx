
import React from 'react';
import { SectionId } from '../types';
import { RefreshCw, MessageSquare, FileCheck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SwitchAccountingProps {
  onWhatsAppClick: (message: string) => void;
}

const SwitchAccounting: React.FC<SwitchAccountingProps> = ({ onWhatsAppClick }) => {
  return (
    <section id={SectionId.SWITCH} className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-6">
              <RefreshCw className="w-4 h-4 text-brand-accent" />
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Migração Simplificada</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
              Mudar para a Contabilin é mais fácil que cancelar um streaming.
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Você não precisa se preocupar com a burocracia do passado. Nosso time de especialistas cuida de toda a transição com seu antigo contador para que você foque apenas no seu lucro.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Passo 1: Fale conosco</h4>
                  <p className="text-gray-500 text-sm">Nós analisamos sua situação atual e traçamos o melhor plano de migração gratuito.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
                  <FileCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Passo 2: Assine o contrato</h4>
                  <p className="text-gray-500 text-sm">Tudo digital. Em 5 minutos você autoriza nossa entrada e nós assumimos o comando.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0f172a] rounded-[2.5rem] border border-white/10 p-6 md:p-12 shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8">O que nós fazemos <span className="text-brand-primary">por você</span>:</h3>

                <ul className="space-y-6">
                  {[
                    "Solicitamos a transferência de responsabilidade técnica.",
                    "Auditamos os últimos 12 meses para encontrar créditos fiscais.",
                    "Configuramos seu novo dashboard de saúde financeira.",
                    "Treinamos você para emitir notas em 2 cliques.",
                    "Assumimos a conversa com seu contador anterior."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <CheckCircle2 className="w-6 h-6 text-brand-success shrink-0" />
                      <span className="text-gray-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand-primary" />
                    <div>
                      <p className="text-white font-bold text-sm">Transição Segura</p>
                      <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest">Sem interrupção no seu CNPJ</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onWhatsAppClick("Olá! Vi que trocar de contador é fácil. Gostaria de iniciar minha migração para a Contabilin.")}
                    className="bg-brand-primary hover:bg-violet-600 text-white p-3 rounded-xl transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SwitchAccounting;
