
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, MessageCircle, Sparkles, Clock, Calendar, 
  Linkedin, Instagram, Calculator, CheckCircle2, ImageIcon, Check, ArrowRight
} from 'lucide-react';
import { Page, SectionId } from '../types';

const BlogPostView: React.FC = () => {
  const { posts, selectedPost, setSelectedPost, setCurrentPage, trackWhatsAppClick, addLead } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [waInput, setWaInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const post = selectedPost || posts[0]; 

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Interceptador de cliques em links internos injetados via dangerouslySetInnerHTML
  useEffect(() => {
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.classList.contains('internal-link')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;

        // Caso 1: Ferramentas
        if (href.startsWith('/tool-')) {
          const toolPage = href.substring(1) as Page;
          setCurrentPage(toolPage);
        }
        // Caso 2: Outros posts
        else if (href.startsWith('/blog/')) {
          const postId = href.replace('/blog/', '');
          const targetPost = posts.find(p => p.id === postId);
          if (targetPost) {
            setSelectedPost(targetPost);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
        // Caso 3: Seções da Home
        else if (href.startsWith('/#')) {
          const sectionId = href.replace('/#', '') as SectionId;
          setCurrentPage('home');
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('click', handleInternalLinks);
    }
    return () => {
      if (container) {
        container.removeEventListener('click', handleInternalLinks);
      }
    };
  }, [posts, setCurrentPage, setSelectedPost]);

  const handleCTA = (origin: string = 'blog-post') => {
    trackWhatsAppClick(origin as any);
    const msg = `Olá! Li o artigo "${post.title}" e gostaria de uma análise para meu CNPJ.`;
    window.open(`https://wa.me/5547989165863?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSubscribe = () => {
    if (waInput.trim().length < 8) return;
    addLead(waInput, `Blog: ${post.title}`);
    setIsSubscribed(true);
    setWaInput('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const scrollToAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [miniRevenue, setMiniRevenue] = useState(15000);
  const taxSavings = useMemo(() => {
    const pfTax = miniRevenue * 0.275 - 869; 
    const pjTax = miniRevenue * 0.06; 
    return Math.max(0, pfTax - pjTax);
  }, [miniRevenue]);

  return (
    <div className="pt-24 pb-20 bg-[#01040a] min-h-screen text-slate-200">
      <div className="fixed top-20 left-0 w-full h-1 z-[60] bg-white/5">
        <div 
          className="h-full bg-brand-primary shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <article className="lg:col-span-8 space-y-10">
            <button 
              onClick={() => setCurrentPage('blog')}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group mb-4"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Blog
            </button>

            <header className="space-y-6 relative">
              <div className="flex items-center gap-3">
                <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-xs font-medium">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.15]">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 py-6 border-y border-white/5">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center font-black text-brand-primary uppercase shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs">Especialista em Inteligência Fiscal</p>
                </div>
              </div>
            </header>

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video group bg-[#0f172a] flex items-center justify-center">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div 
              ref={contentRef}
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                prose-headings:scroll-mt-24
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-strong:text-brand-primary prose-strong:font-bold
                prose-ul:text-gray-400 prose-li:my-1
                prose-a:no-underline hover:prose-a:text-white transition-colors"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            <div className="mt-16 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-[3rem] p-8 md:p-12 border border-white/10 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] group-hover:bg-brand-primary/30 transition-colors"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Quer baixar seu imposto para 6%?</h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Nosso time realiza um diagnóstico gratuito para enquadrar sua empresa no melhor anexo fiscal do Simples Nacional.
                  </p>
                  <button 
                    onClick={() => handleCTA('blog-footer')}
                    className="bg-[#25D366] hover:bg-[#20ba56] text-white px-10 py-5 rounded-2xl font-black shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                  >
                    <MessageCircle className="w-6 h-6 fill-white" /> Diagnóstico Gratuito agora
                  </button>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
            <div className="bg-[#1e293b]/50 border border-white/10 rounded-[2rem] p-8 space-y-6 backdrop-blur-xl">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                    <Calculator size={20} className="text-brand-primary" />
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">Simulador Rápido</h4>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-500 font-black uppercase">Faturamento</span>
                    <span className="text-white font-black text-lg">R$ {miniRevenue.toLocaleString('pt-BR')}</span>
                  </div>
                  <input type="range" min="5000" max="50000" step="1000" value={miniRevenue} onChange={(e) => setMiniRevenue(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-full accent-brand-primary cursor-pointer" />
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Economia Estimada</p>
                    <p className="text-brand-success text-2xl font-black">R$ {taxSavings.toLocaleString('pt-BR')}</p>
                  </div>
                  <button onClick={() => setCurrentPage('tool-fatorr')} className="w-full bg-brand-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                    Calcular Fator R
                  </button>
               </div>
            </div>

            <div className="bg-[#1e293b]/30 border border-white/5 rounded-[2rem] p-8 space-y-6">
               <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle2 size={14} className="text-brand-primary" /> Sumário do Artigo
               </h4>
               <nav className="space-y-3">
                  <a href="#intro" onClick={(e) => scrollToAnchor(e, 'intro')} className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                    <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                    Introdução
                  </a>
                  <a href="#conclusao" onClick={(e) => scrollToAnchor(e, 'conclusao')} className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                    <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                    Conclusão
                  </a>
               </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
