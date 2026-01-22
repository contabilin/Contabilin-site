
import React, { useState, useEffect, useCallback } from 'react';
import { X, BookOpen, Download, CheckCircle2, MessageCircle } from 'lucide-react';
import { LeadMagnetConfig } from '../types';

interface LeadMagnetProps {
  config: LeadMagnetConfig;
  onTrackClick: () => void;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ config, onTrackClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

  const handleScroll = useCallback(() => {
    if (!config.isEnabled) return;
    
    const hasSeen = localStorage.getItem('contabilin_lead_magnet');
    if (hasSeen) return;

    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / totalHeight) * 100;

    if (scrollPercent > 50) {
      setIsVisible(true);
      window.removeEventListener('scroll', handleScroll);
    }
  }, [config.isEnabled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClose = () => {
    localStorage.setItem('contabilin_lead_magnet', 'true');
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onTrackClick();
    
    const message = `Olá! Acabei de solicitar o material "${config.title}" pelo site. Meu WhatsApp para contato é: ${whatsapp}. Gostaria de entender como a Contabilin pode me ajudar.`;
    const url = `https://wa.me/5547989165863?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  const handleDownload = () => {
    if (!config.downloadUrl) return;

    // Se for um Base64 (upload interno), precisamos disparar um download forçado
    if (config.downloadUrl.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = config.downloadUrl;
        link.download = config.fileName || 'material-contabilin.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // Se for um link externo normal
        window.open(config.downloadUrl, '_blank');
    }
    
    handleClose();
  };

  if (!isVisible || !config.isEnabled) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f172a] w-full max-w-lg rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl"></div>
        
        <button onClick={handleClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Quase lá!</h3>
            <p className="text-gray-400">
              Iniciamos o contato via WhatsApp. Clique no botão abaixo para baixar seu material agora mesmo.
            </p>
            <button 
              onClick={handleDownload}
              className="w-full bg-brand-primary hover:bg-violet-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/30 transition-all"
            >
              <Download size={20} /> Baixar Arquivo
            </button>
            <button 
              onClick={handleClose}
              className="text-xs text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-widest"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <BookOpen size={14} className="text-brand-primary" />
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{config.badge}</span>
            </div>
            
            <h3 className="text-3xl font-black text-white leading-tight">
              {config.title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'fator' || word.toLowerCase() === 'r' ? 'text-brand-primary' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h3>
            <p className="text-gray-400">
              {config.description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="tel" 
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Seu WhatsApp (com DDD)"
                  className="w-full bg-[#020617] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-primary hover:bg-violet-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 transition-all"
              >
                <Download size={20} /> {config.buttonText}
              </button>
            </form>
            
            <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest font-bold">
              {config.footer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnet;
