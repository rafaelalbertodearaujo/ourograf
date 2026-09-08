# 🛠️ Ferramentas, Serviços & Regras de Segurança (Tools)

Este documento centraliza as ferramentas homologadas pela agência e as diretrizes de segurança que devem ser estritamente aplicadas no desenvolvimento dos sites.

---

### 🗄️ Backend, Banco de Dados & Autenticação
- **Supabase**: [https://supabase.com/](https://supabase.com/) | Banco PostgreSQL gerenciado, Auth e Storage.
  - ⚠️ *Regra de Segurança:* **SEMPRE habilitar RLS (Row Level Security)** em todas as tabelas. Nunca expor a `SERVICE_ROLE_KEY` no client/frontend (usar apenas a `ANON_KEY` pública com RLS ativo).
- **Firebase**: [https://firebase.google.com/](https://firebase.google.com/) | Autenticação e Firestore gerenciados.
  - ⚠️ *Regra de Segurança:* Configurar regras de segurança restritivas no Firestore/Storage e restringir domínios autorizados.

---

### 💬 Mensageria, WhatsApp APIs & Automação de Agendamentos
- **Evolution API**: [https://evolution-api.com/](https://evolution-api.com/) | API completa e robusta de WhatsApp (Open-Source / Cloud) para envio automático de confirmações, cancelamentos e lembretes de agendamento (ex: 1h antes).
- **Z-API**: [https://z-api.io/](https://z-api.io/) | Gateway transacional de WhatsApp brasileiro com alta taxa de entrega e estabilidade para notificações.
- **n8n**: [https://n8n.io/](https://n8n.io/) | Plataforma de automação de fluxos e webhooks para orquestrar lembretes de data/hora e sincronização entre banco e WhatsApp.

---

### 🛡️ Segurança de Borda, Proteção Anti-Bot & DNS
- **Cloudflare**: [https://www.cloudflare.com/](https://www.cloudflare.com/) | Gerenciamento de DNS, SSL/TLS de ponta a ponta, proteção contra DDoS, WAF (Web Firewall) e ocultação do IP real do servidor.
- **Cloudflare Turnstile**: [https://www.cloudflare.com/products/turnstile/](https://www.cloudflare.com/products/turnstile/) | Proteção anti-spam/anti-bot inteligente para formulários de contato e captação de leads, sem CAPTCHA invasivo.

---

### 🖼️ Mídia, Imagens & CDN
- **ImageKit**: [https://imagekit.io/](https://imagekit.io/) | Otimização e entrega automática de imagens em formato WebP/AVIF via CDN global, com suporte a URLs assinadas e proteção de storage original.

---

### 🤖 IA Generativa, Vídeo & Mídia Criativa
- **Higgsfield AI**: [https://higgsfield.ai/](https://higgsfield.ai/) | Criação e animação de vídeos/personagens por IA para backgrounds e materiais publicitários de alto impacto.

---

### 🚀 Hospedagem & Deploy Rápido
- **Vercel**: [https://vercel.com/](https://vercel.com/) | Deploy automatizado com CI/CD, SSL automático, isolamento Serverless/Edge e cabeçalhos de segurança pré-configuráveis.

---

### 📦 Micro-Bibliotecas Frontend Homologadas (Client-Side)
> ⚠️ **Critério Rigoroso de Homologação:** Permitidas apenas se forem **< 20 KB (gzipped)**, **zero dependências**, **sem build step (npm)** e para resolver dores onde o Vanilla puro traz alto risco de bugs em dispositivos móveis (ex: inércia touch no Safari iOS ou máscaras de teclado virtual). Documentação em `premium-web-design/patterns/approved-js-libraries.md`.

- **Splide.js**: Sliders touch e carrosséis com acessibilidade WCAG nativa.
- **IMask.js**: Máscara restritiva de WhatsApp/Telefone brasileiro, CPF e moedas sem falhas de autocomplete.
- **Lenis**: Rolagem suave inercial para marcas de luxo/arquitetura (com fallback obrigatório de redução de movimento).
- **Canvas-Confetti**: Micro-interação de celebração pós-conversão no WhatsApp.
- **Lucide Icons**: Ícones vetoriais leves e semânticos.

🚫 **Lista de Veto Rigoroso:** Banidos React, Vue, Angular, Svelte, jQuery, Framer Motion, Tailwind CDN e GSAP completo em landing pages e sites de clientes locais.
