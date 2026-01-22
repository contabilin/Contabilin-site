import React from 'react';
import { SectionId } from '../types';
import { ExternalLink, Gift, FileKey, MapPin } from 'lucide-react';

const partners = [
    {
        name: "Cora",
        desc: "Banco PJ Gratuito & Boletos",
        link: "https://lp.cora.com.br/coraliados/?code=contabilin-assessoria-empresarial&n=CONTABILIN%20CONTABILIDADE%20INTELIGENTE",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        letter: "C"
    },
    {
        name: "Asaas",
        desc: "Gestão Financeira Completa",
        link: "https://www.asaas.com/r/7a9fb1f3-5345-4a2c-8fcc-34b263249380",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        letter: "A"
    },
    {
        name: "Spedy",
        desc: "Automação de Notas Fiscais",
        link: "https://spedy.com.br/?ref=kzSulS0g",
        color: "text-green-500",
        bg: "bg-green-500/10",
        letter: "S"
    },
    {
        name: "Certificado Digital",
        desc: "Emissão com desconto exclusivo",
        link: "https://wa.me/5547989165863?text=Olá! Tenho interesse no desconto para emissão do Certificado Digital.",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        icon: <FileKey className="w-6 h-6" />
    },
    {
        name: "Endereço Fiscal",
        desc: "Sede Virtual para sua empresa",
        link: "https://wa.me/5547989165863?text=Olá! Gostaria de saber mais sobre a Sede Virtual (Endereço Fiscal).",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        icon: <MapPin className="w-6 h-6" />
    }
]

const Partners: React.FC = () => {
  return (
    <section id={SectionId.PARTNERS} className="py-20 bg-[#0B1120] border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
                <Gift className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">Vantagens Exclusivas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Clube de Benefícios Contabilin</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Clientes Contabilin têm acesso a descontos e condições especiais em ferramentas essenciais para o seu negócio.
            </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {partners.map((partner, idx) => (
                <a 
                    key={idx}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 rounded-2xl bg-[#1e293b]/50 border border-white/5 hover:bg-[#1e293b] hover:border-brand-primary/30 transition-all group hover:-translate-y-1 w-full md:w-[calc(33.333%-16px)] min-w-[300px]"
                >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl ${partner.bg} ${partner.color} shrink-0`}>
                        {partner.icon ? partner.icon : partner.letter}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                            {partner.name}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">{partner.desc}</p>
                    </div>
                </a>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;