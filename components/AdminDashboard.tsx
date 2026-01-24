
import React, { useState, startTransition } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, FileText, Settings, LogOut, DollarSign, 
  MessageSquare, Users, Sparkles, Megaphone, Globe, Code, ScrollText, Share2
} from 'lucide-react';

// Sub-componentes isolados para cada funcionalidade do Admin
import MetricsTab from './Admin/MetricsTab';
import BlogTab from './Admin/BlogTab';
import MarketingTab from './Admin/MarketingTab';
import CommercialTab from './Admin/CommercialTab';
import SocialTab from './Admin/SocialTab';
import TeamTab from './Admin/TeamTab';
import IntelligenceTab from './Admin/IntelligenceTab';
import SystemTab from './Admin/SystemTab';
import SalesTab from './Admin/SalesTab';
import ProposalPage from './Tools/ProposalPage';

type Tab = 'metrics' | 'blog' | 'proposals' | 'sales' | 'marketing' | 'commercial' | 'social' | 'team' | 'intelligence' | 'system';

const AdminDashboard: React.FC = () => {
  const { setIsAdminAuthenticated, setCurrentPage, waConfig } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('metrics');

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const navItems = [
    { id: 'metrics', label: 'Métricas', icon: <LayoutDashboard size={18} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
    { id: 'proposals', label: 'Propostas', icon: <ScrollText size={18} /> },
    { id: 'sales', label: 'Vendas', icon: <Share2 size={18} /> },
    { id: 'marketing', label: 'Mkt', icon: <Megaphone size={18} /> },
    { id: 'commercial', label: 'Preços', icon: <DollarSign size={18} /> },
    { id: 'social', label: 'Canais', icon: <MessageSquare size={18} /> },
    { id: 'team', label: 'Sócios', icon: <Users size={18} /> },
    { id: 'intelligence', label: 'IA', icon: <Sparkles size={18} /> },
    { id: 'system', label: 'Sist.', icon: <Settings size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row">
      {/* Sidebar Desktop / Header Mobile */}
      <aside className="w-full md:w-64 bg-[#0f172a] border-b md:border-b-0 md:border-r border-white/5 flex flex-col h-auto md:h-screen md:sticky md:top-0 z-30">
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg">
              <Code className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white">Contabilin <span className="text-brand-primary">Admin</span></h1>
          </div>
          <div className="flex md:hidden gap-2">
             <button onClick={() => setCurrentPage('home')} className="p-2 text-gray-400 hover:text-white"><Globe size={20} /></button>
             <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-300"><LogOut size={20} /></button>
          </div>
        </div>
        
        {/* Navegação: Horizontal no Mobile, Vertical no Desktop */}
        <nav className="flex md:flex-col overflow-x-auto md:overflow-y-auto scrollbar-hide p-2 md:p-4 gap-1 md:space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => startTransition(() => setActiveTab(item.id as Tab))}
              className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all text-xs md:text-sm font-bold whitespace-nowrap ${
                activeTab === item.id 
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              {item.icon} <span className="md:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Sidebar Desktop Only */}
        <div className="hidden md:block p-4 border-t border-white/5 space-y-2 mt-auto">
          <button onClick={() => setCurrentPage('home')} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
            <Globe size={16} /> Ver Site
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Adaptativa */}
      <main className="flex-1 p-4 md:p-10 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'metrics' && <MetricsTab />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'proposals' && (
            <div className="animate-fadeIn">
               <ProposalPage 
                onBack={() => setActiveTab('metrics')} 
                onWhatsAppClick={(msg) => window.open(`https://wa.me/${waConfig.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank')} 
                isEmbedded={true} 
              />
            </div>
          )}
          {activeTab === 'sales' && <SalesTab />}
          {activeTab === 'marketing' && <MarketingTab />}
          {activeTab === 'commercial' && <CommercialTab />}
          {activeTab === 'social' && <SocialTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'intelligence' && <IntelligenceTab />}
          {activeTab === 'system' && <SystemTab />}
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
