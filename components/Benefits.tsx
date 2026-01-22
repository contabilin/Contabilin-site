
import React from 'react';
import { Shield, TrendingUp, MessageCircle, Zap } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section className="relative py-12 md:py-20 bg-[#020617] overflow-hidden">
      {/* Linhas de gradiente para suavizar a transição entre seções */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Proteção Total */}
          <div className="relative group p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-[2rem]"></div>
            
            <div className="relative flex items-start gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                  <Shield className="w-7 h-7 md:w-8 md:h-8 text-brand-primary" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-white text-lg md:text-xl font-black mb-2 tracking-tight">Proteção Total</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Seguro de Responsabilidade Civil incluso. <span className="text-brand-primary/80 font-bold">Blindagem jurídica real.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Redução Fiscal */}
          <div className="relative group p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-[2rem]"></div>
            
            <div className="relative flex items-start gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-brand-success/20 border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                  <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-emerald-400" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-white text-lg md:text-xl font-black mb-2 tracking-tight">Redução Fiscal</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Até <span className="text-emerald-400 font-bold">20% de redução</span> no imposto mensal para nossos clientes.
                </p>
              </div>
            </div>
          </div>

          {/* Suporte Humano + Ágil */}
          <div className="relative group p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-[2rem]"></div>
            
            <div className="relative flex items-start gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                  <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-brand-accent" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-white text-lg md:text-xl font-black mb-2 tracking-tight">Suporte Ágil</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Dúvidas respondidas em até <span className="text-brand-accent font-bold">15 minutos</span> por especialistas reais.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
