
import React, { startTransition, useEffect } from 'react';
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
import ToolsSection from './components/ToolsSection';
import SimplesNacionalPage from './components/Tools/SimplesNacionalPage';
import FatorRPage from './components/Tools/FatorRPage';
import OnboardingProcessPage from './components/OnboardingProcessPage';
import { SectionId, BlogPost, Page } from './types';

const AppRouter = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    selectedPost, 
    setSelectedPost, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated, 
    posts, 
    pricingConfig, 
    leadMagnetConfig, 
    socialMediaConfig, 
    isAiEnabled, 
    aiInstruction, 
    logoUrl, 
    trackWhatsAppClick, 
    trackArticleView,
    waConfig,
    adminPassword
  } = useApp();

  // Handle URL Params for sharing specific pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      setCurrentPage(pageParam as Page);
      // Remove param from URL without refreshing
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // SEO Manager: Atualiza metadados conforme a página
  useEffect(() => {
    let title = "Contabilin | Contabilidade Inteligente para o Mercado Digital";
    let description = "Contabilidade especializada em Infoprodutores, Agências e Devs. Reduza seus impostos com estratégia fiscal de elite.";

    switch (currentPage) {
      case 'blog':
        title = "Blog Contabilin | Inteligência Fiscal e Estratégia Digital";
        description = "Aprenda a blindar seu lucro, reduzir impostos e escalar seu negócio digital com as dicas dos nossos especialistas.";
        break;
      case 'blog-post':
        if (selectedPost) {
          title = `${selectedPost.title} | Blog Contabilin`;
          description = selectedPost.excerpt;
        }
        break;
      case 'tool-simples':
        title = "Calculadora Simples Nacional 2026 | Simule seus Impostos";
        description = "Simule sua alíquota efetiva no Simples Nacional e veja quanto você pode economizar saindo do CPF.";
        break;
      case 'tool-fatorr':
        title = "Simulador Fator R | Reduza seu imposto de 15,5% para 6%";
        description = "Ferramenta gratuita para calcular o Pró-labore ideal e enquadrar sua empresa no Anexo III do Simples Nacional.";
        break;
      case 'onboarding':
        title = "Diagnóstico Fiscal Gratuito | Iniciar Análise";
        description = "Responda 4 perguntas e receba um diagnóstico completo sobre a melhor forma de tributar seu lucro.";
        break;
      case 'onboarding-process':
        title = "Nossa Metodologia | Como Trabalhamos | Contabilin";
        description = "Conheça o processo de 5 passos da Contabilin para regularizar e escalar sua empresa digital.";
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [currentPage, selectedPost]);

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

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    trackArticleView(post.id);
    handleNavigate('blog-post');
  };

  const handleWA = (origin: any, customMsg?: string) => {
    trackWhatsAppClick(origin);
    const msg = customMsg || waConfig.defaultMessage;
    window.open(`https://wa.me/${waConfig.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (currentPage === 'login') {
    return <AdminLogin 
      onLogin={() => setIsAdminAuthenticated(true)} 
      onNavigate={handleNavigate} 
      validPassword={adminPassword} 
    />;
  }

  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} onNavigate={handleNavigate} validPassword={adminPassword} />;
    return <AdminDashboard />;
  }

  if (currentPage === 'onboarding') {
    return <Onboarding onNavigate={handleNavigate} />;
  }

  if (currentPage === 'onboarding-process') {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} logoUrl={logoUrl} />
        <OnboardingProcessPage onBack={() => handleNavigate('home')} onWhatsAppClick={() => handleWA('onboarding-process')} />
        <Footer onNavigate={handleNavigate} socialMedia={socialMediaConfig} logoUrl={logoUrl} />
      </>
    );
  }

  if (currentPage === 'tool-simples') {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} logoUrl={logoUrl} />
        <SimplesNacionalPage onBack={() => handleNavigate('home')} onWhatsAppClick={(msg) => handleWA('tools', msg)} />
        <Footer onNavigate={handleNavigate} socialMedia={socialMediaConfig} logoUrl={logoUrl} />
      </>
    );
  }

  if (currentPage === 'tool-fatorr') {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} logoUrl={logoUrl} />
        <FatorRPage onBack={() => handleNavigate('home')} onWhatsAppClick={(msg) => handleWA('tools', msg)} />
        <Footer onNavigate={handleNavigate} socialMedia={socialMediaConfig} logoUrl={logoUrl} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200">
      <Header currentPage={currentPage} onNavigate={handleNavigate} logoUrl={logoUrl} />
      
      <main className="bg-grid-white bg-fixed min-h-screen">
        {(() => {
          switch (currentPage) {
            case 'blog': return <BlogList posts={posts} onReadPost={handleReadPost} onNavigate={(id) => handleNavigate('home', id as any)} />;
            case 'blog-post': return <BlogPostView />;
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
                <HowItWorks onNavigate={handleNavigate} />
                <DashboardPreview />
                <Pricing pricingConfig={pricingConfig} onWhatsAppClick={(msg) => handleWA('pricing', msg)} />
                <FAQ />
                {isAiEnabled && <AiAssistant customSystemInstruction={aiInstruction} />}
                <ToolsSection onNavigate={handleNavigate} />
                <LatestPostsSection posts={posts} onReadPost={handleReadPost} onViewAll={() => handleNavigate('blog')} />
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
