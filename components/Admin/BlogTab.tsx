
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Edit, Trash2, X, Save, Sparkles, Loader2, Wand2, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';

import { generateBlogPost } from '../../services/geminiService';
import { blogService } from '../../services/blogService';

const BlogTab: React.FC = () => {
  const { posts, setPosts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<BlogPost>({
    id: '', title: '', excerpt: '', content: '', author: 'Equipe Contabilin', category: 'Tributação', imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1000', readTime: '5 min', date: '', seo: { title: '', description: '', keywords: '' }
  });

  const handleAdd = async () => {
    const success = await blogService.savePost(formData);
    if (success) {
      setPosts([formData, ...posts]);
      setIsModalOpen(false);
    } else {
      alert('Erro ao salvar no Supabase. Verifique a conexão.');
    }
  };

  const handleUpdate = async () => {
    const success = await blogService.savePost(formData);
    if (success) {
      setPosts(posts.map(p => p.id === formData.id ? formData : p));
      setIsModalOpen(false);
    } else {
      alert('Erro ao atualizar no Supabase.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Excluir artigo?')) {
      const success = await blogService.deletePost(id);
      if (success) {
        setPosts(posts.filter(p => p.id !== id));
      } else {
        alert('Erro ao excluir no Supabase.');
      }
    }
  };

  const handleAiGenerate = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    const res = await generateBlogPost(aiTopic);
    if (res) {
      setFormData({
        ...formData,
        title: res.title || '', excerpt: res.excerpt || '', content: res.content || '',
        category: res.category || 'Mercado Digital', seo: res.seo || formData.seo,
        date: new Date().toLocaleDateString('pt-BR')
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2"><FileText className="text-brand-primary" /> Blog & Conteúdo</h2>
        <button
          onClick={() => {
            setFormData({ id: Math.random().toString(36).substr(2, 9), title: '', excerpt: '', content: '', author: 'Equipe', category: 'Digital', imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1000', readTime: '5 min', date: new Date().toLocaleDateString('pt-BR'), seo: { title: '', description: '', keywords: '' } });
            setIsEditing(false); setIsModalOpen(true);
          }}
          className="w-full md:w-auto bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20"
        >
          <Plus size={18} /> Novo Post
        </button>
      </div>

      {/* Lista de Posts: Tabela no Desktop, Cards no Mobile */}
      <div className="hidden md:block bg-[#1e293b]/50 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-black tracking-widest">
            <tr><th className="p-4">Artigo</th><th className="p-4">Categoria</th><th className="p-4 text-right">Ações</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white text-sm font-bold">{post.title}</td>
                <td className="p-4">
                  <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-[10px] font-black uppercase">{post.category}</span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button onClick={() => { setFormData(post); setIsEditing(true); setIsModalOpen(true); }} className="text-gray-500 hover:text-brand-primary"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Layout Mobile (Cards) */}
      <div className="md:hidden space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-[#1e293b]/50 border border-white/5 p-4 rounded-2xl space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-white font-bold text-sm leading-tight flex-1">{post.title}</h3>
              <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-[9px] font-black uppercase whitespace-nowrap">{post.category}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                <Calendar size={12} /> {post.date}
              </div>
              <div className="flex gap-4">
                <button onClick={() => { setFormData(post); setIsEditing(true); setIsModalOpen(true); }} className="text-brand-primary p-2 bg-brand-primary/10 rounded-lg"><Edit size={18} /></button>
                <button onClick={() => handleDelete(post.id)} className="text-red-400 p-2 bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0f172a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 relative custom-scrollbar border border-white/10">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2"><X /></button>
            <h3 className="text-xl md:text-2xl font-black text-white mb-8 tracking-tighter">{isEditing ? 'Editar Post' : 'Criar com Inteligência Artificial'}</h3>

            {!isEditing && (
              <div className="mb-8 p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 space-y-4">
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">O que o Gemini deve escrever?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="Tema do artigo (ex: Fator R para Programadores)" className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                  <button onClick={handleAiGenerate} disabled={isGenerating || !aiTopic} className="bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50 transition-all">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />} Gerar Artigo
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={e => { e.preventDefault(); isEditing ? handleUpdate() : handleAdd(); }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Título do Post</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white font-bold text-sm md:text-lg" placeholder="Digite o título..." required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conteúdo (Suporta HTML/Markdown)</label>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white h-64 md:h-96 font-mono text-xs md:text-sm leading-relaxed" placeholder="Cole seu HTML ou texto aqui..." required />
              </div>
              <button type="submit" className="w-full bg-brand-primary py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-3">
                <Save size={18} /> {isEditing ? 'Salvar Alterações' : 'Publicar no Blog'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTab;
