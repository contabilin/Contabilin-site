import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Cookie } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (page: Page) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('contabilin_cookie_consent');
    if (!consent) {
      // Pequeno delay para a animação ficar mais suave ao entrar
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('contabilin_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 animate-slideUp">
      <div className="max-w-7xl mx-auto bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-brand-primary" />
          </div>
          <div className="text-sm text-gray-300">
            <p>
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
              <button 
                onClick={() => onNavigate('privacy')}
                className="text-brand-primary underline hover:text-white transition-colors font-medium"
              >
                Política de Privacidade
              </button>.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-brand-primary hover:bg-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-brand-primary/20 text-sm whitespace-nowrap"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;