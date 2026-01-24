
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Percent, Calculator, ArrowRight, ShieldCheck, 
  Sparkles, Info, FileText, Scale, BookOpen, Globe, Zap,
  BarChart3, Landmark, AlertTriangle, Layers, HelpCircle
} from 'lucide-react';

// Tabelas do Simples Nacional (LC 155/16)
const ANNEX_TABLES: Record<string, any[]> = {
  "I": [ // Comércio
    { limit: 180000, rate: 0.04, deduction: 0 },
    { limit: 360000, rate: 0.073, deduction: 5940 },
    { limit: 720000, rate: 0.095, deduction: 13860 },
    { limit: 1800000, rate: 0.107, deduction: 22500 },
    { limit: 3600000, rate: 0.143, deduction: 87300 },
    { limit: 4800000, rate: 0.19, deduction: 256500 }
  ],
  "II": [ // Indústria
    { limit: 180000, rate: 0.045, deduction: 0 },
    { limit: 360000, rate: 0.078, deduction: 5940 },
    { limit: 720000, rate: 0.10, deduction: 13860 },
    { limit: 1800000, rate: 0.112, deduction: 22500 },
    { limit: 3600000, rate: 0.147, deduction: 85500 },
    { limit: 4800000, rate: 0.30, deduction: 634500 }
  ],
  "III": [ // Serviços (Receita de Locação, Academias, TI com Fator R, etc)
    { limit: 180000, rate: 0.06, deduction: 0 },
    { limit: 360000, rate: 0.112, deduction: 9360 },
    { limit: 720000, rate: 0.135, deduction: 17640 },
    { limit: 1800000, rate: 0.16, deduction: 35640 },
    { limit: 3600000, rate: 0.21, deduction: 125640 },
    { limit: 4800000, rate: 0.33, deduction: 648000 }
  ],
  "IV": [ // Serviços (Advocacia, Construção Civil, etc)
    { limit: 180000, rate: 0.045, deduction: 0 },
    { limit: 360000, rate: 0.09, deduction: 8100 },
    { limit: 720000, rate: 0.102, deduction: 12420 },
    { limit: 1800000, rate: 0.14, deduction: 39780 },
    { limit: 3600000, rate: 0.22, deduction: 183780 },
    { limit: 4800000, rate: 0.33, deduction: 580000 }
  ],
  "V": [ // Serviços (Tecnologia, Consultoria sem Fator R)
    { limit: 180000, rate: 0.155, deduction: 0 },
    { limit: 360000, rate: 0.18, deduction: 4500 },
    { limit: 720000, rate: 0.195, deduction: 9900 },
    { limit: 1800000, rate: 0.205, deduction: 17100 },
    { limit: 3600000, rate: 0.23, deduction: 62100 },
    { limit: 4800000, rate: 0.305, deduction: 332100 }
  ]
};

const REPARTICAO_BASE: Record<string, any> = {
  "I": { irpj: 5.5, csll: 3.5, cofins: 12.74, pis: 2.76, cpp: 41.5, icms: 34.0, iss: 0 },
  "II": { irpj: 5.5, csll: 3.5, cofins: 11.51, pis: 2.49, cpp: 37.5, icms: 32.0, ipi: 7.5, iss: 0 },
  "III": { irpj: 4.0, csll: 3.5, cofins: 12.74, pis: 2.76, cpp: 43.4, icms: 0, iss: 33.5 },
  "IV": { irpj: 18.8, csll: 15.2, cofins: 17.67, pis: 3.83, cpp: 0, icms: 0, iss: 44.5 },
  "V": { irpj: 25.0, csll: 15.0, cofins: 14.1, pis: 3.05, cpp: 28.85, icms: 0, iss: 14.0 }
};

const SimplesNacionalPage: React.FC<{ onBack: () => void, onWhatsAppClick: (msg: string) => void }> = ({ onBack, onWhatsAppClick }) => {
  const [revSimples, setRevSimples] = useState(20000);
  const [selectedAnnex, setSelectedAnnex] = useState("III");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const simplesResult = useMemo(() => {
    const rbt12 = revSimples * 12;
    const table = ANNEX_TABLES[selectedAnnex];
    let config = table[0];

    for (let i = table.length - 1; i >= 0; i--) {
        if (rbt12 > (table[i-1]?.limit || 0)) {
            config = table[i];
            break;
        }
    }

    const aliqNominal = config.rate;
    const deduc = config.deduction;
    const aet = rbt12 > 0 ? ((rbt12 * aliqNominal) - deduc) / rbt12 : aliqNominal;
    const tax = revSimples * aet;
    
    const reparticao = REPARTICAO_BASE[selectedAnnex];
    const effectiveTaxes: any = {};
    Object.keys(reparticao).forEach(key => {
        effectiveTaxes[key] = (aet * 100 * reparticao[key]) / 100;
    });

    return { 
      tax, 
      aet: (aet * 100).toFixed(2), 
      nominal: (aliqNominal * 100).toFixed(2),
      deduc,
      rbt12,
      effectiveTaxes
    };
  }, [revSimples, selectedAnnex]);

  return (
    <div className="pt-32 pb-20 bg-[#01040a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-primary hover:text-white transition-colors mb-12 group no-print">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Início
        </button>

        <header className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <Scale className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Contabilidade Digital de Alta Performance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Calculadora <span className="text-brand-primary">Simples Nacional 2026</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed font-medium">
            Entenda sua carga tributária real. O Simples Nacional não é uma taxa fixa, mas um cálculo progressivo baseado no seu faturamento acumulado.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0f172a] rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>
              
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} className="text-brand-primary" /> 1. Qual o seu Anexo de Atividade?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {["I", "II", "III", "IV", "V"].map((anexo) => (
                      <button
                        key={anexo}
                        onClick={() => setSelectedAnnex(anexo)}
                        className={`py-3 rounded-xl text-xs font-black transition-all border ${
                          selectedAnnex === anexo 
                          ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-brand-primary/50'
                        }`}
                      >
                        Anexo {anexo}
                      </button>
                    ))}
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl text-[10px] text-gray-400 leading-relaxed">
                    {selectedAnnex === 'I' && '🎯 Comércio: Venda de mercadorias físicas, lojas e-commerce e revendas.'}
                    {selectedAnnex === 'II' && '🎯 Indústria: Fabricação de produtos e transformação de matéria-prima.'}
                    {selectedAnnex === 'III' && '🎯 Serviços Gerais: Academias, Locação, Tecnologia e Marketing (com Fator R).'}
                    {selectedAnnex === 'IV' && '🎯 Serviços Específicos: Advocacia, Construção Civil e Vigilância.'}
                    {selectedAnnex === 'V' && '🎯 Serviços Intelectuais: Consultoria, TI e Engenharia (sem Fator R).'}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">2. Faturamento Mensal Médio</label>
                    <span className="text-3xl font-black text-white">R$ {revSimples.toLocaleString('pt-BR')}</span>
                  </div>
                  <input 
                    type="range" min="5000" max="350000" step="5000" value={revSimples} 
                    onChange={e => setRevSimples(Number(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-full accent-brand-primary appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-700 font-black uppercase">
                    <span>Início</span>
                    <span>Topo da Faixa</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-brand-primary/5 p-6 rounded-3xl border border-brand-primary/10">
                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">Alíquota Efetiva (AET)</p>
                    <p className="text-4xl font-black text-white">{simplesResult.aet}%</p>
                  </div>
                  <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Guia DAS Estimada</p>
                    <p className="text-4xl font-black text-white">R$ {Math.floor(simplesResult.tax).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-6">
               <div className="flex items-center gap-3">
                  <Calculator className="text-brand-primary" size={20} />
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">Memória de Cálculo (Regra de Ouro)</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-600 font-black uppercase">Faturamento 12 meses (RBT12)</p>
                    <p className="text-white font-bold">{formatBRL(simplesResult.rbt12)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-600 font-black uppercase">Alíquota Nominal</p>
                    <p className="text-white font-bold">{simplesResult.nominal}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-600 font-black uppercase">Parcela a Deduzir</p>
                    <p className="text-white font-bold">{formatBRL(simplesResult.deduc)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-brand-primary font-black uppercase">Resultado Efetivo</p>
                    <p className="text-brand-primary font-black">{simplesResult.aet}%</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative">
               <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="text-brand-accent" size={22} />
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">Onde seu dinheiro está indo?</h3>
               </div>
               
               <div className="space-y-5">
                  {Object.entries(simplesResult.effectiveTaxes).map(([tax, val]: [string, any], i) => {
                    if (val === 0) return null;
                    return (
                      <div key={i} className="space-y-1.5 group">
                        <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                            <span className="text-gray-500 group-hover:text-white transition-colors">{tax === 'cpp' ? 'CPP (INSS Empresa)' : tax.toUpperCase()}</span>
                            <span className="text-white">{val.toFixed(3)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-brand-primary opacity-60 group-hover:opacity-100 transition-all`} style={{ width: `${(val / Number(simplesResult.aet)) * 100}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            <button 
              onClick={() => onWhatsAppClick(`Olá! Usei o Simulador Simples Nacional 2026. Com faturamento mensal de R$ ${revSimples}, minha alíquota deu ${simplesResult.aet}%. Quero otimizar meu lucro.`)}
              className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              <Zap size={20} /> Otimizar meus Impostos
            </button>
            
            <div className="bg-yellow-500/5 border border-yellow-500/10 p-6 rounded-[2rem] flex items-start gap-4">
               <AlertTriangle className="text-yellow-500 shrink-0" size={24} />
               <div className="space-y-1">
                  <h4 className="text-white font-bold text-xs uppercase">Atenção ao Limite de 2026</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Se você faturar acima de <strong>R$ 3,6 milhões/ano</strong>, o ISS e ICMS devem ser pagos fora do DAS. Fique atento para não ser desenquadrado!
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PARA SEO E DIVULGAÇÃO */}
        <div className="mt-20 space-y-16 border-t border-white/5 pt-20">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">O Guia Prático do <span className="text-brand-primary">Simples Nacional</span></h2>
                    <p className="text-gray-400 leading-relaxed">
                        O Simples Nacional é o regime tributário mais adotado por pequenas e médias empresas no Brasil (ME e EPP). Criado pela Lei Complementar 123/2006, ele unifica até 8 impostos em uma única guia mensal, o <strong>DAS (Documento de Arrecadação do Simples Nacional)</strong>.
                    </p>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="text-brand-primary" />
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Como funciona o cálculo?</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                            Diferente do que muitos pensam, a alíquota não é um valor fixo. Ela é calculada pela fórmula: <strong>[(RBT12 x Alíquota Nominal) - Parcela a Deduzir] / RBT12</strong>. Onde RBT12 é a soma do faturamento dos últimos 12 meses.
                        </p>
                    </div>
                </div>
                <div className="bg-[#1e293b]/30 p-8 rounded-[3rem] border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3"><Landmark className="text-brand-primary" /> Impostos Unificados</h3>
                    <ul className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> IRPJ</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> CSLL</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> PIS/PASEP</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> COFINS</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> IPI</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> CPP</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div> ISS (Municipal)</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div> ICMS (Estadual)</li>
                    </ul>
                </div>
            </section>

            <section className="bg-brand-primary/5 rounded-[3rem] p-10 md:p-16 border border-brand-primary/10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-2xl md:text-3xl font-black text-white">Por que o enquadramento no <span className="text-brand-primary">Anexo Correto</span> é vital?</h2>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        Muitos empreendedores do mercado digital estão pagando impostos no <strong>Anexo V (15,5%)</strong> quando poderiam estar no <strong>Anexo III (6%)</strong> através da estratégia do Fator R. Nossa calculadora ajuda você a identificar essa oportunidade instantaneamente.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                        <div className="space-y-2">
                            <div className="text-brand-primary font-black text-2xl">R$ 4,8Mi</div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Limite Global Anual</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-brand-primary font-black text-2xl">R$ 3,6Mi</div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Sublimite ICMS/ISS</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-brand-primary font-black text-2xl">R$ 81k</div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Teto MEI (Ref. 2026)</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div className="mt-24 border-t border-white/5 pt-12 text-center opacity-40">
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto font-black uppercase tracking-[0.3em] leading-relaxed">
            Contabilin Contabilidade Inteligente &copy; 2026 - Estratégia Fiscal de Alta Performance.
          </p>
        </div>
      </div>
    </div>
  );
};

const formatBRL = (val: number) => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default SimplesNacionalPage;
