
import React, { useState, startTransition } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, FileText, Settings, LogOut, Plus, DollarSign, 
  MessageSquare, Users, Sparkles, Megaphone, Globe, Code
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

type Tab = 'metrics' | 'blog' | 'marketing' | 'commercial' | 'social' | 'team' | 'intelligence' | 'system';

const AdminDashboard: React.FC = () => {
  const { setIsAdminAuthenticated, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('metrics');

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const navItems = [
    { id: 'metrics', label: 'Métricas', icon: <LayoutDashboard size={20} /> },
    { id: 'blog', label: 'Blog & IA', icon: <FileText size={20} /> },
    { id: 'marketing', label: 'Marketing', icon: <Megaphone size={20} /> },
    { id: 'commercial', label: 'Comercial', icon: <DollarSign size={20} /> },
    { id: 'social', label: 'Canais', icon: <MessageSquare size={20} /> },
    { id: 'team', label: 'Sócios', icon: <Users size={20} /> },
    { id: 'intelligence', label: 'Cérebro IA', icon: <Sparkles size={20} /> },
    { id: 'system', label: 'Sistema', icon: <Settings size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row">
      {/* Sidebar Isolada */}
      <aside className="w-full md:w-64 bg-[#0f172a] border-r border-white/5 flex flex-col h-auto md:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg">
            <Code className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white">Contabilin <span className="text-brand-primary">Admin</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => startTransition(() => setActiveTab(item.id as Tab))}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === item.id ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button onClick={() => setCurrentPage('home')} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <Globe size={16} /> Ver Site
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Isolada */}
      <main className="flex-1 p-4 md:p-10 min-h-screen overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'metrics' && <MetricsTab />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'marketing' && <MarketingTab />}
          {activeTab === 'commercial' && <CommercialTab />}
          {activeTab === 'social' && <SocialTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'intelligence' && <IntelligenceTab />}
          {activeTab === 'system' && <SystemTab />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
