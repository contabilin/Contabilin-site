
import React from 'react';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, Clock, Youtube } from 'lucide-react';

interface LatestPostsSectionProps {
  posts: BlogPost[];
  onReadPost: (post: BlogPost) => void;
  onViewAll: () => void;
}

const LatestPostsSection: React.FC<LatestPostsSectionProps> = ({ posts, onReadPost, onViewAll }) => {
  // Pegamos apenas os 3 posts mais recentes
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-24 bg-[#020617] relative border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-primary font-semibold tracking-wider uppercase text-sm mb-3">Conhecimento que Liberta</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Últimas do nosso Blog</h3>
            <p className="text-gray-400 text-lg">Estratégias tributárias, atualizações do mercado e dicas práticas para prestadores de serviços e empreendedores digitais.</p>
          </div>
          <button 
            onClick={onViewAll}
            className="flex items-center gap-2 text-white font-bold hover:text-brand-primary transition-colors group whitespace-nowrap"
          >
            Ver todos os artigos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onReadPost(post)}
              className="group bg-[#1e293b]/20 border border-white/5 rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-brand-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                  {post.category}
                </div>
                {post.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl">
                            <Youtube className="w-5 h-5" />
                        </div>
                    </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-3 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                  {post.excerpt}
                </p>
                <button className="w-full py-3 bg-white/5 group-hover:bg-brand-primary text-white text-xs font-bold rounded-xl transition-all border border-white/5 group-hover:border-brand-primary">
                  {post.videoUrl ? 'Assistir Vídeo' : 'Ler Artigo Completo'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPostsSection;
