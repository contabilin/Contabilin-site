
import React, { useEffect, useState, startTransition } from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight, Search, Youtube, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onReadPost: (post: BlogPost) => void;
  onNavigate: (sectionId: SectionId) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onReadPost, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Ordenar por data mais recente

  const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.category)))];

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
  };

  const handleCategorySelect = (cat: string) => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
  };

  return (
    <div className="pt-32 pb-20 bg-[#020617] min-h-screen">
      
      <div className="relative py-16 mb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Inteligência Fiscal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Central de <span className="text-brand-primary">Conhecimento</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Estratégias de elite para quem escala no mercado digital sem medo do Leão.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12 flex-col md:flex-row gap-6">
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                {categories.map((cat: any) => (
                    <button 
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                            selectedCategory === cat 
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full md:w-80">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="O que você quer resolver hoje?" 
                    className="w-full bg-[#1e293b]/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                />
                <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
        </div>

        {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
                <article 
                    key={post.id} 
                    className="group bg-[#1e293b]/30 border border-white/5 rounded-[2rem] overflow-hidden hover:border-brand-primary/30 transition-all duration-500 hover:bg-[#1e293b]/50 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                    onClick={() => onReadPost(post)}
                >
                <div className="relative h-56 overflow-hidden">
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-brand-primary/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white">
                        {post.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-primary" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-brand-primary" /> {post.readTime}
                        </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary/20 flex items-center justify-center text-xs font-black text-brand-primary">
                                {post.author.charAt(0)}
                            </div>
                            <span className="text-[11px] text-white font-bold">{post.author}</span>
                        </div>
                        <span className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                </article>
            ))}
            </div>
        ) : (
            <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                <Search size={48} className="mx-auto text-gray-700 mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest">Nenhum artigo encontrado para sua busca.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
