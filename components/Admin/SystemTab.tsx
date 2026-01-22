
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Loader2, Upload, Target, Code, CheckCircle2, Shield } from 'lucide-react';

const SystemTab: React.FC = () => {
  const { logoUrl, setLogoUrl, gscCode, setGscCode, fbPixelId, setFbPixelId, googleAdsId, setGoogleAdsId, adminPassword, setAdminPassword } = useApp();
  const [tempLogo, setTempLogo] = useState(logoUrl);
  const [tempGsc, setTempGsc] = useState(gscCode);
  const [tempFb, setTempFb] = useState(fbPixelId);
  const [tempAds, setTempAds] = useState(googleAdsId);
  const [tempPass, setTempPass] = useState(adminPassword);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setLogoUrl(tempLogo);
    setGscCode(tempGsc);
    setFbPixelId(tempFb);
    setGoogleAdsId(tempAds);
    setAdminPassword(tempPass);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Settings /> Configurações de Sistema</h2>
        {showSuccess && <div className="text-emerald-400 text-sm font-bold flex items-center gap-2 bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20"><CheckCircle2 size={16} /> Aplicado!</div>}
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-10">
        <section className="space-y-6">
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Code /> Identidade & Scripts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">FB Pixel ID</label>
              <input type="text" value={tempFb} onChange={e => setTempFb(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Google Ads ID</label>
              <input type="text" value={tempAds} onChange={e => setTempAds(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Search Console Tag</label>
            <input type="text" value={tempGsc} onChange={e => setTempGsc(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono" />
          </div>
        </section>

        <section className="pt-8 border-t border-white/5 space-y-6">
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Shield /> Segurança</h3>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold uppercase">Senha do Painel</label>
            <input type="password" value={tempPass} onChange={e => setTempPass(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white" />
          </div>
        </section>

        <button onClick={handleSave} className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Aplicar Infraestrutura
        </button>
      </div>
    </div>
  );
};

export default SystemTab;
