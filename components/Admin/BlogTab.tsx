
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Edit, Trash2, X, Save, Sparkles, Loader2, Wand2 } from 'lucide-react';
import { BlogPost } from '../../types';
import { generateBlogPost } from '../../services/geminiService';

const BlogTab: React.FC = () => {
  const { posts, setPosts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState<BlogPost>({
    id: '', title: '', excerpt: '', content: '', author: 'Equipe Contabilin', category: 'Tributação', imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1000', readTime: '5 min', date: '', seo: { title: '', description: '', keywords: '' }
  });

  const handleAdd = () => {
    setPosts([formData, ...posts]);
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    setPosts(posts.map(p => p.id === formData.id ? formData : p));
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir artigo?')) setPosts(posts.filter(p => p.id !== id));
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
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FileText /> Blog & Conteúdo</h2>
        <button 
          onClick={() => {
            setFormData({ id: Math.random().toString(36).substr(2,9), title: '', excerpt: '', content: '', author: 'Equipe', category: 'Digital', imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1000', readTime: '5 min', date: new Date().toLocaleDateString('pt-BR'), seo: { title: '', description: '', keywords: '' } });
            setIsEditing(false); setIsModalOpen(true);
          }}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold"
        >
          <Plus size={18} /> Novo Post
        </button>
      </div>

      <div className="bg-[#1e293b]/50 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-black">
            <tr><th className="p-4">Artigo</th><th className="p-4">Categoria</th><th className="p-4 text-right">Ações</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-white/5">
                <td className="p-4 text-white text-sm font-bold">{post.title}</td>
                <td className="p-4 text-xs text-gray-400">{post.category}</td>
                <td className="p-4 text-right space-x-3">
                  <button onClick={() => { setFormData(post); setIsEditing(true); setIsModalOpen(true); }} className="text-gray-500 hover:text-brand-primary"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative custom-scrollbar border border-white/10">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500"><X /></button>
            <h3 className="text-2xl font-bold text-white mb-8">{isEditing ? 'Editar Post' : 'Criar com IA'}</h3>
            
            {!isEditing && (
              <div className="mb-8 p-6 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 space-y-4">
                <p className="text-xs font-bold text-brand-primary uppercase">O que o Gemini deve escrever?</p>
                <div className="flex gap-3">
                  <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="Tema do artigo..." className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  <button onClick={handleAiGenerate} disabled={isGenerating || !aiTopic} className="bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center gap-2">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />} Gerar
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={e => { e.preventDefault(); isEditing ? handleUpdate() : handleAdd(); }} className="space-y-6">
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white font-bold" placeholder="Título" required />
              <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white h-64 font-mono text-sm" placeholder="Conteúdo HTML/MD" required />
              <button type="submit" className="w-full bg-brand-primary py-4 rounded-xl font-bold text-white"><Save /> {isEditing ? 'Atualizar' : 'Publicar'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTab;
