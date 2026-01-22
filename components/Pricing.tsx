
import React, { useState, useEffect } from 'react';
import { SectionId, PricingConfig } from '../types';
import { Check, Plus, Calculator, Users, Minus } from 'lucide-react';

interface PricingProps {
  pricingConfig: PricingConfig;
  onWhatsAppClick: (message: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ pricingConfig, onWhatsAppClick }) => {
  const [planType, setPlanType] = useState<'me' | 'mei'>('me');
  const [revenue, setRevenue] = useState(10000);
  const [employeeCount, setEmployeeCount] = useState(1); // Iniciamos com 1 (o próprio dono/sócio)

  // Ajusta o contador de funcionários ao trocar de plano (MEI tem limite de 1 funcionário + o dono)
  useEffect(() => {
    if (planType === 'mei' && employeeCount > 2) {
      setEmployeeCount(2);
    }
  }, [planType, employeeCount]);

  const calculateBasePrice = (currentRevenue: number) => {
    if (planType === 'mei') return pricingConfig.meiPrice;
    
    if (currentRevenue <= 10000) return pricingConfig.meBase10k;
    if (currentRevenue <= 20000) return pricingConfig.meBase20k;
    if (currentRevenue <= 30000) return pricingConfig.meBase30k;
    if (currentRevenue <= 50000) return pricingConfig.meBase50k;
    
    const excess = currentRevenue - 50000;
    const steps = Math.ceil(excess / 50000);
    return pricingConfig.meBase50k + (steps * pricingConfig.meExcessStep);
  };

  const currentBasePrice = calculateBasePrice(revenue);
  // Regra: O primeiro (dono/sócio) não paga adicional. Cobramos apenas a partir do segundo integrante.
  const additionalPeopleCount = Math.max(0, employeeCount - 1);
  const totalPrice = currentBasePrice + (additionalPeopleCount * pricingConfig.employeePrice);

  const handleContract = () => {
    const msg = `Olá! Tenho interesse no plano ${planType === 'mei' ? 'MEI' : 'ME'} de aproximadamente R$ ${totalPrice}/mês e gostaria de contratar. Faturamento: R$ ${revenue}, Integrantes: ${employeeCount}.`;
    onWhatsAppClick(msg);
  };

  return (
    <section id={SectionId.PRICING} className="py-16 md:py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Investimento Justo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">Sem pegadinhas. Selecione o porte da sua empresa e veja o valor exato.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-2 flex relative">
                <button onClick={() => setPlanType('me')} className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-bold transition-all z-10 ${planType === 'me' ? 'text-white' : 'text-gray-400'}`}>ME / EPP</button>
                <button onClick={() => setPlanType('mei')} className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-bold transition-all z-10 ${planType === 'mei' ? 'text-white' : 'text-gray-400'}`}>MEI</button>
                <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-brand-primary rounded-xl transition-all duration-300 ${planType === 'me' ? 'left-2' : 'left-[calc(50%+4px)]'}`}></div>
            </div>

            {planType === 'me' && (
              <div className="bg-[#1e293b]/50 p-6 md:p-8 rounded-2xl border border-white/10 animate-fadeIn">
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2"><Calculator className="w-5 h-5 text-brand-primary" /> Faturamento Mensal</h3>
                <input type="range" min="0" max="300000" step="5000" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full h-3 bg-[#0f172a] rounded-lg accent-brand-primary cursor-pointer" />
                <div className="flex justify-between mt-4">
                  <span className="text-gray-500 text-[10px] md:text-sm">R$ 0</span>
                  <span className="text-xl md:text-2xl font-bold text-white">R$ {revenue.toLocaleString('pt-BR')}</span>
                  <span className="text-gray-500 text-[10px] md:text-sm">R$ 300k+</span>
                </div>
              </div>
            )}
            
            <div className="bg-[#1e293b]/30 p-5 md:p-6 rounded-2xl border border-white/10">
               <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm md:text-base text-white font-bold flex items-center gap-2"><Users className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" /> {planType === 'mei' ? 'Proprietário + Funcionário' : 'Sócios / Funcionários'}</h3>
                  <div className="flex items-center gap-2 md:gap-4 bg-[#0f172a] p-1 rounded-xl">
                      <button onClick={() => setEmployeeCount(Math.max(1, employeeCount - 1))} className="p-1.5 md:p-2 hover:bg-white/5 rounded-lg text-gray-400"><Minus className="w-3 h-3 md:w-4 md:h-4" /></button>
                      <span className="text-white font-bold w-4 text-center text-sm">{employeeCount}</span>
                      <button 
                        onClick={() => {
                          if (planType === 'mei' && employeeCount >= 2) return;
                          setEmployeeCount(employeeCount + 1);
                        }} 
                        disabled={planType === 'mei' && employeeCount >= 2}
                        className={`p-1.5 md:p-2 hover:bg-white/5 rounded-lg text-gray-400 ${planType === 'mei' && employeeCount >= 2 ? 'opacity-20 cursor-not-allowed' : ''}`}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                  </div>
               </div>
               <p className="text-[9px] md:text-[10px] text-gray-500 italic">
                 {planType === 'mei' 
                  ? 'O MEI pode ter até 1 funcionário registrado. R$ 50 adicionais pela gestão da folha.' 
                  : `O 1º sócio é isento. R$ ${pricingConfig.employeePrice} por cada pessoa adicional (sócio ou funcionário).`}
               </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:sticky lg:top-24">
            <div className="bg-[#020617] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl">
              <h3 className="text-gray-400 text-[10px] font-bold uppercase mb-4 md:mb-6 tracking-widest">Resumo do Plano</h3>
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <span className="text-sm md:text-base text-gray-300">Total Mensal</span>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">R$ {totalPrice}</span>
                  <span className="text-gray-500 text-xs md:text-sm">,00</span>
                </div>
              </div>
              
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {[
                  "Contabilidade Digital completa",
                  "Plataforma de gestão integrada",
                  "Atendimento via WhatsApp",
                  planType === 'mei' ? "Desenquadramento facilitado" : "Planejamento Fator R",
                  employeeCount > 1 
                    ? `Gestão de ${employeeCount} pessoas (Dono + ${employeeCount - 1} ${employeeCount - 1 === 1 ? 'adicional' : 'adicionais'})` 
                    : "Gestão do proprietário inclusa"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                    <Check className="w-4 h-4 text-brand-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button onClick={handleContract} className="w-full bg-brand-primary hover:bg-violet-600 text-white font-black py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 text-sm md:text-base">Contratar via WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
