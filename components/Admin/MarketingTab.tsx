
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Gift, Save, Loader2, Upload, File, CheckCircle2 } from 'lucide-react';

const MarketingTab: React.FC = () => {
  const { leadMagnetConfig, setLeadMagnetConfig } = useApp();
  const [tempConfig, setTempConfig] = useState(leadMagnetConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setLeadMagnetConfig(tempConfig);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Megaphone className="text-brand-primary" /> Marketing & Conversão
        </h2>
        {showSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20">
            <CheckCircle2 size={16} /> Salvo com sucesso!
          </div>
        )}
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-8">
        <section className="space-y-6">
          <div className="flex items-center justify-between border-l-4 border-brand-primary pl-4">
            <div className="flex items-center gap-3">
              <Gift className="text-brand-primary" />
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Lead Magnet Popup</h3>
            </div>
            <button 
              onClick={() => setTempConfig({...tempConfig, isEnabled: !tempConfig.isEnabled})}
              className={`w-14 h-8 rounded-full transition-all relative ${tempConfig.isEnabled ? 'bg-brand-primary' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${tempConfig.isEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Badge</label>
              <input type="text" value={tempConfig.badge} onChange={e => setTempConfig({...tempConfig, badge: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Título</label>
              <input type="text" value={tempConfig.title} onChange={e => setTempConfig({...tempConfig, title: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Descrição</label>
              <textarea value={tempConfig.description} onChange={e => setTempConfig({...tempConfig, description: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white" rows={3} />
            </div>
          </div>
        </section>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          Salvar Configurações de Marketing
        </button>
      </div>
    </div>
  );
};

export default MarketingTab;
