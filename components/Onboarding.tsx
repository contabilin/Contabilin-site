
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  Target, 
  Users, 
  Zap, 
  Building2, 
  Store, 
  MessageCircle,
  Mail,
  User,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Page } from '../types';

interface OnboardingProps {
  onNavigate: (page: Page) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profile: '',
    stage: '',
    revenue: '',
    name: '',
    email: '',
    whatsapp: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(nextStep, 300);
  };

  const isFormValid = formData.name.trim().length >= 3 && 
                     formData.email.includes('@') && 
                     formData.whatsapp.trim().length >= 10;

  const handleFinish = () => {
    const message = `Olá Contabilin! Completei meu diagnóstico no site.
    
📌 *Resumo do Negócio:*
- Perfil: ${formData.profile}
- Momento: ${formData.stage}
- Faturamento: ${formData.revenue}

👤 *Contato:*
- Nome: ${formData.name}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}

Quero uma proposta personalizada!`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5547989165863?text=${encoded}`, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in-up space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                  <Sparkles className="w-3 h-3 text-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Passo 01/04</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">O que você faz?</h2>
                <p className="text-gray-400">Escolha o nicho que melhor descreve sua atividade digital.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'Infoprodutor', icon: <Rocket size={24} />, desc: 'Cursos, eBooks, Mentorias' },
                { id: 'Prestador de Serviço', icon: <Target size={24} />, desc: 'Devs, Gestores, Copy' },
                { id: 'Afiliado', icon: <Users size={24} />, desc: 'Venda de produtos de terceiros' },
                { id: 'Agência', icon: <Building2 size={24} />, desc: 'Lançamentos e Marketing' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect('profile', item.id)}
                  className={`p-6 rounded-3xl border text-left transition-all group relative overflow-hidden ${formData.profile === item.id ? 'bg-brand-primary border-brand-primary shadow-2xl shadow-brand-primary/20 scale-[1.02]' : 'bg-white/5 border-white/5 hover:border-brand-primary/30 hover:bg-white/10'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${formData.profile === item.id ? 'bg-white text-brand-primary' : 'bg-brand-primary/10 text-brand-primary group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white text-lg">{item.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in-up space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                  <Sparkles className="w-3 h-3 text-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Passo 02/04</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">Qual sua situação?</h2>
                <p className="text-gray-400">Diga-nos se é um novo negócio ou se quer trocar de contador.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'Vou abrir meu primeiro CNPJ', icon: <Zap size={24} />, desc: 'Faturamento acima de R$ 5k e ainda sou CPF' },
                { id: 'Já tenho empresa e quero migrar', icon: <Building2 size={24} />, desc: 'Minha contabilidade atual não entende o digital' },
                { id: 'Sou MEI e quero virar ME', icon: <Store size={24} />, desc: 'Estou estourando o limite de R$ 81k/ano' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect('stage', item.id)}
                  className={`p-6 rounded-3xl border flex items-center gap-6 transition-all group ${formData.stage === item.id ? 'bg-brand-primary border-brand-primary' : 'bg-white/5 border-white/5 hover:border-brand-primary/30 hover:bg-white/10'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${formData.stage === item.id ? 'bg-white text-brand-primary' : 'bg-brand-primary/10 text-brand-primary'}`}>
                    {item.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-white text-lg">{item.id}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <ChevronRight className={`transition-transform ${formData.stage === item.id ? 'text-white translate-x-1' : 'text-gray-700'}`} />
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in-up space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                  <Sparkles className="w-3 h-3 text-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Passo 03/04</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">Quanto você fatura?</h2>
                <p className="text-gray-400">Essa informação é vital para escolhermos o melhor Anexo fiscal.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
              {[
                'Até R$ 15.000 / mês',
                'De R$ 15k a R$ 40k / mês',
                'De R$ 40k a R$ 100k / mês',
                'Acima de R$ 100k / mês'
              ].map(tier => (
                <button
                  key={tier}
                  onClick={() => handleSelect('revenue', tier)}
                  className={`p-6 rounded-2xl border text-center font-bold text-lg transition-all ${formData.revenue === tier ? 'bg-brand-primary border-brand-primary text-white scale-[1.05]' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-brand-primary/50'}`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in-up space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                  <Sparkles className="w-3 h-3 text-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Passo 04/04</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">Último passo.</h2>
                <p className="text-gray-400">Onde enviamos sua análise personalizada?</p>
            </div>
            <div className="space-y-4 max-w-md mx-auto bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="E-mail profissional"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <div className="relative">
                <MessageCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input 
                  type="tel" 
                  placeholder="WhatsApp (DDD + Número)"
                  value={formData.whatsapp}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              
              <div className="flex gap-3 px-2 py-4">
                <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" />
                <p className="text-[10px] text-gray-600 leading-tight">
                  Seus dados estão seguros e serão utilizados exclusivamente para a análise do seu negócio digital, conforme a LGPD.
                </p>
              </div>

              <button 
                onClick={handleFinish}
                disabled={!isFormValid}
                className="w-full bg-brand-primary hover:bg-violet-600 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-2xl shadow-brand-primary/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 mt-6"
              >
                Gerar minha Proposta <ArrowRight size={22} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col relative overflow-hidden">
      {/* React 19 Metadata Hoisting */}
      <title>Diagnóstico Fiscal | Contabilin</title>
      <meta name="description" content="Descubra a melhor forma de tributar seu negócio digital em 4 passos." />

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header fixo do Onboarding */}
      <div className="max-w-4xl mx-auto px-4 w-full pt-12 md:pt-20">
        <div className="flex justify-between items-center mb-10">
           <button 
              onClick={() => currentStep === 1 ? onNavigate('home') : prevStep()} 
              className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors group"
           >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              {currentStep === 1 ? 'Voltar para o site' : 'Voltar'}
           </button>
           <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${s <= currentStep ? 'bg-brand-primary w-8' : 'bg-white/10 w-2'}`}
                />
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 w-full flex-1 flex flex-col justify-center pb-20">
        {renderStep()}
      </div>

      {/* Footer do Onboarding */}
      <div className="max-w-4xl mx-auto px-4 w-full py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-40 grayscale">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-5 h-5 text-green-500" />
             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Conexão 256-bit SSL</p>
          </div>
          <div className="flex items-center gap-3">
             <Smartphone className="w-5 h-5 text-brand-primary" />
             <p className="text-[10px] font-bold text-white uppercase tracking-widest">Otimizado para Mobile</p>
          </div>
      </div>
    </div>
  );
};

export default Onboarding;
