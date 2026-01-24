
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const DEFAULT_SYSTEM_INSTRUCTION = `
Você é o assistente virtual "Contabilin AI", especialista em INTELIGÊNCIA FISCAL para o MERCADO DIGITAL, parte da equipe Contabilin Contabilidade Inteligente.
Seu objetivo é converter visitantes em clientes, mostrando como a Contabilin desenha estratégias personalizadas de redução de impostos.

DIRETRIZES:
1. Use formatação Markdown clara.
2. Foco exclusivo em: Devs, Agências, Infoprodutores, Afiliados e Profissionais de Tecnologia.
3. Explique que não aplicamos fórmulas prontas, mas fazemos um diagnóstico para encontrar o menor imposto legal (Anexo III, Lucro Presumido, Isenções de Exportação, etc).
4. Linguagem: Sofisticada, autoritária, direta e focada em "Lucro Blindado".
5. Quando o assunto for economia, sempre sugira nossas ferramentas internas: "Calculadora Simples Nacional" ou "Simulador Fator R".
`;

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[] = [], systemInstruction?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    let text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && groundingChunks.length > 0) {
      const sources = groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => `- [${chunk.web?.title}](${chunk.web?.uri})`)
        .join('\n');
      if (sources) text += `\n\n**Fontes Consultadas:**\n${sources}`;
    }

    return text || "Desculpe, tive um problema ao processar. Pode tentar novamente?";
  } catch (error) {
    console.error("Chat error:", error);
    return "Estou com uma instabilidade momentânea. Que tal falar com nossos especialistas no WhatsApp?";
  }
};

export const generateBlogPost = async (topic: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Crie um artigo de blog épico e técnico sobre: "${topic}".
        
        REQUISITOS OBRIGATÓRIOS PARA SEO (GOOGLE E-E-A-T):
        1. Comprimento: Mínimo de 1500 palavras.
        2. Estrutura: Use H2, H3 para subtópicos detalhados.
        3. Conteúdo Técnico: Inclua exemplos de cálculos, menção a leis reais (ex: Fator R, Anexo III, LC 123/06).
        4. Linkagem Interna OBRIGATÓRIA:
           - Se falar de imposto ou Simples Nacional, insira um box de destaque chamando para a "Calculadora Simples Nacional 2026".
           - Se falar de redução de 15,5% para 6%, chame para o "Simulador Fator R".
           - Se falar de abertura de empresa ou troca de contador, sugira o "Gerador de Proposta Comercial".
           - Ao final, crie uma seção "Leia Também" com sugestões de outros temas correlatos.
        5. Elementos de Conversão: CTAs sutis ao longo do texto levando para o diagnóstico da Contabilin.
        6. O campo "content" deve conter o HTML completo do artigo. Use classes Tailwind se necessário para boxes de destaque (ex: bg-brand-primary/10 border-l-4).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
            readTime: { type: Type.STRING },
            seo: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                keywords: { type: Type.STRING }
              }
            }
          },
          required: ["title", "excerpt", "content", "category"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Post Error:", error);
    return null;
  }
};
