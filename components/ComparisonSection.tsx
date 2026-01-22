
import React from 'react';
import { User, Building2, TrendingDown, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">A matemática que o governo não te conta</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Veja por que continuar no CPF ou em uma contabilidade tradicional está drenando o seu lucro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Lado Negativo: CPF / Autônomo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-[#1e293b]/20 border border-red-500/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Como Autônomo (CPF)</h3>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Até 27,5% de Imposto</p>
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <TrendingDown className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Leão voraz</p>
                    <p className="text-gray-500 text-xs">O Imposto de Renda consome quase 1/3 do seu faturamento bruto.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Risco de Malha Fina</p>
                    <p className="text-gray-500 text-xs">Dificuldade em comprovar despesas e alta chance de fiscalização.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Insegurança Jurídica</p>
                    <p className="text-gray-500 text-xs">Seu patrimônio pessoal está exposto a riscos do negócio.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Lado Positivo: Contabilin PJ */}
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full opacity-100"></div>
            <div className="relative bg-[#1e293b]/40 border border-brand-primary/30 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl shadow-brand-primary/10 ring-2 ring-brand-primary/20 scale-105">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Estratégia Contabilin (PJ)</h3>
                  <p className="text-brand-primary text-xs font-bold uppercase tracking-widest">Otimização Fiscal Customizada</p>
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <TrendingUp className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Planejamento Tributário Sob Medida</p>
                    <p className="text-gray-400 text-xs">Analisamos seu CNAE e faturamento para reduzir legalmente sua carga tributária ao mínimo.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Lucro Isento e Seguro</p>
                    <p className="text-gray-400 text-xs">Distribua dividendos para sua conta pessoal com zero imposto adicional.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm">Blindagem Patrimonial</p>
                    <p className="text-gray-400 text-xs">Separação jurídica total entre seu negócio e seus bens pessoais.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 pt-8 border-t border-white/10 flex justify-center">
                <div className="bg-green-500/10 text-green-400 px-6 py-2 rounded-full text-sm font-bold animate-pulse">
                  Economia média de R$ 3.500/mês
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
