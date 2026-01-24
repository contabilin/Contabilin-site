
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Zap, ShieldCheck, ArrowRight, TrendingUp, Sparkles, 
  Building, Calendar, Database, Activity, Landmark, Info, Printer, ChevronDown, ChevronUp, AlertCircle, Coins, Scale, FileText, BookOpen
} from 'lucide-react';

const FatorRPage: React.FC<{ onBack: () => void, onWhatsAppClick: (msg: string) => void }> = ({ onBack, onWhatsAppClick }) => {
  const [companyName, setCompanyName] = useState('');
  const [refMonth, setRefMonth] = useState(''); 
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [rbt12Actual, setRbt12Actual] = useState<number>(100000);
  const [fp12Actual, setFp12Actual] = useState<number>(20000);
  const [revenueToSubtract, setRevenueToSubtract] = useState<number>(0);
  const [payrollToSubtract, setPayrollToSubtract] = useState<number>(0);
  const [revenueRefMonth, setRevenueRefMonth] = useState<number>(10000);
  const [inssPatronal, setInssPatronal] = useState<number>(0);
  const [fgts, setFgts] = useState<number>(0);
  const [otherSalaries, setOtherSalaries] = useState<number>(0);

  const [showMemory, setShowMemory] = useState(true);

  const MIN_FATOR_R = 0.28;
  const MIN_SALARY_2026 = 1621.00;
  const SAFETY_MARGIN = 10.00;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: number) => void) => {
    let value = e.target.value.replace(/\D/g, '');
    const numericValue = Number(value) / 100;
    setter(numericValue);
  };

  const displayCurrency = (val: number) => {
    if (val === 0) return '';
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 6) val = val.substring(0, 6);
    if (val.length >= 2) {
      let month = parseInt(val.substring(0, 2));
      if (month > 12) month = 12;
      const monthStr = month.toString().padStart(2, '0');
      val = val.length > 2 ? monthStr + '/' + val.substring(2) : monthStr;
    }
    setRefMonth(val);
  };

  const dateLabels = useMemo(() => {
    return { out: 'mês descartado', period: 'Janela Móvel' };
  }, [refMonth]);

  const calc = useMemo(() => {
    const rbt11 = rbt12Actual - revenueToSubtract;
    const fp11 = fp12Actual - payrollToSubtract;
    const rbt12New = rbt11 + revenueRefMonth;
    const fp12Target = (rbt12New * MIN_FATOR_R) + SAFETY_MARGIN;
    const totalPayrollNeededThisMonth = Math.max(0, fp12Target - fp11);
    const existingChargesThisMonth = inssPatronal + fgts + otherSalaries;
    const proLaboreMath = totalPayrollNeededThisMonth - existingChargesThisMonth;
    const finalResult = Math.max(proLaboreMath, MIN_SALARY_2026);
    const finalFP12 = fp11 + finalResult + existingChargesThisMonth;
    const realFatorR = rbt12New > 0 ? (finalFP12 / rbt12New) : 0;

    return {
      rbt11, fp11, rbt12New, fp12Target, totalPayrollNeededThisMonth, proLaboreMath, existingChargesThisMonth, finalResult,
      realFatorR: (realFatorR * 100).toFixed(2),
      isOk: realFatorR >= 0.28
    };
  }, [rbt12Actual, fp12Actual, revenueToSubtract, payrollToSubtract, revenueRefMonth, inssPatronal, fgts, otherSalaries]);

  return (
    <div className="pt-32 pb-20 bg-[#01040a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="no-print flex items-center justify-between mb-12 animate-fade-in-up">
          <button onClick={onBack} className="flex items-center gap-2 text-brand-primary hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Site
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest shadow-lg"
          >
            <Printer size={16} className="text-brand-primary" /> Exportar Análise (PDF)
          </button>
        </div>

        <header className="mb-12 no-print text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <Zap className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Estratégia Fiscal Inteligente 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Calculadora <span className="text-brand-primary">Fator R</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl mt-4 leading-relaxed font-medium">
            Pague apenas 6% de imposto no Simples Nacional. Nossa ferramenta calcula o Pró-labore exato para você se enquadrar no Anexo III.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start no-print mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
              <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Building size={16} className="text-brand-primary" /> 1. Identificação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Nome da Empresa</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Agência ou Dev LTDA" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Mês/Ano de Ref.</label>
                  <input type="text" value={refMonth} onChange={handleDateChange} placeholder="MM/AAAA" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
              <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Database size={16} className="text-brand-accent" /> 2. Acumulado dos Últimos 12 Meses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Faturamento (RBT12)</label>
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">R$</span>
                  <input type="text" value={displayCurrency(rbt12Actual)} onChange={e => handleCurrencyInput(e, setRbt12Actual)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-bold" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Folha (FP12)</label>
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">R$</span>
                  <input type="text" value={displayCurrency(fp12Actual)} onChange={e => handleCurrencyInput(e, setFp12Actual)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-bold" /></div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6 border-l-4 border-l-brand-success/30">
              <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={16} className="text-brand-success" /> 3. Projeção Mês Atual
              </h3>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase">Faturamento Estimado</label>
                <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">R$</span>
                <input type="text" value={displayCurrency(revenueRefMonth)} onChange={e => handleCurrencyInput(e, setRevenueRefMonth)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-black text-lg" /></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 p-1 rounded-[2.5rem] shadow-2xl sticky top-24">
                <div className="bg-[#020617] p-10 rounded-[2.4rem] space-y-8 text-center">
                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Pró-labore Mínimo Sugerido</p>
                    <h2 className="text-5xl font-black text-white">{formatBRL(calc.finalResult)}</h2>
                    <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mx-auto inline-flex items-center gap-2 ${calc.isOk ? 'bg-brand-success/10 border-brand-success/20 text-brand-success' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                        {calc.isOk ? <ShieldCheck size={12} /> : <AlertCircle size={12} />} Fator R: {calc.realFatorR}%
                    </div>
                    
                    <button 
                      onClick={() => onWhatsAppClick(`Olá! Fiz o cálculo do Fator R. Para faturamento mensal de R$ ${revenueRefMonth}, meu Pró-labore sugerido é de ${formatBRL(calc.finalResult)} para pagar 6%. Quero implementar.`)}
                      className="w-full bg-brand-primary hover:bg-violet-600 text-white py-5 rounded-2xl font-black text-sm uppercase shadow-xl transition-all"
                    >
                      Implementar Planejamento
                    </button>
                    
                    <p className="text-[9px] text-gray-600 font-bold uppercase leading-relaxed">
                        Cálculo baseado no Salário Mínimo 2026 (R$ 1.621,00) + Margem de Segurança Fiscal.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PARA SEO E AUTORIDADE */}
        <div className="mt-20 space-y-20 border-t border-white/5 pt-20">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">O que é a Regra do <span className="text-brand-primary">Fator R</span>?</h2>
                    <p className="text-gray-400 leading-relaxed">
                        O Fator R é um mecanismo legal criado pela <strong>Lei Complementar 155/2016</strong> que permite que empresas prestadoras de serviços intelectuais (como desenvolvedores, consultores, médicos e gestores de tráfego) reduzam sua carga tributária no Simples Nacional.
                    </p>
                    <div className="bg-brand-primary/5 p-8 rounded-3xl border border-brand-primary/10">
                        <p className="text-white font-bold text-lg mb-4">A Regra dos 28%</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Para sair do <strong>Anexo V (15,5%)</strong> e entrar no <strong>Anexo III (6%)</strong>, o valor da sua folha de pagamento (incluindo Pró-labore e FGTS) deve ser igual ou superior a <strong>28%</strong> do seu faturamento bruto acumulado nos últimos 12 meses.
                        </p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-[#1e293b]/30 p-8 rounded-3xl border border-white/5 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3"><Scale className="text-brand-primary" /> Comparativo de Impacto</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                                <div>
                                    <p className="text-[10px] text-red-500 font-black uppercase">Sem Fator R (Anexo V)</p>
                                    <p className="text-white font-bold">Inicia em 15,5%</p>
                                </div>
                                <AlertCircle className="text-red-500" />
                            </div>
                            <div className="flex justify-between items-center bg-brand-success/5 p-4 rounded-xl border border-brand-success/10">
                                <div>
                                    <p className="text-[10px] text-brand-success font-black uppercase">Com Fator R (Anexo III)</p>
                                    <p className="text-white font-bold">Inicia em 6,0%</p>
                                </div>
                                <ShieldCheck className="text-brand-success" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                         <h4 className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-4">Atividades Beneficiadas</h4>
                         <ul className="grid grid-cols-2 gap-y-2 text-xs font-medium text-gray-400">
                            <li>• Tecnologia (TI/Devs)</li>
                            <li>• Marketing Digital</li>
                            <li>• Consultoria Empresarial</li>
                            <li>• Medicina e Saúde</li>
                            <li>• Engenharia e Arquitetura</li>
                            <li>• Jornalismo e Redação</li>
                         </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white/5 rounded-[3rem] p-12 border border-white/10">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                            <BookOpen className="w-4 h-4 text-brand-accent" />
                            <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Base Legal</span>
                        </div>
                        <h2 className="text-2xl font-black text-white">Por que o monitoramento mensal é <span className="text-brand-primary">obrigatório</span>?</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            O Fator R é dinâmico. Se seu faturamento subir bruscamente em um mês e seu Pró-labore não for ajustado, você corre o risco de cair para 15,5% no mês seguinte, perdendo milhares de reais. Nossa calculadora utiliza o conceito de <strong>Janela Móvel</strong> para garantir que você esteja sempre protegido.
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <button 
                            onClick={() => onWhatsAppClick("Olá! Gostaria de saber como a Contabilin monitora o Fator R mensalmente para seus clientes.")}
                            className="bg-white text-brand-dark px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                        >
                            Monitoramento Profissional <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>
        </div>

        <div className="mt-24 border-t border-white/5 pt-12 text-center no-print">
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto font-black uppercase tracking-widest leading-relaxed">
            Contabilin Contabilidade Inteligente &copy; 2026 - Estratégia Fiscal de Elite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FatorRPage;
