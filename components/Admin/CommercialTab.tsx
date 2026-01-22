
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, Save, Loader2, CheckCircle2 } from 'lucide-react';

const CommercialTab: React.FC = () => {
  const { pricingConfig, setPricingConfig } = useApp();
  const [tempConfig, setTempConfig] = useState(pricingConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setPricingConfig(tempConfig);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <DollarSign className="text-brand-primary" /> Comercial & Preços
        </h2>
        {showSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20">
            <CheckCircle2 size={16} /> Salvo!
          </div>
        )}
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { k: 'meiPrice', l: 'Plano MEI (Mensal)' }, 
            { k: 'meBase10k', l: 'Plano ME até 10k fat.' },
            { k: 'meBase20k', l: 'Plano ME até 20k fat.' }, 
            { k: 'meBase30k', l: 'Plano ME até 30k fat.' },
            { k: 'meBase50k', l: 'Plano ME até 50k fat.' }, 
            { k: 'employeePrice', l: 'Adicional Sócio/Fun.' }
          ].map(f => (
            <div key={f.k} className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{f.l}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs">R$</span>
                <input 
                  type="number" 
                  value={(tempConfig as any)[f.k]} 
                  onChange={e => setTempConfig({...tempConfig, [f.k]: Number(e.target.value)})} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-bold" 
                />
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default CommercialTab;
