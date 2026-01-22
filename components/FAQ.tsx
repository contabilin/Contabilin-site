import React, { useState } from 'react';
import { SectionId } from '../types';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Preciso de endereço físico para abrir minha empresa?",
    a: "Não! Na Contabilin temos parcerias com as maiores sedes virtuais do Brasil. Você consegue contratar um endereço fiscal com descontos exclusivos para nossos clientes, eliminando a necessidade de alugar uma sala comercial."
  },
  {
    q: "Atendem todo o Brasil?",
    a: "Sim, somos uma contabilidade 100% digital. Atendemos empreendedores de todos os estados do Brasil com a mesma agilidade via WhatsApp e App 360º."
  },
  {
    q: "Sou MEI, posso migrar para a Contabilin?",
    a: "Com certeza. Se você está faturando próximo do limite ou precisa emitir mais notas, fazemos o desenquadramento de MEI para ME (Microempresa) de forma rápida."
  },
  {
    q: "Como funciona a emissão de notas fiscais?",
    a: "Somos parceiros de um sistema líder de mercado que se integra às principais plataformas (Hotmart, Kiwify, etc.) para emitir notas automaticamente a cada venda."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={SectionId.FAQ} className="py-24 bg-brand-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Dúvidas Frequentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-xl bg-[#1e293b]/30 overflow-hidden transition-all">
              <button 
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white">{faq.q}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-brand-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <div className={`px-6 text-gray-400 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;