import React from 'react';
import { SectionId } from '../types';
import { UserPlus, FileSearch, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "Cadastro Simples",
    desc: "Preencha o formulário e fale com nosso time. Entendemos seu modelo de negócio."
  },
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: "Diagnóstico",
    desc: "Analisamos se vale mais a pena ser MEI, Simples Nacional ou Lucro Presumido."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Regularização",
    desc: "Cuidamos de toda burocracia: CNPJ, Alvará e Certificado Digital."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Decolagem",
    desc: "Sua empresa 100% legalizada e você acessa nossa plataforma de gestão."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id={SectionId.HOW_IT_WORKS} className="py-24 bg-[#0B1120] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Como funciona?</h2>
          <p className="text-gray-400">Em 4 passos simples você regulariza seu negócio digital.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 hover:border-brand-primary/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-lg group-hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 right-6 text-4xl font-bold text-white/5 select-none">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;