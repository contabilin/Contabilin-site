
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { 
  Search, ShieldCheck, Zap, Bell, CheckCircle2, 
  ArrowUpRight, Info, AlertTriangle, FileText,
  BarChart3, LayoutGrid, Building, MessageSquare
} from 'lucide-react';

const DashboardPreview: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id={SectionId.DASHBOARD} className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                    <Zap className="w-3 h-3 text-brand-primary fill-brand-primary" />
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Exclusivo Contabilin</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                    Sua empresa no <span className="text-brand-primary">Piloto Automático.</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Monitoramento 24h direto na base da Receita Federal. Você dorme tranquilo enquanto nós cuidamos da conformidade.
                </p>
            </div>

            {/* O "Checkup 360" Mockup */}
            <div className="relative group max-w-6xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                
                {/* Main Interface Container */}
                <div className="bg-[#0b0f1a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden p-4 md:p-8 flex flex-col gap-6">
                    
                    {/* Header: Empresa info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161d2b] p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-white/10">
                                <Building className="text-gray-400 w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide">CONTABILIN CONTABILIDADE INTELIGENTE LTDA</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-gray-500 text-[10px] font-mono">50.912.768/0001-00</span>
                                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase">SN</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Empresa Regular</span>
                             </div>
                        </div>
                    </div>

                    {/* Dashboard Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Coluna 01 */}
                        <div className="space-y-6">
                            {/* Card PGDAS */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <div className="flex justify-between items-center mb-6">
                                    <h5 className="text-white font-black text-[10px] uppercase tracking-widest">PGDAS</h5>
                                    <button className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md"><Search size={14} /></button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Última declaração</span>
                                        <span className="text-white font-medium">12/2025</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                        <span className="text-gray-400 text-xs">Pagamento</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">Em dia</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Limite */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">Sublimite e Limite</h5>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter mb-1">
                                        <span>RBT12</span>
                                        <span className="text-brand-primary">Receita</span>
                                    </div>
                                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div 
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-gray-500 font-bold">
                                        <span>R$ 0</span>
                                        <span>R$ 4.8 Mi</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-emerald-400 font-black text-xl">{progress}%</span>
                                        <p className="text-[9px] text-gray-600 uppercase mt-1">Utilizado do Limite Anual</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Faturamento */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">Análise de Faturamento</h5>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Receita Mensal</span>
                                        <span className="text-emerald-400 font-bold">R$ 22.001,19</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Receita Acumulada</span>
                                        <span className="text-white font-bold">R$ 138.696,20</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coluna 02 */}
                        <div className="space-y-6">
                            {/* Card DCTFWeb */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <div className="flex justify-between items-center mb-6">
                                    <h5 className="text-white font-black text-[10px] uppercase tracking-widest">DCTFWeb</h5>
                                    <button className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md"><Search size={14} /></button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-bold text-xs">Pagamento</span>
                                    <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">Em dia</span>
                                </div>
                            </div>

                            {/* Parcelamentos */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5 h-32 flex flex-col justify-center items-center text-center">
                                <h5 className="text-white font-black text-[10px] uppercase tracking-widest self-start mb-auto">Parcelamentos</h5>
                                <div className="bg-white/5 p-3 rounded-xl border border-dashed border-white/10 w-full">
                                    <p className="text-[10px] text-gray-500 italic">Sem dados para reportar</p>
                                </div>
                            </div>

                            {/* e-CAC Messages */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <div className="flex justify-between items-center mb-6">
                                    <h5 className="text-white font-black text-[10px] uppercase tracking-widest">Mensagens e-CAC</h5>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-gray-600 font-bold uppercase">17/01/2026</span>
                                        <button className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md"><Search size={14} /></button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Malha Fiscal', status: 'Regular' },
                                        { label: 'Termo de Exclusão', status: 'Regular' },
                                        { label: 'PRONAMPE', status: 'Regular' },
                                        { label: 'Termo de Intimação', status: 'Regular' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                            <span className="text-gray-400 text-[11px] font-medium">{item.label}</span>
                                            <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">{item.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Coluna 03 */}
                        <div className="space-y-6">
                            {/* Relatório Fiscal - O Checklist */}
                            <div className="bg-[#161d2b] rounded-2xl border border-white/5 p-5">
                                <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">Relatório Fiscal</h5>
                                <div className="space-y-3">
                                    {[
                                        'Diagnóstico fiscal', 'PGDAS', 'DASN', 'DCTF', 'DCTFWeb', 'DIRF', 'ECF', 'EFD', 'Exigibilidade Geral'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                                            <span className="text-gray-400 text-[11px] font-medium">{item}</span>
                                            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/10">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                                <span className="text-emerald-400 text-[8px] font-black uppercase">Regular</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Botão de Ação Rápida */}
                            <button className="w-full bg-brand-primary hover:bg-violet-600 text-white p-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-primary/10 flex items-center justify-center gap-3 group">
                                <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Blindar minha Empresa
                            </button>
                        </div>

                    </div>

                </div>

                {/* Floating WhatsApp Action inside Dashboard */}
                <div className="absolute -bottom-6 -right-6 md:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl animate-float-slow z-20 cursor-pointer hover:scale-110 transition-transform">
                     <MessageSquare className="w-6 h-6 fill-white" />
                </div>
            </div>
        </div>

        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float-slow {
            animation: float-slow 4s ease-in-out infinite;
          }
        `}</style>
    </section>
  );
};

export default DashboardPreview;
