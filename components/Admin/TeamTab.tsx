
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Save, Loader2, CheckCircle2, Instagram, Linkedin, Youtube, Music2, Twitter, Facebook } from 'lucide-react';

const TeamTab: React.FC = () => {
  const { socialMediaConfig, setSocialMediaConfig } = useApp();
  const [tempConfig, setTempConfig] = useState(socialMediaConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSocialMediaConfig(tempConfig);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const socialFields = [
    { k: 'Instagram', l: 'Instagram', i: <Instagram size={12} className="text-pink-500" /> },
    { k: 'Linkedin', l: 'LinkedIn', i: <Linkedin size={12} className="text-blue-600" /> },
    { k: 'Youtube', l: 'YouTube', i: <Youtube size={12} className="text-red-500" /> },
    { k: 'Tiktok', l: 'TikTok', i: <Music2 size={12} className="text-cyan-400" /> },
    { k: 'Twitter', l: 'Twitter', i: <Twitter size={12} className="text-white" /> },
    { k: 'Facebook', l: 'Facebook', i: <Facebook size={12} className="text-blue-700" /> }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="text-brand-primary" /> Sócios & Equipe
        </h2>
        {showSuccess && (
          <div className="text-emerald-400 text-sm font-bold flex items-center gap-2 bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20 animate-slideIn">
            <CheckCircle2 size={16} /> Perfil dos sócios atualizado!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map(num => (
          <div key={num} className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors"></div>
            
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center font-black text-brand-primary">
                S{num}
              </div>
              <h3 className="text-white font-bold text-lg">
                {num === 1 ? 'Diretor Executivo' : 'Diretora Operacional'}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Nome do Sócio {num}</label>
                <input 
                  type="text" 
                  value={(tempConfig as any)[`p${num}Name`]} 
                  onChange={e => setTempConfig({...tempConfig, [`p${num}Name`]: e.target.value})} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-bold" 
                  placeholder="Nome do Sócio"
                />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Redes Sociais Individuais</p>
                <div className="grid grid-cols-1 gap-3">
                  {socialFields.map(field => (
                    <div key={field.k} className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        {field.i}
                        <span className="text-[9px] text-gray-500 font-bold uppercase">{field.l}</span>
                      </div>
                      <input 
                        type="text" 
                        value={(tempConfig as any)[`p${num}${field.k}`] || ''} 
                        onChange={e => setTempConfig({...tempConfig, [`p${num}${field.k}`]: e.target.value})} 
                        className="w-full bg-black/30 border border-white/5 rounded-xl pl-24 pr-4 py-2.5 text-white text-[11px] font-mono focus:border-brand-primary/50 transition-colors" 
                        placeholder="URL do Perfil"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSave} 
        disabled={isSaving}
        className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all"
      >
        {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Atualizar Perfil dos Sócios
      </button>
    </div>
  );
};

export default TeamTab;
