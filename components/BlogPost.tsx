
import React, { useEffect, useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, MessageCircle, Sparkles, Clock, Calendar, 
  Linkedin, Instagram, Calculator, CheckCircle2
} from 'lucide-react';

const BlogPostView: React.FC = () => {
  const { posts, setCurrentPage, trackWhatsAppClick } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Como estamos em uma SPA simples, pegamos o post selecionado (assumimos o primeiro para demo)
  const post = posts[0]; 

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

  const handleCTA = (origin: string = 'blog-post') => {
    trackWhatsAppClick(origin as any);
    const msg = `Olá! Li o artigo "${post.title}" e gostaria de uma análise para meu CNPJ.`;
    window.open(`https://wa.me/5547989165863?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const [miniRevenue, setMiniRevenue] = useState(15000);
  const taxSavings = useMemo(() => {
    const pfTax = miniRevenue * 0.275 - 869; 
    const pjTax = miniRevenue * 0.06; 
    return Math.max(0, pfTax - pjTax);
  }, [miniRevenue]);

  return (
    <div className="pt-20 pb-20 bg-[#01040a] min-h-screen text-slate-200">
      <div className="fixed top-20 left-0 w-full h-1 z-[60] bg-white/5">
        <div 
          className="h-full bg-brand-primary shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <article className="lg:col-span-8 space-y-10">
            <button 
              onClick={() => setCurrentPage('blog')}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group mb-4"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Blog
            </button>

            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-xs font-medium">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 py-6 border-y border-white/5">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center font-black text-brand-primary uppercase">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs">Especialista em Engenharia Fiscal</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Linkedin size={16} /></button>
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Instagram size={16} /></button>
                </div>
              </div>
            </header>

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video group">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
            </div>

            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-strong:text-brand-primary prose-strong:font-bold
                prose-ul:text-gray-400 prose-li:my-1
                prose-img:rounded-3xl prose-img:border prose-img:border-white/10"
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
                <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
                   <Calculator size={64} className="text-brand-primary" />
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
                  <input 
                    type="range" 
                    min="5000" 
                    max="50000" 
                    step="1000"
                    value={miniRevenue}
                    onChange={(e) => setMiniRevenue(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full accent-brand-primary appearance-none cursor-pointer" 
                  />
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Economia Estimada</p>
                    <p className="text-brand-success text-2xl font-black">R$ {taxSavings.toLocaleString('pt-BR')}</p>
                  </div>
                  <button 
                    onClick={() => handleCTA('blog-sidebar-calc')}
                    className="w-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    Economizar Agora
                  </button>
               </div>
            </div>

            <div className="bg-[#1e293b]/30 border border-white/5 rounded-[2rem] p-8 space-y-6">
               <h4 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle2 size={14} className="text-brand-primary" /> Sumário do Artigo
               </h4>
               <nav className="space-y-3">
                  <a href="#intro" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                    <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                    Introdução Técnica
                  </a>
                  {post.id === 'inteligencia-artificial-fiscalizacao-2026' ? (
                    <a href="#tecnologia" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                      <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                      Avanços da Receita
                    </a>
                  ) : post.id === 'exportacao-servicos-devs-2026' ? (
                    <a href="#impostos" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                      <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                      Isenções de Exportação
                    </a>
                  ) : post.id === 'guia-definitivo-simples-nacional-2026' ? (
                    <a href="#fatorr" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                      <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                      Entendendo o Fator R
                    </a>
                  ) : (
                    <a href="#publis" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                      <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                      Análise de Publis
                    </a>
                  )}
                  <a href="#conclusao" className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-primary transition-colors group">
                    <div className="w-1 h-1 bg-gray-700 rounded-full group-hover:w-3 transition-all"></div>
                    Conclusão e Diagnóstico
                  </a>
               </nav>
            </div>

            <div className="bg-brand-primary p-8 rounded-[2rem] text-white space-y-4 relative overflow-hidden group">
               <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:rotate-12 transition-transform" />
               <h4 className="font-black text-lg leading-tight relative z-10">Receba estratégias fiscais no seu email.</h4>
               <p className="text-white/70 text-xs relative z-10">Sem spam. Apenas atualizações que salvam o seu lucro.</p>
               <input type="email" placeholder="Seu melhor e-mail" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/20 relative z-10" />
               <button className="w-full bg-white text-brand-primary py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform relative z-10">Assinar</button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
