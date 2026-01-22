import React from 'react';
import { SectionId } from '../types';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Desenvolvedor PJ",
    text: "Trabalho para o exterior e não sabia como receber e declarar. A Contabilin resolveu tudo e ainda pago menos imposto legalmente."
  },
  {
    name: "Fernanda Souza",
    role: "Infoprodutora",
    text: "O atendimento é surreal. Eles entendem o que é Hotmart, Kiwify e split de notas. Não preciso explicar o básico, eles já sabem."
  },
  {
    name: "Agência V4 Scale",
    role: "Gestão de Tráfego",
    text: "Trocamos de contador 3 vezes até achar a Contabilin. A plataforma deles facilita muito a emissão de notas para nossos clientes."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id={SectionId.TESTIMONIALS} className="py-24 bg-[#0B1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quem usa, recomenda</h2>
          <p className="text-gray-400">Junte-se a centenas de prestadores de serviços e infoprodutores que confiam na Contabilin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl relative">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                  <p className="text-brand-primary text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;