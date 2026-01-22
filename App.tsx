
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import StatsSection from './components/StatsSection';
import TaxSimulator from './components/TaxSimulator';
import SwitchAccounting from './components/SwitchAccounting';
import Benefits from './components/Benefits';
import Services from './components/Services';
import ComparisonSection from './components/ComparisonSection';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import LatestPostsSection from './components/LatestPostsSection';
import Partners from './components/Partners';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LeadMagnet from './components/LeadMagnet';
import CookieConsent from './components/CookieConsent';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPost';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LegalContent from './components/LegalContent';
import Onboarding from './components/Onboarding';
import AiAssistant from './components/AiAssistant';
import { SectionId } from './types';

const AppRouter = () => {
  const { 
    currentPage, setCurrentPage, isAdminAuthenticated, setIsAdminAuthenticated, 
    posts, pricingConfig, leadMagnetConfig, socialMediaConfig, isAiEnabled, 
    aiInstruction, logoUrl, trackWhatsAppClick, trackArticleView
  } = useApp();

  const handleNavigate = (page: any, sectionId?: string) => {
    setCurrentPage(page);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWA = (origin: any, customMsg?: string) => {
    trackWhatsAppClick(origin);
    const { waConfig } = useApp();
    const msg = customMsg || waConfig.defaultMessage;
    window.open(`https://wa.me/${waConfig.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (currentPage === 'login') {
    return <AdminLogin 
      onLogin={() => setIsAdminAuthenticated(true)} 
      onNavigate={handleNavigate} 
      validPassword={useApp().adminPassword} 
    />;
  }

  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} onNavigate={handleNavigate} validPassword={useApp().adminPassword} />;
    return <AdminDashboard />;
  }

  if (currentPage === 'onboarding') {
    return <Onboarding onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200">
      <Header currentPage={currentPage} onNavigate={handleNavigate} logoUrl={logoUrl} />
      
      <main className="bg-grid-white bg-fixed min-h-screen">
        {(() => {
          switch (currentPage) {
            case 'blog': return <BlogList posts={posts} onReadPost={(p) => { trackArticleView(p.id); handleNavigate('blog-post'); }} onNavigate={(id) => handleNavigate('home', id)} />;
            case 'blog-post': return <BlogPostView onBack={() => handleNavigate('blog')} onWhatsAppClick={(msg) => handleWA('blog', msg)} />;
            case 'terms':
            case 'privacy': return <LegalContent page={currentPage} onBack={() => handleNavigate('home')} />;
            default: return (
              <>
                <Hero scrollToSection={(id) => handleNavigate('home', id)} onWhatsAppClick={() => handleWA('hero')} />
                <Integrations />
                <StatsSection />
                <TaxSimulator onWhatsAppClick={(msg) => handleWA('simulator', msg)} />
                <SwitchAccounting onWhatsAppClick={(msg) => handleWA('simulator', msg)} />
                <ComparisonSection />
                <Benefits />
                <Services />
                <Testimonials />
                <HowItWorks />
                <DashboardPreview />
                <Pricing pricingConfig={pricingConfig} onWhatsAppClick={(msg) => handleWA('pricing', msg)} />
                <FAQ />
                {isAiEnabled && <AiAssistant customSystemInstruction={aiInstruction} />}
                <LatestPostsSection posts={posts} onReadPost={(p) => { trackArticleView(p.id); handleNavigate('blog-post'); }} onViewAll={() => handleNavigate('blog')} />
                <Partners />
                <section id={SectionId.CONTACT} className="py-24 bg-brand-primary text-center">
                    <h2 className="text-4xl font-black text-white mb-6">Pronto para blindar seu lucro?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                      <button onClick={() => handleWA('footer')} className="bg-white text-brand-primary px-12 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform">Falar com Especialista</button>
                      <button onClick={() => handleNavigate('onboarding')} className="bg-brand-dark/20 border border-white/20 text-white px-12 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">Iniciar Diagnóstico Grátis</button>
                    </div>
                </section>
              </>
            );
          }
        })()}
      </main>

      <Footer onNavigate={handleNavigate} socialMedia={socialMediaConfig} logoUrl={logoUrl} />
      <FloatingWhatsApp onClick={() => handleWA('floating')} />
      <LeadMagnet config={leadMagnetConfig} onTrackClick={() => trackWhatsAppClick('leadMagnet')} />
      <CookieConsent onNavigate={handleNavigate} />
    </div>
  );
};

const App = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
);

export default App;
