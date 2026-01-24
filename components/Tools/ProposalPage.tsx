
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Copy, Check, MessageSquare, Calculator, 
  Landmark, ShieldCheck, Sparkles, User, Receipt, 
  Building2, Wallet, Scale, FileKey, Users, ScrollText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const JUNTA_TAXAS: Record<string, number> = {
  "AC": 682.93, "AL": 383.00, "AP": 355.56, "AM": 608.79,
  "BA": 349.00, "CE": 260.06, "DF": 388.91, "ES": 417.88,
  "GO": 195.00, "MA": 403.00, "MT": 210.00, "MS": 454.00,
  "MG": 268.51, "PA": 519.00, "PB": 328.94, "PR": 128.30,
  "PE": 396.00, "PI": 455.45, "RJ": 600.00, "RN": 568.74,
  "RS": 197.50, "RO": 606.63, "RR": 490.05, "SC": 168.00,
  "SP": 211.01, "SE": 415.49, "TO": 367.00
};

const STATES = {
  "AC": "Acre", "AL": "Alagoas", "AP": "Amapá", "AM": "Amazonas", "BA": "Bahia", "CE": "Ceará", "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás", "MA": "Maranhão", "MT": "Mato Grosso", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais", "PA": "Pará", "PB": "Paraíba", "PR": "Paraná", "PE": "Pernambuco", "PI": "Piauí", "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte", "RS": "Rio Grande do Sul", "RO": "Rondônia", "RR": "Roraima", "SC": "Santa Catarina", "SP": "São Paulo", "SE": "Sergipe", "TO": "Tocantins"
};

const SALARIO_MINIMO_2026 = 1621.00;

interface ProposalPageProps {
  onBack: () => void;
  onWhatsAppClick: (msg: string) => void;
  isEmbedded?: boolean;
}

const ProposalPage: React.FC<ProposalPageProps> = ({ onBack, onWhatsAppClick, isEmbedded }) => {
  const { pricingConfig } = useApp();
  
  const [formData, setFormData] = useState({
    clientName: '',
    serviceType: 'Abertura/Alteração',
    revenue: 10000,
    state: 'SC',
    hasFiscalAddress: 'nao',
    fiscalAddressValue: 1000,
    needsCertificate: 'sim',
    annex: 'III', 
    employeeCount: 0,
    regularizationCost: 997,
    regularizationDetails: ''
  });
  
  const [copied, setCopied] = useState(false);

  const proposalCalculations = useMemo(() => {
    const rev = formData.revenue;
    const emp = formData.employeeCount;
    const ann = formData.annex;
    
    const calcHonorariosBase = (f: number) => {
      if (f <= 10000) return pricingConfig.meBase10k;
      if (f <= 20000) return pricingConfig.meBase20k;
      if (f <= 30000) return pricingConfig.meBase30k;
      if (f <= 50000) return pricingConfig.meBase50k;
      const extra = Math.ceil((f - 50000) / 50000);
      return pricingConfig.meBase50k + (extra * pricingConfig.meExcessStep);
    };

    const baseHonorary = calcHonorariosBase(rev);
    const employeeAditional = emp * pricingConfig.employeePrice;
    const totalHonorary = baseHonorary + employeeAditional;

    const annual = rev * 12;
    let aliq = 0.06;
    let deduc = 0;
    
    if (ann === 'IV') {
        if (annual <= 180000) { aliq = 0.045; deduc = 0; }
        else if (annual <= 360000) { aliq = 0.09; deduc = 8100; }
        else if (annual <= 720000) { aliq = 0.102; deduc = 12420; }
        else { aliq = 0.14; deduc = 39780; }
    } else {
        if (annual <= 180000) { aliq = 0.06; deduc = 0; }
        else if (annual <= 360000) { aliq = 0.112; deduc = 9360; }
        else if (annual <= 720000) { aliq = 0.135; deduc = 17640; }
        else { aliq = 0.16; deduc = 35640; }
    }
    
    const aet = (annual * aliq - deduc) / annual;
    const taxSimples = rev * aet;
    const totalFolhaFuncionarios = emp * SALARIO_MINIMO_2026;
    const metaFolha28 = rev * 0.28;
    
    let proLabore = SALARIO_MINIMO_2026;
    if (ann === 'V') {
        const necessidadeDiferenca = metaFolha28 - totalFolhaFuncionarios;
        proLabore = Math.max(SALARIO_MINIMO_2026, necessidadeDiferenca);
    }

    const inssPessoal = proLabore * 0.11;
    const inssPatronal = ann === 'IV' ? (proLabore + totalFolhaFuncionarios) * 0.20 : 0;
    const baseIR = proLabore - inssPessoal;
    let irrf = 0;
    if (baseIR > 2259.20) {
      if (baseIR <= 2826.65) irrf = (baseIR * 0.075) - 169.44;
      else if (baseIR <= 3751.05) irrf = (baseIR * 0.15) - 381.44;
      else if (baseIR <= 4664.68) irrf = (baseIR * 0.225) - 662.77;
      else irrf = (baseIR * 0.275) - 896.00;
    }

    const totalMonthly = taxSimples + inssPessoal + inssPatronal + irrf + totalHonorary;
    const junta = JUNTA_TAXAS[formData.state] || 168;
    const initialHonoraries = 997;
    const prefeitura = 250;
    const eCnpj = formData.needsCertificate === 'sim' ? 200 : 0;
    const fiscalValue = formData.hasFiscalAddress === 'sim' ? formData.fiscalAddressValue : 0;
    const totalInitial = initialHonoraries + junta + prefeitura + eCnpj + fiscalValue;

    return {
      initial: { honoraries: initialHonoraries, junta, prefeitura, eCnpj, fiscalValue, total: totalInitial },
      monthly: { 
        revenue: rev, 
        proLabore, 
        inssPessoal, 
        inssPatronal, 
        irrf, 
        taxSimples, 
        honorary: totalHonorary, 
        total: totalMonthly, 
        employeeCount: emp,
        annex: ann 
      }
    };
  }, [formData, pricingConfig]);

  const whatsappMessage = useMemo(() => {
    const { initial, monthly } = proposalCalculations;
    const format = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    
    const header = `Olá, *${formData.clientName || 'cliente'}*! 👋 Segue nossa proposta estratégica personalizada:

---

📊 🧠 *PROPOSTA CONTABILIN CONTABILIDADE INTELIGENTE*`;

    const initialSection = `
💰 *INVESTIMENTO INICIAL*
* Honorários de Processo: \`R$ ${format(initial.honoraries)}\`
* Taxa Junta Comercial (\`${formData.state}\`): \`R$ ${format(initial.junta)}\`
* Taxa Prefeitura/Alvará (estimativa): \`R$ ${format(initial.prefeitura)}\`
${initial.eCnpj > 0 ? `* Certificado Digital e-CNPJ: \`R$ ${format(initial.eCnpj)}\`\n` : ''}${formData.hasFiscalAddress === 'sim' ? `* Sede Virtual (Endereço Fiscal): \`R$ ${format(initial.fiscalValue)}\`` : ''}

✅ *Custo Total de Implantação:* \`R$ ${format(initial.total)}\`
_Honorários pagos 50% no início e 50% na entrega do Contrato Social._`;

    const monthlySection = `
🗓️ *MANUTENÇÃO MENSAL (ESTIMATIVA)*
* Faturamento Médio: \`R$ ${format(monthly.revenue)}\`
* Enquadramento: *Anexo \`${monthly.annex}\`* ${monthly.annex === 'V' ? '(Estratégia Fator R 6%)' : ''}
* Pró-Labore Sugerido: \`R$ ${format(monthly.proLabore)}\`
* Funcionários: ${monthly.employeeCount > 0 ? `\`${monthly.employeeCount}\` pessoa(s)` : 'Nenhum'}
* Imposto Simples Nacional: \`R$ ${format(monthly.taxSimples)}\`
* Encargos (INSS/IRRF): \`R$ ${format(monthly.inssPessoal + monthly.irrf)}\`
${monthly.annex === 'IV' ? `* INSS Patronal (20%): \`R$ ${format(monthly.inssPatronal)}\`\n` : ''}* Honorários Contabilin: \`R$ ${format(monthly.honorary)}\`

✅ *Custo Operacional Mensal:* \`R$ ${format(monthly.total)}\`${monthly.employeeCount > 0 ? ` + Custo com \`${monthly.employeeCount}\` funcionário(s)` : ''}`;

    const footer = `
---
*Por que a Contabilin?*
${monthly.annex === 'V' ? 'Como sua atividade é do Anexo V, aplicamos o Fator R para você pagar apenas 6% de imposto em vez de 15,5%. ' : ''}Somos especialistas em prestadores de serviço e nossa missão é blindar seu lucro com inteligência fiscal.

Vamos iniciar sua jornada?`;

    if (formData.serviceType === 'Regularização de Empresa') {
        return `Olá, *${formData.clientName || 'cliente'}*! 👋 Segue nossa proposta para Regularização:
        
💰 *INVESTIMENTO:* \`R$ ${format(formData.regularizationCost)}\`
* \`${formData.regularizationDetails || 'Regularização completa de pendências fiscais e cadastrais.'}\`

Forma de pagamento: \`50%\` entrada e \`50%\` na conclusão.`;
    }

    if (formData.serviceType === 'Troca de Contabilidade') {
        return `${header}
        
${monthlySection}

_Obs: Na migração, os custos iniciais são isentos, exceto se houver necessidade de alteração contratual._

${footer}`;
    }

    return `${header}
${formData.serviceType === 'Abertura/Alteração' ? initialSection : ''}
${monthlySection}
${footer}`;
  }, [formData, proposalCalculations]);

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectClass = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer text-sm font-medium";
  const optionClass = "bg-[#0f172a] text-white py-2";

  return (
    <div className={`${!isEmbedded ? 'pt-32 pb-20 bg-[#01040a] min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <ScrollText className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Painel Administrativo Comercial</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
            Gerador de <span className="text-brand-primary">Proposta Comercial</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0f172a] rounded-[2rem] border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                       <User size={14} className="text-brand-primary" /> Nome do Cliente
                    </label>
                    <input 
                      type="text" 
                      value={formData.clientName} 
                      onChange={e => setFormData({...formData, clientName: e.target.value})} 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-brand-primary transition-all text-sm" 
                      placeholder="Ex: João Silva"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                       <Landmark size={14} className="text-brand-accent" /> Tipo de Proposta
                    </label>
                    <select 
                      value={formData.serviceType} 
                      onChange={e => setFormData({...formData, serviceType: e.target.value})} 
                      className={selectClass}
                    >
                      <option value="Abertura/Alteração" className={optionClass}>Abertura/Alteração</option>
                      <option value="Troca de Contabilidade" className={optionClass}>Troca de Contabilidade</option>
                      <option value="Regularização de Empresa" className={optionClass}>Regularização de Empresa</option>
                    </select>
                  </div>
               </div>

               {formData.serviceType === 'Regularização de Empresa' ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Valor da Regularização (R$)</label>
                        <input 
                          type="number" 
                          value={formData.regularizationCost} 
                          onChange={e => setFormData({...formData, regularizationCost: Number(e.target.value)})} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Detalhes da Regularização</label>
                        <input 
                          type="text" 
                          value={formData.regularizationDetails} 
                          onChange={e => setFormData({...formData, regularizationDetails: e.target.value})} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm"
                          placeholder="Ex: Pendências e-CAC"
                        />
                    </div>
                 </div>
               ) : (
                 <>
                   <div className="space-y-4 pt-6 border-t border-white/5">
                      <div className="flex justify-between items-end">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Receipt size={14} className="text-brand-primary" /> Faturamento Mensal Estimado
                         </label>
                         <span className="text-xl font-black text-white">R$ {formData.revenue.toLocaleString('pt-BR')}</span>
                      </div>
                      <input 
                        type="range" min="5000" max="150000" step="1000" value={formData.revenue} 
                        onChange={e => setFormData({...formData, revenue: Number(e.target.value)})}
                        className="w-full h-2 bg-white/10 rounded-full accent-brand-primary appearance-none cursor-pointer" 
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Estado (Custos Junta)</label>
                        <select 
                          value={formData.state} 
                          onChange={e => setFormData({...formData, state: e.target.value})} 
                          className={selectClass}
                        >
                          {Object.entries(STATES).map(([uf, name]) => (
                            <option key={uf} value={uf} className={optionClass}>{name} ({uf})</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           <Scale size={14} className="text-brand-primary" /> Anexo de Tributação
                        </label>
                        <select 
                          value={formData.annex} 
                          onChange={e => setFormData({...formData, annex: e.target.value})} 
                          className={selectClass}
                        >
                          <option value="III" className={optionClass}>Anexo III (Serviços - 6%)</option>
                          <option value="IV" className={optionClass}>Anexo IV (Advocacia/Construção - 4,5% + 20%)</option>
                          <option value="V" className={optionClass}>Anexo V (Digital/Tech - Estratégia 6%)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           <Users size={14} className="text-brand-primary" /> Qtd. Funcionários
                        </label>
                        <input 
                          type="number" 
                          min="0"
                          value={formData.employeeCount} 
                          onChange={e => setFormData({...formData, employeeCount: Number(e.target.value)})} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Endereço Fiscal (Sede Virtual)?</label>
                        <select 
                          value={formData.hasFiscalAddress} 
                          onChange={e => setFormData({...formData, hasFiscalAddress: e.target.value})} 
                          className={selectClass}
                        >
                          <option value="nao" className={optionClass}>Não</option>
                          <option value="sim" className={optionClass}>Sim</option>
                        </select>
                      </div>

                      {formData.serviceType === 'Abertura/Alteração' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                             <FileKey size={14} className="text-brand-primary" /> Certificado Digital?
                          </label>
                          <select 
                            value={formData.needsCertificate} 
                            onChange={e => setFormData({...formData, needsCertificate: e.target.value})} 
                            className={selectClass}
                          >
                            <option value="sim" className={optionClass}>Sim</option>
                            <option value="nao" className={optionClass}>Não (Já possuo)</option>
                          </select>
                        </div>
                      )}
                   </div>

                   {formData.hasFiscalAddress === 'sim' && (
                     <div className="pt-4 animate-fade-in-up">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                           <Wallet size={14} className="text-emerald-500" /> Valor Anual Sede Virtual (R$)
                        </label>
                        <input 
                          type="number" 
                          value={formData.fiscalAddressValue} 
                          onChange={e => setFormData({...formData, fiscalAddressValue: Number(e.target.value)})} 
                          className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-white text-sm font-bold"
                        />
                     </div>
                   )}
                 </>
               )}

               <div className="pt-6 border-t border-white/5">
                  <button 
                    onClick={handleCopy}
                    className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    {copied ? <Check size={20} /> : <MessageSquare size={20} />}
                    {copied ? 'Copiado!' : 'Copiar para WhatsApp'}
                  </button>
               </div>
            </div>
          </div>

          {/* LADO DIREITO: PREVIEW */}
          <div className="lg:col-span-6 h-full">
            <div className="bg-[#161d2b] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl h-full flex flex-col">
               <div className="bg-[#0b141a] p-5 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                    <div>
                        <p className="text-white font-bold text-xs">Preview da Proposta</p>
                        <p className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Contabilin 360º</p>
                    </div>
                  </div>
                  <Sparkles className="text-brand-primary/50" size={18} />
               </div>
               
               <div className="p-6 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                  <div className="bg-[#dcf8c6] text-[#075e54] rounded-2xl p-6 whitespace-pre-wrap font-sans text-xs md:text-sm shadow-inner leading-relaxed">
                    {whatsappMessage}
                  </div>
               </div>

               <div className="p-4 bg-[#0b141a] border-t border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-widest text-center">
                  Inteligência Comercial Ativada
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProposalPage;
