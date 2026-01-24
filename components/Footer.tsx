
import React from 'react';
import { 
  Lightbulb, Brain, Instagram, Mail, Phone, Lock, Linkedin, 
  Music2, Youtube, Facebook, Twitter, Share2, Send, Hash, Palette, ImageIcon
} from 'lucide-react';
import { Page, SectionId, SocialMediaConfig } from '../types';

interface FooterProps {
  onNavigate: (page: Page, sectionId?: SectionId) => void;
  socialMedia: SocialMediaConfig;
  logoUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, socialMedia, logoUrl }) => {
  const renderSocialIcon = (key: string) => {
    switch(key.toLowerCase()) {
      case 'instagram': return <Instagram className="w-3 h-3" />;
      case 'linkedin': return <Linkedin className="w-3 h-3" />;
      case 'youtube': return <Youtube className="w-3 h-3" />;
      case 'facebook': return <Facebook className="w-3 h-3" />;
      case 'tiktok': return <Music2 className="w-3 h-3" />;
      case 'twitter': return <Twitter className="w-3 h-3" />;
      case 'threads': return <Share2 className="w-3 h-3" />;
      case 'telegram': return <Send className="w-3 h-3" />;
      case 'discord': return <Hash className="w-3 h-3" />;
      case 'behance': return <Palette className="w-3 h-3" />;
      case 'pinterest': return <ImageIcon className="w-3 h-3" />;
      default: return null;
    }
  };

  const getPartnerSocials = (prefix: 'p1' | 'p2') => {
    const fields = ['Instagram', 'Linkedin', 'Youtube', 'Facebook', 'Tiktok', 'Twitter', 'Threads', 'Telegram', 'Discord', 'Behance', 'Pinterest'];
    return fields.map(f => ({
      key: f,
      url: (socialMedia as any)[`${prefix}${f}`]
    })).filter(s => s.url);
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt="Contabilin Logo" className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <div className="bg-gradient-to-br from-brand-primary to-brand-accent p-2 rounded-lg mr-3 shadow-lg shadow-brand-primary/20">
                     <div className="relative w-5 h-5">
                        <Lightbulb className="w-5 h-5 text-white absolute top-0 left-0" />
                        <Brain className="w-3 h-3 text-white/90 absolute bottom-0 right-0 translate-x-1 translate-y-1" />
                      </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white leading-none">Contabilin</span>
                    <span className="text-[10px] text-brand-primary font-medium tracking-wider uppercase mt-1">Contabilidade Inteligente</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Contabilidade estratégica especializada no mercado digital para quem escala sem burocracia.
            </p>
            
            <div className="space-y-6">
                <div>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-4">Nossas Redes</p>
                    <div className="flex flex-wrap gap-2.5">
                        {['instagram', 'linkedin', 'youtube', 'tiktok', 'facebook', 'twitter', 'threads', 'telegram', 'discord', 'behance', 'pinterest'].map(net => {
                          const url = (socialMedia as any)[net];
                          if (!url) return null;
                          return (
                            <a key={net} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                                {renderSocialIcon(net)}
                            </a>
                          );
                        })}
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-4">Siga os Sócios</p>
                    <div className="space-y-5">
                        {/* Sócio 1 */}
                        <div>
                            <p className="text-xs text-white font-bold mb-2">{socialMedia.p1Name}</p>
                            <div className="flex flex-wrap gap-2">
                                {getPartnerSocials('p1').map(s => (
                                    <a key={`p1-${s.key}`} href={s.url} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:bg-brand-primary hover:text-white transition-all">
                                        {renderSocialIcon(s.key)}
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Sócio 2 */}
                        <div>
                            <p className="text-xs text-white font-bold mb-2">{socialMedia.p2Name}</p>
                            <div className="flex flex-wrap gap-2">
                                {getPartnerSocials('p2').map(s => (
                                    <a key={`p2-${s.key}`} href={s.url} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:bg-brand-accent hover:text-white transition-all">
                                        {renderSocialIcon(s.key)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Soluções</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('home', SectionId.SIMULATOR)} className="hover:text-brand-primary transition-colors">Calculadora de Economia</button></li>
              <li><button onClick={() => onNavigate('home', SectionId.PRICING)} className="hover:text-brand-primary transition-colors">Planos para PJ</button></li>
              <li><button onClick={() => onNavigate('home', SectionId.SWITCH)} className="hover:text-brand-primary transition-colors">Migrar de Contador</button></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Conteúdo</h4>
             <ul className="space-y-3 text-sm text-gray-400">
               <li><button onClick={() => onNavigate('blog')} className="hover:text-brand-primary transition-colors">Blog Contabilin</button></li>
               <li><button onClick={() => onNavigate('terms')} className="hover:text-brand-primary transition-colors">Termos de Uso</button></li>
               <li><button onClick={() => onNavigate('privacy')} className="hover:text-brand-primary transition-colors">Privacidade</button></li>
             </ul>
           </div>

          <div>
            <h4 className="text-white font-bold mb-6">Fale Conosco</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-primary" /> 
                contato@contabilin.com.br
              </li>
              <li>
                <a href="https://wa.me/5547989165863" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-brand-primary" /> (47) 98916-5863
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <p>&copy; 2026 Contabilin Contabilidade Inteligente. Todos os direitos reservados.</p>
                <button 
                    onClick={() => onNavigate('login')} 
                    className="w-10 h-10 md:w-8 md:h-8 rounded-xl bg-white/5 flex items-center justify-center opacity-30 hover:opacity-100 hover:bg-brand-primary/20 hover:text-brand-primary transition-all border border-white/5 shrink-0"
                    title="Painel Admin"
                >
                    <Lock className="w-4 h-4 md:w-3.5 md:h-3.5" />
                </button>
            </div>
            
            <div className="hidden md:block opacity-40">
                <span className="tracking-[0.2em]">Tecnologia & Estratégia Fiscal</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
