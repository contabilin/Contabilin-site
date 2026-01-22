
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SectionId } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User, Sparkles, Loader2, MessageSquare, Trash2, ShieldCheck } from 'lucide-react';

interface AiAssistantProps {
  customSystemInstruction?: string;
}

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ customSystemInstruction }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: 'Olá! Sou a IA da Contabilin. 🧠💡\n\nSou especialista em contabilidade para o **Mercado Digital e Prestadores de Serviço**.\n\nComo posso te ajudar a pagar menos impostos hoje?' }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    const newUserMessage: Message = { role: 'user', parts: [{ text: textToSend }] };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForGemini = messages.map(m => ({
        role: m.role,
        parts: m.parts
      }));
      
      const responseText = await sendMessageToGemini(textToSend, historyForGemini, customSystemInstruction);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (error) {
        console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, customSystemInstruction]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'model', parts: [{ text: 'Chat reiniciado! Como posso ajudar hoje?' }] }]);
  };

  const quickQuestions = [
    "Redução de imposto para Devs",
    "Fator R no Simples Nacional",
    "Tributação para Infoprodutos",
    "Melhor CNAE para Gestor de Tráfego"
  ];

  return (
    <section id={SectionId.AI_CHAT} className="py-24 bg-gradient-to-b from-[#01040a] to-[#020617] relative border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">IA Especializada</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Tira-Dúvidas Instantâneo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nossa IA foi treinada com as regras fiscais vigentes para o mercado digital e serviços intelectuais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
          {/* Sidebar - Quick Actions */}
          <div className="hidden lg:flex flex-col gap-4">
             <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-white/5 h-full">
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                   <MessageSquare className="w-4 h-4 text-brand-primary" /> Sugestões
                </h4>
                <div className="space-y-3">
                   {quickQuestions.map((q, i) => (
                     <button 
                        key={i} 
                        onClick={() => handleSend(q)}
                        className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-brand-primary/20 hover:border-brand-primary/30 transition-all"
                     >
                       {q}
                     </button>
                   ))}
                </div>
                <button 
                  onClick={clearChat}
                  className="w-full mt-auto flex items-center justify-center gap-2 p-3 text-xs text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Limpar Conversa
                </button>
             </div>
          </div>

          {/* Chat Main Area */}
          <div className="lg:col-span-3 bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm">
            {/* Chat Header */}
            <div className="bg-[#020617]/50 p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Contabilin AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </div>
                    <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">
                      Online
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-primary text-white rounded-tr-none' 
                      : 'bg-[#1e293b] text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    <div className="flex items-start gap-4">
                      {msg.role === 'model' && <Bot className="w-5 h-5 mt-1 shrink-0 text-brand-primary" />}
                      <div className="text-sm leading-relaxed prose prose-invert prose-p:my-2 prose-strong:text-brand-primary prose-ul:my-2">
                        {msg.parts[0].text.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('-') || line.startsWith('*') ? 'pl-4' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                      {msg.role === 'user' && <User className="w-5 h-5 mt-1 shrink-0 text-white/70" />}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start animate-pulse">
                 <div className="bg-[#1e293b] rounded-3xl p-5 border border-white/5 rounded-tl-none flex items-center gap-3">
                   <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
                   <span className="text-sm text-gray-400 font-medium">Analisando legislação...</span>
                 </div>
               </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#020617]/80 border-t border-white/10">
              <div className="relative max-w-3xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Sua dúvida fiscal aqui..."
                  className="w-full bg-[#1e293b] text-white placeholder-gray-500 rounded-2xl pl-6 pr-14 py-5 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 border border-white/5 shadow-inner transition-all"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-3 p-3 bg-brand-primary text-white rounded-xl hover:bg-violet-600 disabled:opacity-50 transition-all shadow-lg shadow-brand-primary/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                 <p className="text-[10px] text-gray-600 flex items-center gap-1 uppercase tracking-widest font-bold">
                   <ShieldCheck className="w-3 h-3" /> Respostas geradas por IA - Sempre consulte um contador
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;
