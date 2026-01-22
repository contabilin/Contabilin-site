import React from 'react';
import { SectionId } from '../types';
import { Wallet, PieChart, ArrowLeftRight, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const bpoFeatures = [
  {
    icon: <ArrowLeftRight className="w-6 h-6 text-brand-primary" />,
    title: "Conciliação Bancária Diária",
    desc: "Conferimos cada centavo que entra e sai. Seu saldo bancário sempre batendo com o sistema."
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-brand-accent" />,
    title: "Agendamento de Pagamentos",
    desc: "Nós lançamos no banco, você apenas aprova pelo app ou WhatsApp. Zero burocracia."
  },
  {
    icon: <Wallet className="w-6 h-6 text-green-400" />,
    title: "Gestão de Contas a Pagar/Receber",
    desc: "Controle total de inadimplência e fornecedores. Nunca mais pague juros por esquecimento."
  },
  {
    icon: <PieChart className="w-6 h-6 text-purple-400" />,
    title: "Relatórios de Fluxo de Caixa",
    desc: "Saiba exatamente o lucro da sua operação digital com relatórios DRE simples e visuais."
  }
];

const BPOSection: React.FC = () => {
  return (
    <section id={SectionId.BPO} className="py-24 bg-[#0f172a] relative overflow-hidden border-t border-white/5">
        {/* Background blobs similar to Hero but subtler */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">Terceirização Financeira</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Liberte-se das planilhas e foque em <span className="text-brand-primary">vender</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Com o <strong>BPO Financeiro</strong> da Contabilin, nós assumimos o departamento financeiro da sua empresa digital. Você não precisa contratar funcionário, nós fazemos a gestão profissional das suas finanças.
                    </p>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                            <span className="text-gray-300">Recuperação de tempo livre para o sócio</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                            <span className="text-gray-300">Aprovações de pagamento via WhatsApp</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                            <span className="text-gray-300">Custo menor que um funcionário CLT</span>
                        </div>
                    </div>

                    <button className="bg-white text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 flex items-center gap-2 group">
                        Quero terceirizar meu financeiro
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {bpoFeatures.map((feature, idx) => (
                        <div key={idx} className="bg-[#1e293b]/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-[#1e293b] hover:border-brand-primary/30 transition-all duration-300 group">
                            <div className="bg-[#020617] w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};

export default BPOSection;