
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bot, Save, Loader2, Cpu, CheckCircle2 } from 'lucide-react';

const IntelligenceTab: React.FC = () => {
  const { aiInstruction, setAiInstruction, isAiEnabled, setIsAiEnabled } = useApp();
  const [tempInstruction, setTempInstruction] = useState(aiInstruction);
  const [tempEnabled, setTempEnabled] = useState(isAiEnabled);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setAiInstruction(tempInstruction);
    setIsAiEnabled(tempEnabled);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="text-brand-primary" /> Cérebro da IA (Gemini)
        </h2>
        {showSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-400/10 px-4 py-2 rounded-lg border border-emerald-400/20">
            <CheckCircle2 size={16} /> Salvo com sucesso!
          </div>
        )}
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-[2.5rem] border border-white/10 space-y-8">
        <div className="flex items-center justify-between bg-black/20 p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
              <Bot className="text-brand-primary" size={28} />
            </div>
            <div>
              <h3 className="text-white font-bold">Assistente Ativo no Site</h3>
              <p className="text-xs text-gray-500">O Chatbot responderá dúvidas baseadas na instrução abaixo.</p>
            </div>
          </div>
          <button 
            onClick={() => setTempEnabled(!tempEnabled)}
            className={`w-14 h-8 rounded-full transition-all relative ${tempEnabled ? 'bg-brand-primary' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${tempEnabled ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Instrução Mestra do Sistema</label>
          <div className="relative">
            <textarea 
              value={tempInstruction}
              onChange={e => setTempInstruction(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-gray-300 font-mono text-sm leading-relaxed focus:border-brand-primary transition-all outline-none"
              rows={15}
            />
            <div className="absolute top-4 right-4 text-[9px] text-brand-primary font-black uppercase bg-brand-primary/10 px-3 py-1 rounded-lg">
              Prompt Engineering
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-brand-primary py-5 rounded-2xl text-white font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          Aplicar Inteligência Gemini
        </button>
      </div>
    </div>
  );
};

export default IntelligenceTab;
