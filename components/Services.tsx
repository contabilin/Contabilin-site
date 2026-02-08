
import React from 'react';
import { SectionId } from '../types';
import { BookOpen, Youtube, Code2, Briefcase, MousePointer2, Smartphone, Scale, HeartPulse, Building2, UserCheck, Laptop, Rocket } from 'lucide-react';

const Services: React.FC = () => {
    return (
        <section id={SectionId.SERVICES} className="py-24 bg-brand-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Feito para quem vende serviços</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        Nós cuidamos da burocracia para que você foque na entrega do seu trabalho intelectual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Bloco 1: Profissionais Liberais */}
                    <div className="bg-[#1e293b]/30 border border-white/5 p-6 md:p-8 rounded-3xl hover:border-brand-primary/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <UserCheck className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Profissionais Liberais</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Advogados, Médicos, Engenheiros e Arquitetos. Regularizamos seu faturamento com o menor impacto tributário possível.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs text-gray-500"><Scale className="w-3 h-3" /> Defesa Fiscal</li>
                            <li className="flex items-center gap-2 text-xs text-gray-500"><Building2 className="w-3 h-3" /> Registro em Conselhos</li>
                        </ul>
                    </div>

                    {/* Bloco 2: Consultoria e Tecnologia */}
                    <div className="bg-[#1e293b]/30 border border-white/5 p-6 md:p-8 rounded-3xl hover:border-brand-accent/50 transition-all group border-b-4 border-b-brand-accent">
                        <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Laptop className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Consultoria & Tech</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Desenvolvedores, TI, Gestores e Consultores. Especialistas em Fator R para você pagar apenas 6% de imposto.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs text-gray-500"><Code2 className="w-3 h-3" /> Exportação de Serviços</li>
                            <li className="flex items-center gap-2 text-xs text-gray-500"><Briefcase className="w-3 h-3" /> Planejamento Fator R</li>
                        </ul>
                    </div>

                    {/* Bloco 3: Negócios Digitais */}
                    <div className="bg-[#1e293b]/30 border border-white/5 p-6 md:p-8 rounded-3xl hover:border-brand-primary/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Rocket className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Negócios Digitais</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Agências de Marketing, Infoprodutores e Afiliados. Emissão automática de notas e split de pagamentos.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs text-gray-500"><Smartphone className="w-3 h-3" /> Integração Hotmart/Kiwify</li>
                            <li className="flex items-center gap-2 text-xs text-gray-500"><MousePointer2 className="w-3 h-3" /> Gestão de Coprodutores</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
