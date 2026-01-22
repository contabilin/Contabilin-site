
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Save, Loader2, Instagram, Linkedin, Youtube, Facebook, Twitter, Music2, CheckCircle2, MessageCircle } from 'lucide-react';

const SocialTab: React.FC = () => {
  const { socialMediaConfig, setSocialMediaConfig, waConfig, setWaConfig } = useApp();
  const [tempSocial, setTempSocial] = useState(socialMediaConfig);
  const [tempWa, setTempWa] = useState(waConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSocialMediaConfig(tempSocial);
    setWaConfig(tempWa);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const fields = [
    { k: 'instagram', l: 'Instagram', i: <Instagram size={14} /> },
    { k: 'linkedin', l: 'LinkedIn', i: <Linkedin size={14} /> },
    { k: 'youtube', l: 'YouTube', i: <Youtube size={14} /> },
    { k: 'facebook', l: 'Facebook', i: <Facebook size={14} /> },
    { k: 'tiktok', l: 'TikTok', i: <Music2 size={14} /> },
    { k: 'twitter', l: 'Twitter', i: <Twitter size={14} /> }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-brand-primary" /> Canais de Comunicação
        </h2>
        {showSuccess && (
          <div className="text-emerald-400 text-sm font-bold flex items-center gap-2 bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20 animate-slideIn">
            <CheckCircle2 size={16} /> Canais atualizados!
          </div>
        )}
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-10">
        <section className="space-y-6">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-500" /> Configuração do WhatsApp
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Número (Com DDD e 55)</label>
              <input 
                type="text" 
                value={tempWa.phoneNumber} 
                onChange={e => setTempWa({...tempWa, phoneNumber: e.target.value})} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono" 
                placeholder="Ex: 5547989165863"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Mensagem Padrão (Primeiro Contato)</label>
              <input 
                type="text" 
                value={tempWa.defaultMessage} 
                onChange={e => setTempWa({...tempWa, defaultMessage: e.target.value})} 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" 
                placeholder="Olá! Gostaria de uma consultoria..."
              />
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-white/5">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Redes Sociais da Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(f => (
              <div key={f.k} className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-2">
                  {f.i} {f.l}
                </label>
                <input 
                  type="text" 
                  value={(tempSocial as any)[f.k]} 
                  onChange={e => setTempSocial({...tempSocial, [f.k]: e.target.value})} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" 
                  placeholder={`URL do seu ${f.l}`}
                />
              </div>
            ))}
          </div>
        </section>

        <button 
          onClick={handleSave} 
          className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Salvar Alterações nos Canais
        </button>
      </div>
    </div>
  );
};

export default SocialTab;
