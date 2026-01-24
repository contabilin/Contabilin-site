
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost, SiteStats, WhatsAppConfig, PricingConfig, LeadMagnetConfig, SocialMediaConfig, Page, CapturedLead } from '../types';
import { blogPosts as initialBlogPosts } from '../data/blogData';
import { DEFAULT_SYSTEM_INSTRUCTION } from '../services/geminiService';

interface AppContextType {
  // Page State
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  
  // Selection State
  selectedPost: BlogPost | null;
  setSelectedPost: (post: BlogPost | null) => void;
  
  // Auth State
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  adminPassword: string;
  setAdminPassword: (pass: string) => void;

  // Data State
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  pricingConfig: PricingConfig;
  setPricingConfig: (config: PricingConfig) => void;
  leadMagnetConfig: LeadMagnetConfig;
  setLeadMagnetConfig: (config: LeadMagnetConfig) => void;
  socialMediaConfig: SocialMediaConfig;
  setSocialMediaConfig: (config: SocialMediaConfig) => void;
  waConfig: WhatsAppConfig;
  setWaConfig: (config: WhatsAppConfig) => void;
  
  // AI State
  aiInstruction: string;
  setAiInstruction: (instruction: string) => void;
  isAiEnabled: boolean;
  setIsAiEnabled: (enabled: boolean) => void;

  // System State
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  gscCode: string;
  setGscCode: (code: string) => void;
  fbPixelId: string;
  setFbPixelId: (id: string) => void;
  googleAdsId: string;
  setGoogleAdsId: (id: string) => void;
  
  // Stats
  siteStats: SiteStats;
  trackSectionClick: (section: string) => void;
  trackArticleView: (id: string) => void;
  trackWhatsAppClick: (origin: keyof SiteStats['wa']['byOrigin']) => void;
  addLead: (whatsapp: string, origin: string) => void;
  resetStats: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getStored = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try { return JSON.parse(stored); } catch { return defaultValue; }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>(() => getStored('contabilin_current_page', 'home') as Page);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('contabilin_admin_pass') || '123');
  
  const [posts, setPosts] = useState<BlogPost[]>(() => getStored('contabilin_posts', initialBlogPosts));
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => getStored('contabilin_pricing', { meiPrice: 157, meBase10k: 347, meBase20k: 447, meBase30k: 547, meBase50k: 647, meExcessStep: 100, employeePrice: 50 }));
  const [leadMagnetConfig, setLeadMagnetConfig] = useState<LeadMagnetConfig>(() => getStored('contabilin_lead_magnet_config', { title: 'Guia Fiscal 2026', description: 'Reduza impostos.', buttonText: 'Baixar', badge: 'Grátis', footer: 'Contabilin', isEnabled: true, downloadUrl: '#' }));
  const [socialMediaConfig, setSocialMediaConfig] = useState<SocialMediaConfig>(() => getStored('contabilin_social_config', { instagram: '', linkedin: '', youtube: '', facebook: '', tiktok: '', twitter: '', threads: '', telegram: '', discord: '', behance: '', pinterest: '', p1Name: 'Iago', p1Instagram: '', p2Name: 'Gisele', p2Instagram: '' } as any));
  const [waConfig, setWaConfig] = useState<WhatsAppConfig>(() => getStored('contabilin_wa_config', { phoneNumber: '5547989165863', defaultMessage: 'Olá!' }));
  const [aiInstruction, setAiInstruction] = useState(() => localStorage.getItem('contabilin_ai_instruction') || DEFAULT_SYSTEM_INSTRUCTION);
  const [isAiEnabled, setIsAiEnabled] = useState(() => getStored('contabilin_ai_enabled', true));
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('contabilin_logo_url') || '');
  const [gscCode, setGscCode] = useState(() => localStorage.getItem('contabilin_gsc_code') || '');
  const [fbPixelId, setFbPixelId] = useState(() => localStorage.getItem('contabilin_fb_pixel') || '');
  const [googleAdsId, setGoogleAdsId] = useState(() => localStorage.getItem('contabilin_google_ads') || '');
  
  const [siteStats, setSiteStats] = useState<SiteStats>(() => getStored('contabilin_site_stats', { 
    wa: { total: 0, byOrigin: { hero: 0, floating: 0, pricing: 0, simulator: 0, footer: 0, blog: 0, leadMagnet: 0 } }, 
    sectionClicks: {}, 
    articleViews: {}, 
    totalViews: 0,
    leads: []
  }));

  // Persistence
  useEffect(() => {
    localStorage.setItem('contabilin_current_page', JSON.stringify(currentPage));
    localStorage.setItem('contabilin_posts', JSON.stringify(posts));
    localStorage.setItem('contabilin_pricing', JSON.stringify(pricingConfig));
    localStorage.setItem('contabilin_lead_magnet_config', JSON.stringify(leadMagnetConfig));
    localStorage.setItem('contabilin_social_config', JSON.stringify(socialMediaConfig));
    localStorage.setItem('contabilin_wa_config', JSON.stringify(waConfig));
    localStorage.setItem('contabilin_ai_enabled', JSON.stringify(isAiEnabled));
    localStorage.setItem('contabilin_ai_instruction', aiInstruction);
    localStorage.setItem('contabilin_logo_url', logoUrl);
    localStorage.setItem('contabilin_gsc_code', gscCode);
    localStorage.setItem('contabilin_fb_pixel', fbPixelId);
    localStorage.setItem('contabilin_google_ads', googleAdsId);
    localStorage.setItem('contabilin_admin_pass', adminPassword);
    localStorage.setItem('contabilin_site_stats', JSON.stringify(siteStats));
  }, [currentPage, posts, pricingConfig, leadMagnetConfig, socialMediaConfig, waConfig, isAiEnabled, aiInstruction, logoUrl, gscCode, fbPixelId, googleAdsId, adminPassword, siteStats]);

  const trackSectionClick = useCallback((section: string) => {
    setSiteStats(prev => ({ ...prev, sectionClicks: { ...prev.sectionClicks, [section]: (prev.sectionClicks[section] || 0) + 1 } }));
  }, []);

  const trackArticleView = useCallback((id: string) => {
    setSiteStats(prev => ({ ...prev, articleViews: { ...prev.articleViews, [id]: (prev.articleViews[id] || 0) + 1 } }));
  }, []);

  const trackWhatsAppClick = useCallback((origin: keyof SiteStats['wa']['byOrigin']) => {
    setSiteStats(prev => ({
      ...prev,
      wa: {
        total: (prev.wa.total || 0) + 1,
        byOrigin: { ...prev.wa.byOrigin, [origin]: (prev.wa.byOrigin[origin] || 0) + 1 }
      }
    }));
  }, []);

  const addLead = useCallback((whatsapp: string, origin: string) => {
    const newLead: CapturedLead = {
      whatsapp,
      origin,
      date: new Date().toLocaleString('pt-BR')
    };
    setSiteStats(prev => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])]
    }));
  }, []);

  const resetStats = () => setSiteStats({ 
    wa: { total: 0, byOrigin: { hero: 0, floating: 0, pricing: 0, simulator: 0, footer: 0, blog: 0, leadMagnet: 0 } }, 
    sectionClicks: {}, 
    articleViews: {}, 
    totalViews: 0,
    leads: []
  });

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage, selectedPost, setSelectedPost, isAdminAuthenticated, setIsAdminAuthenticated, adminPassword, setAdminPassword,
      posts, setPosts, pricingConfig, setPricingConfig, leadMagnetConfig, setLeadMagnetConfig,
      socialMediaConfig, setSocialMediaConfig, waConfig, setWaConfig, aiInstruction, setAiInstruction,
      isAiEnabled, setIsAiEnabled, logoUrl, setLogoUrl, gscCode, setGscCode, fbPixelId, setFbPixelId, googleAdsId, setGoogleAdsId,
      siteStats, trackSectionClick, trackArticleView, trackWhatsAppClick, addLead, resetStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
