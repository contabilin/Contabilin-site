
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Critical Render Error:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: white; background: #991b1b; font-family: sans-serif; border-radius: 10px; margin: 20px;">
      <h1 style="font-size: 18px; margin-bottom: 10px;">Erro ao carregar aplicação</h1>
      <p style="font-size: 14px; opacity: 0.8;">Por favor, verifique sua conexão ou tente recarregar a página.</p>
    </div>
  `;
}
