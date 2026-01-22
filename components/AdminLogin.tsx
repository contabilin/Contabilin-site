
import React, { useState } from 'react';
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { Page } from '../types';

interface AdminLoginProps {
  onLogin: () => void;
  onNavigate: (page: Page) => void;
  validPassword: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onNavigate, validPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === validPassword) {
      onLogin();
      onNavigate('admin');
    } else {
      setError('Senha incorreta. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        <button onClick={() => onNavigate('home')} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-primary/20">
            <Lock className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white">Painel Administrativo</h2>
          <p className="text-gray-400 text-sm mt-2">Acesso restrito para gestão estratégica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Senha de Acesso</label>
            <input
              type="password"
              value={password}
              autoFocus
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 text-center text-2xl tracking-widest"
              placeholder="••••"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          <button type="submit" className="w-full bg-brand-primary hover:bg-violet-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
