
import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, RefreshCw, MessageSquare, TrendingUp, Eye, FileText, MousePointer2 } from 'lucide-react';

const MetricsTab: React.FC = () => {
  const { siteStats, resetStats, posts } = useApp();
  const { wa, sectionClicks, articleViews, totalViews } = siteStats;

  const sortedArticles = Object.entries(articleViews || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([id, views]) => ({ post: posts.find(p => p.id === id), views: Number(views) }))
    .filter(item => item.post);

  const sortedSections = Object.entries(sectionClicks || {})
    .sort(([, a], [, b]) => (b as number) - (a as number));

  const maxViews = sortedArticles[0]?.views || 1;
  const maxClicks = Number(sortedSections[0]?.[1]) || 1;

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
            <BarChart3 className="text-brand-primary" size={32} /> Painel de Performance
          </h2>
          <p className="text-gray-500 mt-1">Dados reais de engajamento do seu ecossistema fiscal.</p>
        </div>
        <button onClick={() => confirm('Zerar dados?') && resetStats()} className="bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-bold uppercase flex items-center gap-2">
          <RefreshCw size={14} /> Limpar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<MessageSquare />} label="Leads WhatsApp" value={wa.total} color="text-brand-primary" />
        <StatCard icon={<TrendingUp />} label="Simulações" value={wa.byOrigin.simulator} color="text-emerald-400" />
        <StatCard icon={<Eye />} label="Visualizações" value={totalViews} color="text-brand-accent" />
        <StatCard icon={<FileText />} label="Artigos" value={posts.length} color="text-violet-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0f172a] rounded-[2.5rem] border border-white/10 p-8 space-y-6">
          <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <FileText className="text-brand-primary" size={16} /> Artigos mais lidos
          </h3>
          <div className="space-y-4">
            {sortedArticles.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-bold truncate max-w-[70%]">{item.post?.title}</span>
                  <span className="text-brand-primary font-black">{item.views} views</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary transition-all duration-1000" style={{ width: `${(item.views / maxViews) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-[2.5rem] border border-white/10 p-8 space-y-6">
          <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <MousePointer2 className="text-brand-accent" size={16} /> Cliques por Seção
          </h3>
          <div className="space-y-4">
            {sortedSections.map(([section, clicks], idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-bold uppercase tracking-tighter">{section}</span>
                  <span className="text-brand-accent font-black">{clicks} cliques</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent transition-all duration-1000" style={{ width: `${(Number(clicks) / maxClicks) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-[#1e293b]/50 p-8 rounded-[2rem] border border-white/5">
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-white font-black text-5xl">{value}</p>
  </div>
);

export default MetricsTab;
