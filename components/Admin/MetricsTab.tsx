
import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, RefreshCw, MessageSquare, TrendingUp, Eye, FileText, MousePointer2, UserCheck, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

const MetricsTab: React.FC = () => {
  const { siteStats, resetStats, posts } = useApp();
  const { wa, sectionClicks, articleViews, totalViews, leads } = siteStats;

  const sortedArticles = Object.entries(articleViews || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([id, views]) => ({ post: posts.find(p => p.id === id), views: Number(views) }))
    .filter(item => item.post);

  const sortedSections = Object.entries(sectionClicks || {})
    .sort(([, a], [, b]) => (b as number) - (a as number));

  const maxViews = sortedArticles[0]?.views || 1;
  const maxClicks = Number(sortedSections[0]?.[1]) || 1;

  return (
    <div className="space-y-8 md:space-y-10 animate-fadeIn pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
            <BarChart3 className="text-brand-primary" size={28} /> Performance
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Dados reais do seu ecossistema digital.</p>
        </div>
        <button onClick={() => confirm('Zerar dados?') && resetStats()} className="w-full sm:w-auto bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <RefreshCw size={14} /> Zerar Dados
        </button>
      </div>

      {/* Grid de Stats Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={<MessageSquare />} label="Leads Whats" value={wa.total} color="text-brand-primary" />
        <StatCard icon={<TrendingUp />} label="Simulações" value={wa.byOrigin.simulator} color="text-emerald-400" />
        <StatCard icon={<Eye />} label="Total Views" value={totalViews} color="text-brand-accent" />
        <StatCard icon={<UserCheck />} label="Leads Blog" value={leads?.length || 0} color="text-violet-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-[#0f172a] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 p-6 md:p-8 space-y-6">
          <h3 className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <FileText className="text-brand-primary" size={16} /> Posts Populares
          </h3>
          <div className="space-y-4">
            {sortedArticles.slice(0, 5).map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] md:text-xs">
                  <span className="text-gray-300 font-bold truncate max-w-[70%]">{item.post?.title}</span>
                  <span className="text-brand-primary font-black">{item.views}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary transition-all duration-1000" style={{ width: `${(item.views / maxViews) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 p-6 md:p-8 space-y-6">
          <h3 className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <MousePointer2 className="text-brand-accent" size={16} /> Calor por Seção
          </h3>
          <div className="space-y-4">
            {sortedSections.slice(0, 5).map(([section, clicks], idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] md:text-xs">
                  <span className="text-gray-300 font-bold uppercase tracking-tighter">{section}</span>
                  <span className="text-brand-accent font-black">{clicks}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent transition-all duration-1000" style={{ width: `${(Number(clicks) / maxClicks) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de Leads com Scroll Lateral no Mobile */}
      <div className="bg-[#0f172a] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                <MessageCircle className="text-brand-primary" size={18} /> Leads Capturados
              </h3>
              <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[9px] font-black uppercase">
                {leads?.length || 0} Total
              </span>
          </div>
          <div className="overflow-x-auto">
            {leads && leads.length > 0 ? (
                <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-white/[0.02] text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="p-6">WhatsApp</th>
                            <th className="p-6">Origem</th>
                            <th className="p-6">Data</th>
                            <th className="p-6 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {leads.map((lead, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-6 text-white font-bold">{lead.whatsapp}</td>
                                <td className="p-6 text-gray-400 text-xs truncate max-w-[200px]">{lead.origin}</td>
                                <td className="p-6 text-gray-500 text-[11px] flex items-center gap-2">
                                    <Calendar size={12} /> {lead.date}
                                </td>
                                <td className="p-6 text-right">
                                    <a 
                                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} 
                                      target="_blank" 
                                      className="text-brand-primary hover:text-white transition-colors text-[10px] font-black uppercase flex items-center justify-end gap-1"
                                    >
                                        Chamar <ArrowRight size={12} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="p-12 text-center">
                    <MessageSquare size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Aguardando primeiros contatos...</p>
                </div>
            )}
          </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-[#1e293b]/50 p-6 md:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
       {React.cloneElement(icon, { size: 48 })}
    </div>
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-white font-black text-4xl md:text-5xl tracking-tighter">{value}</p>
  </div>
);

export default MetricsTab;
