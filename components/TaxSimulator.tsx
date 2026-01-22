
import React, { useState, useMemo } from 'react';
import { SectionId } from '../types';
import { Calculator, ArrowRight, Sparkles, Info } from 'lucide-react';

interface TaxSimulatorProps {
  onWhatsAppClick: (message: string) => void;
}

const TaxSimulator: React.FC<TaxSimulatorProps> = ({ onWhatsAppClick }) => {
  const [revenue, setRevenue] = useState(5000);

  const stats = useMemo(() => {
    const annualRevenue = revenue * 12;

    // --- CÁLCULO PESSOA FÍSICA (CPF) ---
    const inssTeto = 1600; 
    const inss = Math.min(revenue * 0.20, inssTeto);
    const baseIrpf = revenue - inss;
    let irpf = 0;

    if (baseIrpf <= 3000) {
      irpf = 0;
    } else if (baseIrpf <= 4000) {
      irpf = (baseIrpf * 0.075) - 225;
    } else if (baseIrpf <= 5500) {
      irpf = (baseIrpf * 0.15) - 525;
    } else if (baseIrpf <= 7500) {
      irpf = (baseIrpf * 0.225) - 937;
    } else {
      irpf = (baseIrpf * 0.275) - 1312;
    }
    
    const totalPf = Math.max(0, inss + irpf);
    const effectiveRatePf = (totalPf / revenue) * 100;

    // --- CÁLCULO SIMPLES NACIONAL (ANEXO III) ---
    let nominalRate = 0;
    let deduction = 0;

    if (annualRevenue <= 180000) {
      nominalRate = 0.06;
      deduction = 0;
    } else if (annualRevenue <= 360000) {
      nominalRate = 0.112;
      deduction = 9360;
    } else if (annualRevenue <= 720000) {
      nominalRate = 0.135;
      deduction = 17640;
    } else if (annualRevenue <= 1800000) {
      nominalRate = 0.16;
      deduction = 35640;
    } else if (annualRevenue <= 3600000) {
      nominalRate = 0.21;
      deduction = 125640;
    } else {
      nominalRate = 0.33;
      deduction = 648000;
    }

    const effectiveRatePj = annualRevenue > 0 
      ? ((annualRevenue * nominalRate) - deduction) / annualRevenue 
      : 0.06;
    
    const totalPj = revenue * effectiveRatePj;
    const effectiveRatePjPercent = effectiveRatePj * 100;

    const monthlySavings = totalPf - totalPj;
    const annualSavings = Math.max(0, Math.floor(monthlySavings * 12));

    return {
      pf: Math.floor(totalPf),
      pj: Math.floor(totalPj),
      ratePf: effectiveRatePf.toFixed(1),
      ratePj: effectiveRatePjPercent.toFixed(1),
      annualSavings
    };
  }, [revenue]);

  const investmentIdea = useMemo(() => {
    const s = stats.annualSavings;
    if (s <= 0) return "Regularize-se agora para evitar bloqueios de CPF e multas.";
    if (s < 10000) return "Paga todas as suas ferramentas de trabalho do ano inteiro.";
    if (s < 20000) return "Dá para comprar um MacBook Pro M3 ou fazer uma viagem internacional.";
    if (s < 45000) return "Valor necessário para escalar seu tráfego e triplicar o faturamento.";
    return "Com essa economia, você escala seu negócio para o próximo nível.";
  }, [stats.annualSavings]);

  const handleConsult = () => {
    const msg = `Olá! Fiz a simulação. Faturando R$ ${revenue.toLocaleString('pt-BR')} no CPF, minha alíquota é ${stats.ratePf}%. Na Contabilin cai para ${stats.ratePj}%, economizando R$ ${stats.annualSavings.toLocaleString('pt-BR')} por ano.`;
    onWhatsAppClick(msg);
  };

  return (
    <section id={SectionId.SIMULATOR} className="py-16 md:py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <Calculator className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest text-center">Simulador Fiscal 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">O Leão não perdoa o CPF.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">Calculamos sua economia real baseada no Anexo III vs IRPF Autônomo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Lado Esquerdo: Input */}
          <div className="bg-[#1e293b]/10 border border-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center">
            <div className="space-y-8 md:space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                <label className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">Faturamento Mensal</label>
                <div className="text-right">
                  <span className="text-gray-400 text-lg md:text-xl mr-2 font-bold">R$</span>
                  <span className="text-4xl md:text-6xl font-black text-white">{revenue.toLocaleString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="relative py-4">
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="1000" 
                  value={revenue} 
                  onChange={e => setRevenue(Number(e.target.value))} 
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary" 
                />
                <div className="flex justify-between mt-4 text-[9px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    <span>R$ 5k</span>
                    <span>R$ 200k+</span>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 flex gap-3 md:gap-4">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                  Cálculo considera <strong>Alíquota Efetiva</strong> Anexo III para PJ e <strong>Progressiva + INSS</strong> para CPF.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Resultado */}
          <div className="bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-3xl md:rounded-[2.5rem] p-1 shadow-2xl">
            <div className="bg-[#020617] h-full rounded-[1.8rem] md:rounded-[2.4rem] p-6 md:p-12 flex flex-col justify-between">
               <div>
                  <p className="text-brand-primary font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3">Economia Anual Estimada</p>
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter break-all">
                    R$ {stats.annualSavings.toLocaleString('pt-BR')}
                  </h3>
                  
                  <div className="flex items-start gap-2 md:gap-3 mb-8 md:mb-10 min-h-[50px]">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 mt-1" />
                    <p className="text-xs md:text-base font-medium italic text-gray-300 leading-relaxed">
                      {investmentIdea}
                    </p>
                  </div>
                  
                  <div className="space-y-2 md:space-y-4 mb-8 md:mb-12">
                    <div className="flex justify-between items-center py-3 md:py-5 border-b border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-gray-500 font-medium">No CPF (Autônomo):</span>
                        <span className="text-[9px] md:text-[10px] text-red-500 font-bold uppercase tracking-widest">{stats.ratePf}% Efetiva</span>
                      </div>
                      <span className="text-lg md:text-xl font-bold text-red-500/80">R$ {stats.pf.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 md:py-5 border-b border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-gray-300 font-medium">Na Contabilin (PJ):</span>
                        <span className="text-[9px] md:text-[10px] text-brand-primary font-bold uppercase tracking-widest">{stats.ratePj}% Efetiva</span>
                      </div>
                      <span className="text-lg md:text-xl font-bold text-brand-primary">R$ {stats.pj.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
               </div>

               <button 
                  onClick={handleConsult} 
                  className="w-full bg-brand-primary hover:bg-violet-600 text-white font-black py-4 md:py-6 rounded-2xl md:rounded-3xl shadow-xl transition-all flex items-center justify-center gap-2 md:gap-3 transform hover:-translate-y-1 text-base md:text-lg group"
               >
                 Migrar para a Contabilin <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxSimulator;
