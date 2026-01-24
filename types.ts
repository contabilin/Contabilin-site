
import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum SectionId {
  HERO = 'hero',
  PARTNERS = 'partners',
  SERVICES = 'services',
  SIMULATOR = 'simulator',
  SWITCH = 'switch-accounting',
  HOW_IT_WORKS = 'how-it-works',
  DASHBOARD = 'dashboard',
  PRICING = 'pricing',
  TESTIMONIALS = 'testimonials',
  FAQ = 'faq',
  AI_CHAT = 'ai-chat',
  CONTACT = 'contact',
  BPO = 'bpo',
  TOOLS = 'tools'
}

export type Page = 'home' | 'terms' | 'privacy' | 'blog' | 'blog-post' | 'login' | 'admin' | 'onboarding' | 'tool-simples' | 'tool-fatorr' | 'onboarding-process';

export interface BlogSource {
  uri: string;
  title: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: string;
  videoUrl?: string;
  sources?: BlogSource[];
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface WhatsAppStats {
  total: number;
  byOrigin: {
    hero: number;
    floating: number;
    pricing: number;
    simulator: number;
    footer: number;
    blog: number;
    leadMagnet: number;
    tools: number;
  };
}

export interface CapturedLead {
  whatsapp: string;
  date: string;
  origin: string;
}

export interface SiteStats {
  wa: WhatsAppStats;
  sectionClicks: Record<string, number>;
  articleViews: Record<string, number>;
  totalViews: number;
  leads: CapturedLead[];
}

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
}

export interface PricingConfig {
  meiPrice: number;
  meBase10k: number;
  meBase20k: number;
  meBase30k: number;
  meBase50k: number;
  meExcessStep: number;
  employeePrice: number;
}

export interface LeadMagnetConfig {
  title: string;
  description: string;
  buttonText: string;
  badge: string;
  footer: string;
  isEnabled: boolean;
  downloadUrl: string;
  fileName?: string;
}

export interface SocialMediaConfig {
  instagram: string;
  linkedin: string;
  youtube: string;
  facebook: string;
  tiktok: string;
  twitter: string;
  threads: string;
  telegram: string;
  discord: string;
  behance: string;
  pinterest: string;
  p1Name: string;
  p1Instagram: string;
  p1Linkedin: string;
  p1Youtube: string;
  p1Tiktok: string;
  p1Twitter: string;
  p1Threads: string;
  p1Telegram: string;
  p1Discord: string;
  p1Behance: string;
  p1Pinterest: string;
  p1Facebook: string;
  p2Name: string;
  p2Instagram: string;
  p2Linkedin: string;
  p2Youtube: string;
  p2Tiktok: string;
  p2Twitter: string;
  p2Threads: string;
  p2Telegram: string;
  p2Discord: string;
  p2Behance: string;
  p2Pinterest: string;
  p2Facebook: string;
}
