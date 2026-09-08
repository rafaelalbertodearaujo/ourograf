<!--
## CHANGELOG — Web Standards
| Versão | Data       | Autor | Mudança                                                   |
| :----- | :--------- | :---- | :-------------------------------------------------------- |
| v1.7.0 | 2026-09-08 | AGY   | Padrões de Formulários Multi-Etapa (Wizard com botão      |
|        |            |       | 'Voltar' bidirecional, TTL de cache em localStorage,      |
|        |            |       | validação estrita de cidades, validação profunda de DDD,  |
|        |            |       | telefones BR e CPF), Padrão Canônico de Links e Mensagens |
|        |            |       | do WhatsApp (api.whatsapp.com sem 302, anti-mojibake) e   |
|        |            |       | Affordances Touch permanentes sem dependência de :hover.  |
| v1.6.0 | 2026-09-04 | AGY   | Blindagem Anti-Slop V2 (AP-14 a AP-19): Proibição de Glow |
|        |            |       | artificial, hover hiperativo, bordismo de caixas, gradiente|
|        |            |       | em texto, fontes de fantasia em gastronomia e clutter.    |
| v1.5.0 | 2026-09-04 | AGY   | Blindagem Anti-One-Shot, Protocolo de Correção Cirúrgica  |
|        |            |       | e Gate de Pesquisa com prova real.                        |
| v1.4.0 | 2026-09-04 | AGY   | Linter Estático Pré-Entrega (static-qa.js), Speculation   |
|        |            |       | Rules API, View Transitions nativas e Padrão GEO Schema.  |
| v1.1.0 | 2026-09-03 | AGY   | Modern CSS 2026 (dvh, text-wrap, prefers-reduced-motion,  |
|        |            |       | hover queries), e blindagem contra o Novo AI Slop 2026.   |
| v1.0.0 | 2026-09-03 | AGY   | Versão inaugural — compilação de todas as invariantes      |
|        |            |       | técnicas espalhadas no ecossistema (agency-flow,           |
|        |            |       | site-refactoring-engine, premium-web-design,               |
|        |            |       | ui-principles, ux-principles, windows-and-assets-safety).  |
-->

# 📐 Web Standards — Invariantes Técnicas do Ecossistema

> **Escopo:** Este arquivo é a fonte única de verdade para todas as regras técnicas obrigatórias de desenvolvimento frontend da agência. Ele é referenciado pelo `agency-flow.md` (Passos 4 e 5), pela `site-refactoring-engine` (Seções 2, 3, 3.5, 5) e pela `premium-web-design` (Seção 5). Qualquer contradição entre skills e este arquivo deve ser resolvida a favor deste documento.

---

## 1. Favicons e Ícones de Marca

Todo projeto entregue DEVE conter o conjunto completo de ícones de marca:

| Formato | Arquivo | Uso |
| :--- | :--- | :--- |
| **SVG** | `favicon.svg` | Browsers modernos — vetorial, suporta dark mode via `prefers-color-scheme` |
| **ICO** | `favicon.ico` | Fallback legacy (IE, bookmarks Windows). Conter 16×16 e 32×32 |
| **PNG** | `favicon-192.png`, `favicon-512.png` | Android Chrome, PWA splash screen |
| **Apple Touch Icon** | `apple-touch-icon.png` (180×180) | Safari iOS — adicionado à Home Screen |
| **Web Manifest** | `site.webmanifest` | Declarar `icons[]` com os PNGs acima para PWA |

**Implementação mínima no `<head>`:**
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

**Regra:** Nenhum projeto pode ser declarado "pronto" sem este conjunto. A verificação de favicons faz parte do Passo 5 (QA) do `agency-flow.md`.

---

## 1.1 Descoberta Semântica para IA e SEO (`llms.txt`, `robots.txt`, `sitemap.xml`)

Todo site entregue pela agência DEVE conter os arquivos canônicos de indexação e alimentação para motores de busca e modelos de linguagem (LLMs):

### O Padrão Oficial `llms.txt` (Raiz do Site)
O arquivo `/llms.txt` é o padrão moderno adotado para fornecer contexto estruturado, limpo e direto sobre o negócio do cliente para agentes de inteligência artificial (ChatGPT Search, Perplexity, Claude, Gemini).

**Estrutura Canônica Obrigatória do `llms.txt`:**
```markdown
# [Nome da Empresa / Projeto] - [Proposta de Valor em 1 Linha]

> Documentação estruturada para modelos de linguagem (LLMs) e agentes de IA sobre [Nome da Empresa], [Nicho de Atuação] localizado em [Cidade/Estado].

## Visão Geral do Negócio
[Descrição factual em 1 ou 2 parágrafos: produtos/serviços oferecidos, diferenciais técnicos, público-alvo e modelo comercial].

## Estrutura do Website
- `/index.html`: Página principal com [listar seções chave].
- `/404.html`: Página de erro personalizada com redirecionamento.
- `/sitemap.xml`: Mapa de indexação para motores de busca.
- `/robots.txt`: Diretivas de rastreamento de bots.

## Serviços & Produtos Principais
- **[Serviço 1]:** [Descrição concisa e benefícios práticos].
- **[Serviço 2]:** [Descrição concisa e benefícios práticos].

## Informações Operacionais & Contato
- **Cidade/Região:** [Localização ou "Atendimento Nacional"].
- **Canal de Contato Comercial:** WhatsApp oficial: [Número com DDD].
- **Horário de Funcionamento:** [Janelas de atendimento].
```

**Regra:** A presença de `llms.txt`, `robots.txt` e `sitemap.xml` é item obrigatório do Passo 5 (QA) do `agency-flow.md`.

---

## 2. Responsividade Mobile Definitiva

Estas regras são **inegociáveis** e devem ser aplicadas em todo bloco de código antes da entrega.

### 2.1 Touch Targets (WCAG 2.5.5)
- Todo elemento interativo (botões, links de navegação, dias de calendário, toggles) DEVE ter área de toque mínima de **44×44px**.
- Declarar variável global: `--touch-min: 44px;`
- Aplicar via `min-height: var(--touch-min)` e `min-width: var(--touch-min)` conforme necessário.

### 2.2 Tipografia Fluida
- Títulos e textos de destaque DEVEM usar `clamp()` para escala fluida:
  ```css
  font-size: clamp(2.2rem, 5vw + 1rem, 4.5rem);
  ```
- **NUNCA** usar `font-size` fixo em px para headings. Isso causa quebras de layout no mobile.

### 2.3 Overflow Horizontal
- O `<html>` e o `<body>` DEVEM declarar:
  ```css
  html, body { overflow-x: hidden; }
  ```
- Tabelas que excedem a largura do viewport devem usar `overflow-x: auto` no wrapper com indicador visual de rolagem.

### 2.4 Safe Areas (iPhone)
- Em painéis fullscreen, modais, Bottom Bars e Sticky CTAs:
  ```css
  padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom));
  padding-top: calc(var(--space-md) + env(safe-area-inset-top));
  ```
- O uso de `env(safe-area-inset-*)` é **inegociável** para evitar sobreposição pela Dynamic Island / Home Indicator.

### 2.5 Paddings Laterais
- Containers no viewport mobile DEVEM ter padding lateral mínimo de **16–20px** para impedir que texto encoste nas bordas da tela.
  ```css
  .site-container { padding-inline: max(16px, 5vw); }
  ```

### 2.6 Layout Responsivo (Colunas)
- Grids e colunas de 2+ itens DEVEM converter para `flex-direction: column` em viewports < 768px.
- Usar `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` como padrão ouro para listagens.

### 2.7 Breakpoints Oficiais
| Breakpoint | Valor | Uso |
| :--- | :--- | :--- |
| Mobile | `375px` | Referência mínima (iPhone SE, telas pequenas) |
| Tablet | `768px` | Transição de layout de coluna única para multi-coluna |
| Desktop | `1024px` | Layout completo com sidebar/grid multi-coluna |

### 2.8 Sticky Bottom Bars
- Barras fixas no rodapé mobile NUNCA devem sobrepor conteúdo real sem compensação:
  ```css
  body { padding-bottom: calc(var(--sticky-bar-height) + env(safe-area-inset-bottom)); }
  ```
- O Footer principal não pode ficar encoberto pela Sticky Bottom Bar.

### 2.9 Viewport Dinâmica (Dynamic Viewport Height - dvh)
- Em Heros de tela cheia, modais e gavetas (drawers) mobile, é **OBRIGATÓRIO** o uso de `dvh` em vez de `vh`:
  ```css
  min-height: 100dvh; /* ou height: 100dvh */
  ```
- **Motivo:** No Safari iOS e Chrome Android, a barra de navegação retrátil encolhe e expande durante o scroll. O uso de `100vh` clássico corta o conteúdo inferior (CTAs) ou causa saltos bruscos.

### 2.10 Tipografia Equilibrada Nativa (Anti-Órfãs)
- Títulos (`h1`, `h2`, `h3`, `.display-text`) DEVEM usar:
  ```css
  text-wrap: balance;
  ```
- Parágrafos de introdução e blocos de texto curtos DEVEM usar:
  ```css
  text-wrap: pretty;
  ```
- **Motivo:** O browser calcula matematicamente a melhor quebra de linha no mobile, impedindo que uma única palavra fique isolada na linha final ("viúva") sem a necessidade de hacks de `&nbsp;`.

### 2.11 Interações Seguras de Hover em Touch
- Efeitos complexos de `:hover` (zoom, transformações ou overlays de cor) DEVEM ser isolados com a media query de precisão:
  ```css
  @media (hover: hover) and (pointer: fine) {
    .card:hover { transform: translateY(-4px); }
  }
  ```
- **Motivo:** Dispositivos touch interpretam o primeiro toque como `:hover` e apenas o segundo toque como `click` ("double-tap bug"), criando a percepção de botão quebrado.

### 2.12 Respeito a Movimento Reduzido (Acessibilidade Vestibular)
- Toda animação CSS (`@keyframes`, transições longas > 300ms, parallax ou rotações) DEVE conter fallback estático:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### 2.13 Estabilidade de Orientação no Safari iOS
- O seletor `html` DEVE conter:
  ```css
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  ```
- **Motivo:** Impede que o iOS Safari altere arbitrariamente o tamanho das fontes ao girar o aparelho para modo paisagem.

### 2.14 Affordances Interativas em Mobile / Touch (Anti-Dependência de :hover)
- Dicas visuais, badges flutuantes ou botões de ação que no desktop aparecem apenas no `:hover` (ex: "Ampliar Foto", "Ver Detalhes", zoom preview) **DEVEM SER EXIBIDOS PERMANENTEMENTE** em telas touch e dispositivos móveis:
  ```css
  /* Desktop: hover suave */
  .card-action-hint {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .card:hover .card-action-hint,
  .card:focus-visible .card-action-hint {
    opacity: 1;
    transform: translateY(0);
  }

  /* Touch / Mobile: visível em 100% dos cards sem depender de hover */
  @media (hover: none), (max-width: 768px) {
    .card-action-hint {
      opacity: 1;
      transform: translateY(0);
      pointer-events: none;
    }
  }
  ```
- **Motivo:** Telas de toque não possuem mouse hover. Se a dica depender de `:hover`, o usuário mobile nunca saberá que a foto ou card é clicável/ampliável.
- **Feedback Tátil & Acessibilidade:** Cards ou imagens que abrem modais devem conter `:active { transform: scale(0.985); }`, `role="button"`, `tabindex="0"` e suporte aos botões Enter e Espaço via teclado.

---

## 3. Tipografia e Acessibilidade

### 3.1 Font-size Mínimo
- O `font-size` mínimo para texto interativo (inputs, selects, textareas) e body text é **16px** (`1rem` ou `0.9375rem` = 15px como piso absoluto).
- **Motivo:** Safari iOS aplica auto-zoom em inputs com `font-size < 16px`, destruindo a UX mobile.

### 3.2 Contraste WCAG AA (Obrigatório)
| Tipo de Texto | Ratio Mínimo |
| :--- | :--- |
| Body text (< 24px / < 18.66px bold) | **4.5:1** |
| Texto grande (≥ 24px ou ≥ 18.66px bold) | **3:1** |

- As duas combinações mais críticas de cor (texto principal sobre fundo, texto CTA sobre botão) devem ser verificadas a cada entrega.
- Texto decorativo sem informação funcional pode ser isento, mas DEVE ter `aria-hidden="true"`.

### 3.3 Root Font-Size (Anti-Pattern Proibido)
- **NUNCA** declarar `font-size` fixo no `html` root:
  ```css
  /* ❌ PROIBIDO — destrói acessibilidade */
  html { font-size: 16px; }

  /* ✅ PERMITIDO */
  html { font-size: 100%; }
  /* ou simplesmente não declarar */
  ```
- Isso destrói a configuração de acessibilidade de usuários que aumentam a fonte do sistema.

### 3.4 Largura de Leitura
- Blocos de texto corrido DEVEM respeitar:
  ```css
  max-width: 65ch;
  ```
- Isso garante uma medida de leitura confortável (45–75 caracteres por linha) em qualquer viewport.

---

## 4. Formulários e Segurança

### 4.1 Debounce Anti-Double-Click
- Todo `<button type="submit">` DEVE ter lógica de debounce com mínimo de **1.5 segundos** de cooldown:
  ```js
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    btn.disabled = true;
    btn.classList.add('loading');
    // ... lógica de envio ...
    setTimeout(() => { btn.disabled = false; btn.classList.remove('loading'); }, 1500);
  });
  ```

### 4.2 Validação de Inputs
- **Nomes:** Regex proibindo números:
  ```js
  /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/
  ```
- **Telefone BR:** Máscara obrigatória no formato `(XX) 9XXXX-XXXX`:
  ```js
  input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = v;
  });
  ```
- Campos de telefone: `type="tel"` + `inputmode="numeric"`.
- Campos de email: `type="email"`.
- Nenhum campo obrigatório pode usar apenas `placeholder` como label — DEVE haver `<label>` explícito associado via `for`/`id`.

### 4.3 Segurança XSS e Sanitização Obrigatória no Front-End
- **Regra Geral:** Em Vanilla JS, **NUNCA** use `innerHTML` com dados oriundos de inputs do usuário, query parameters (`location.search`), dados de banco (`Supabase`/`Firestore`) ou APIs externas sem sanitização prévia.
- **Preferência por `textContent`:** Para inserir texto em elementos simples, use **estritamente** `el.textContent = valor` ou `document.createTextNode()`.
- **Helper Canônico de Escape:** Quando for estritamente necessário interpolar strings em templates HTML (ex: listas dinâmicas, formatações de WhatsApp com `<strong>` e `<br>`), utilize obrigatoriamente o helper padrão da agência:
  ```javascript
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  ```
- **Helper Canônico para URLs Seguras (`safeHref`):** Sempre que um `href` for construído dinamicamente com dados de banco (Supabase, Firebase) ou de input, use `safeHref()` antes de atribuir ao elemento. **Nunca** use `el.setAttribute('href', dadoDoBanco)` sem sanitização:
  ```javascript
  function safeHref(url) {
    try {
      const parsed = new URL(url, location.origin);
      // Bloqueia qualquer protocolo que não seja http, https, tel, mailto
      if (!['http:', 'https:', 'tel:', 'mailto:'].includes(parsed.protocol)) {
        return '#'; // fallback seguro
      }
      return parsed.href;
    } catch {
      return '#';
    }
  }
  ```
- **Módulo Compartilhado:** Os helpers `escapeHtml` e `safeHref` estão centralizados no módulo compartilhado `sites/.design-system/utils.js` para importação via ES Modules (`import { escapeHtml, safeHref } from '../.design-system/utils.js'`).
- **Painéis Administrativos (Stored XSS):** Painéis e dashboards que exibem agendamentos, nomes de clientes e observações enviadas publicamente pelo site DEVEM sanitizar todos os campos com `escapeHtml()` antes de gerar o HTML de tabelas e cards.
- **Links Externos:** **SEMPRE** use `encodeURIComponent()` ao gerar links com parâmetros dinâmicos (ex: links `https://wa.me/PHONE?text=...`).
- **Autenticação Front-End & Rate Limiting:** Telas de login ou modais de PIN administrativo DEVEM implementar bloqueio temporário (ex: 5 tentativas incorretas bloqueiam por 30s) para impedir ataques de força bruta no navegador persistido em `sessionStorage`.

### 4.4 Estados de Formulário (Proibição de alert())
- Todo formulário DEVE implementar os seguintes estados visuais inline:
  ```
  default → loading (spinner/texto alternativo + cursor: not-allowed)
           → success (mensagem de confirmação inline)
           → error (mensagem de erro inline com destaque no campo)
  ```
- O uso de `window.alert()` nativo do browser é **ESTRITAMENTE PROIBIDO**.
- O handler JS de submit deve executar `btn.classList.add('loading')` antes do `await` e `btn.classList.remove('loading')` no `finally`.
- A validação no submit deve destacar o primeiro campo inválido (`.error` + `border-color: var(--color-error)`) e executar `campo.scrollIntoView({ behavior: 'smooth', block: 'center' })`.

### 4.5 Focus Visible
- A pseudo-classe `:focus-visible` NUNCA deve ser removida ou zerificada (`outline: none` global é proibido).
- Elementos interativos devem ter um estilo de foco visível e distinguível.

### 4.6 Formulários Multi-Etapa (Wizard): Navegação Bidirecional ("Voltar") Obrigatória
- Todo formulário segmentado em 2 ou mais etapas (Passos 1, 2, 3...) **DEVE conter botão de retorno ("Voltar")** nos passos subsequentes (Passo 2 em diante).
- O botão "Voltar" DEVE ter `type="button"` (nunca submit), restaurar a etapa anterior com foco no primeiro campo, e sincronizar a barra de progresso visual (rollback proporcional).
- O ato de voltar **NUNCA** deve disparar validações de erro ou limpar os dados já preenchidos pelo usuário.
- **Ergonomia Mobile:** Em telas < 768px, botões "Avançar" e "Voltar" devem ter área de toque ≥ 44px, preferencialmente empilhados (com o CTA principal no topo) ou dispostos lado a lado com proporção equilibrada.

### 4.7 TTL de Cache de Formulário em LocalStorage
- Formulários que salvam rascunho de inputs no `localStorage` **DEVEM implementar TTL (Time-To-Live)** de expiração (padrão da agência: **2 horas** = `2 * 60 * 60 * 1000` ms).
- **Proibição de Cache Eterno:** É terminantemente proibido persistir dados sem timestamp de expiração. Se o usuário retornar dias depois, rascunhos antigos devem ser descartados para evitar autopreenchimento de dados obsoletos ou de testes.
- **Limpeza no Submit:** Assim que o formulário for enviado com sucesso, o cache no `localStorage` DEVE ser imediatamente destruído (`localStorage.removeItem(CACHE_KEY)`).

### 4.8 Validação Estrita de Cidades / Municípios em Autocomplete (Anti-Fragmentos)
- Quando o formulário utilizar campo de busca/autocomplete de cidades com base local (`cidades.json`), a validação de avanço ou submit DEVE ser **estrita**:
  - Se o usuário apenas digitar um fragmento incompleto (ex: `"capin"`, `"são"`) e clicar em "Avançar" ou "Enviar" sem selecionar a sugestão ou sem digitar o nome exato no formato `"Cidade / UF"`, o formulário **DEVE bloquear o avanço**, exibir mensagem de erro inline e focar o campo.
  - A validação deve comparar a string digitada com a base oficial de municípios carregada via `Set` ou `includes()`.

### 4.9 Validação Profunda de DDDs e Telefones Brasileiros (Anti-Fakes)
- Além da máscara de digitação `(XX) 9XXXX-XXXX`:
  - **Validação de DDD Oficial:** Verificar se os 2 primeiros dígitos pertencem à lista oficial de DDDs da Anatel (bloquear DDDs inexistentes como `00`, `01`, `09`, `20`, `23`, `25`, `26`, `29`, `36`, `39`, `52`, `56`, `57`, `58`, `59`, `72`, `76`, `78`, `90`).
  - **Nono Dígito para Celular:** Celulares com DDD brasileiro devem ter 11 dígitos no total e o 3º dígito (primeiro do número) obrigatoriamente igual a `9`.
  - **Bloqueio de Números Repetidos Falsos:** Rejeitar telefones compostos pelo mesmo dígito repetido (ex: `(11) 99999-9999`, `(21) 98888-8888`, `(49) 91111-1111`).

### 4.10 Validação Algorítmica de CPF (Módulo 11)
- Caso o formulário solicite CPF, é proibido validar apenas a quantidade de 11 dígitos.
- O validador DEVE executar o algoritmo oficial da Receita Federal (cálculo ponderado dos 2 dígitos verificadores via módulo 11) e bloquear sequências repetidas conhecidas (`000.000.000-00`, `111.111.111-11`, etc.).

---

## 5. Performance e Assets

### 5.1 Vídeos
- Tamanho máximo: **2MB** por vídeo após compressão.
- Ferramenta obrigatória: **Handbrake** para compressão.
- Micro-animações devem ser convertidas para **WebP animado** via **Ezgif**.
- É PROIBIDO subir vídeos crus para o HTML sem compressão.

### 5.2 Imagens
- Formato preferencial: **WebP** para todas as imagens de conteúdo.
- Fallback em JPEG/PNG somente quando necessário para compatibilidade.
- Usar `<picture>` com `<source type="image/webp">` quando aplicável.

### 5.3 Links Estáveis (Anti-404)
- **NUNCA** usar links dinâmicos do Unsplash (`source.unsplash`, query strings como `?q=80&w=800`) em produção.
  - Motivo: Rate-limiting severo, falhas de carregamento, buracos na UI.
- **SEMPRE** usar links estáticos absolutos de CDNs confiáveis (**Pexels**) ou baixar fisicamente a imagem para o repositório.

### 5.4 Google Fonts (Preconnect Obrigatório)
- Sempre incluir tags de `preconnect` ao carregar fontes externas:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

### 5.5 Unidades Responsivas
- Dimensões de layout (larguras, alturas, gaps, paddings, margins) usam `rem`, `%`, `fr` ou `clamp()`.
- Valores em `px` são reservados para bordas, sombras e espessuras decorativas ≤ 4px.
- Qualquer uso de `px` > 4 em dimensões de layout deve ter justificativa documentada: `/* px-lock: [razão] */`.

### 5.6 Consistência de Tokens
- Nenhum valor literal de cor (`#hex` / `rgb()`), espaçamento, sombra, z-index ou border-radius pode aparecer fora do bloco `:root` ou `primitives.css`.
- Componentes DEVEM usar exclusivamente variáveis do Design System:
  - Cores: `var(--color-*)`
  - Espaçamento: `var(--space-*)`
  - Sombras: `var(--shadow-*)`
  - Z-index: `var(--z-*)`
  - Border-radius: `var(--radius-*)`
- Exceções permitidas: `0`, `100%`, `auto`, `inherit`, `transparent`, `currentColor`.

### 5.7 Diretriz de Superfícies & Ritmo Visual (Anti-AI Slop Sem Generalização - Edição 2026)
- **Cores Sólidas São Bem-Vindas:** É perfeitamente normal e saudável ter blocos, faixas ou seções inteiras com cor sólida (ex: off-white, verde escuro, cinza neutro). Cores sólidas dão respiro visual e contraste ("descanso para os olhos").
- **O Que Realmente É Slop:** O problema é quando o **site inteiro de ponta a ponta** é um bloco escuro puramente chapado (`#000000`/`#0a0a0a`/`#09090b`), parecendo um template inacabado sem profundidade, ou quando se tenta usar glassmorphism em cima de um fundo onde não há nada passando atrás.
- **Texturas São Ferramentas de Contexto (Não Carimbo Obrigatório):**
  - **NÃO force dot-grid em todo site:** Pontos, grades ou malhas só devem entrar onde fizerem sentido para o nicho (ex: gráfica, tech, logística) ou em seções estratégicas de transição/destaque (Hero, métricas, banners).
  - Outros nichos podem usar apenas **respiro de cor sólida bem calibrada**, **gradientes suaves de iluminação**, ou um **micro-grain sutil**, sem nenhuma grade de pontos.
  - O catálogo `modelos-backgrounds-aprovados.md` é um **menu de opções sob demanda**, não uma fórmula matemática para colar em todo projeto.
- **Proibição de Gradiente Roxo/Ciano Genérico:** Permanece vetado o uso de gradientes clichês de IA (`from-indigo/purple to-cyan`). Cores devem emanar da paleta da marca em espaço perceptual.
- **Blindagem contra o "Novo AI Slop" (2025/2026):**
  - **Proibição de Bento Grid Homogêneo Automático (AP-10):** Não divida conteúdos heterogêneos em caixas pretas com bordas idênticas de 1px por preguiça de diagramar. Se usar Bento, ele DEVE ter materialidade e assimetria intencional (imagens sobrepondo bordas, variação de escala).
  - **Proibição de Pill Badges Pulsantes no Hero (AP-11):** Vetado o uso de pílulas `[🟢 Status/Novidade]` acima do H1 para preencher espaço em branco. Use *Eyebrow Text* tipográfico ancorado à marca.
  - **Proibição de Border-Beam em Loop Contínuo (AP-12):** Gradientes girando na borda de múltiplos botões sem parar são vetados. O dinamismo visual deve ser ativado por interação do usuário (`:hover`, `:focus`).
  - **Proibição de Ícones Genéricos em Squircles Cinzas (AP-13):** Não preencha grids de benefícios com ícones Lucide/Heroicons isolados em círculos cinzas. Use tipografia forte, números em escala ou micro-ilustrações de marca.
  - **Proibição de Efeito Glow Artificial em Nichos Tradicionais (AP-14):** Vetado o uso de halos fluorescentes, sombras com brilho colorido (`--shadow-glow`, `box-shadow: 0 0 16px rgba(accent, 0.3)`) e névoas de neon em gastronomia, choperias, marcenarias, saúde e negócios locais. Glow é estritamente restrito a arquétipos Cyberpunk/Tech Noir/SaaS futurista.
  - **Proibição de Hover Hiperativo em Cards Estáticos (AP-15):** Vetado aplicar `translateY(-3px)`, expansão de sombra ou acendimento de borda em caixas meramente informativas (cards de benefícios, diferenciais, FAQ). Efeitos de movimento no hover pertencem exclusivamente a elementos com affordance de clique direto (botões e links). Cards estáticos devem permanecer visualmente repousados e serenos.
  - **Proibição de Bordismo Colorido / Wireframing Compulsivo (AP-16):** Vetado contornar todas as caixas, grids, ícones e containers com bordas coloridas finas de 1px (`var(--color-border-accent)`). O design de alto padrão diferencia containers por meio de contraste suave de superfícies (`--color-surface` sobre `--color-bg`), respiro espacial generoso e tipografia hierárquica, nunca enjaulando cada componente em molduras coloridas.
  - **Proibição de Epidemia de Gradientes & Falso Ouro em Texto (AP-17):** Vetado o uso de gradientes em texto (`-webkit-background-clip: text` simulando ouro/cobre brilhante) e empilhamento de múltiplos gradientes radiais em backgrounds de páginas institucionais. Textos nobres usam cores sólidas de altíssimo contraste (WCAG AAA); backgrounds devem ter materialidade física limpa e autêntica.
  - **Proibição de Tipografia Teatral/Fantasia Desconectada (AP-18):** Vetado o uso de fontes imperiais, romanas ou medievais (ex: `Cinzel`, `MedievalSharp`) em estabelecimentos gastronômicos modernos por mero apego à palavra "tradição". Cervejarias e gastrobares autênticos utilizam tipografias industriais, slab-serifs clássicas de pub ou neo-grotescas robustas (ex: `Fraunces`, `Barlow`, `Oswald`, `Zilla Slab`, `Playfair`).
  - **Proibição de Sobrecarga de Micro-elementos / Horror Vacui (AP-19):** Vetado empilhar eyebrow + título + subtítulo + badge + ícone + divisor na mesma dobra por medo do espaço vazio. A IA deve respeitar o espaço negativo e o foco editorial (mínimo de 64px de respiro entre blocos sem adornos desnecessários).

---

## 6. UX Audit Gate (Checklist Formal)

Este checklist DEVE ser executado sobre a página montada completa antes de declarar o projeto "pronto":

- [ ] **Hierarquia visual:** H1 → H2 → body text claramente distinguível (tamanho, peso, cor)
- [ ] **Tipografia equilibrada:** `text-wrap: balance` em títulos e `text-wrap: pretty` em parágrafos curtos
- [ ] **Viewport dinâmica:** `min-height: 100dvh` em Heros e modais mobile (zero bugs de barra retrátil no Safari)
- [ ] **Ritmo de Superfície & Contraste:** O site não é um monobloco escuro chapado de ponta a ponta; há alternância intencional entre seções sólidas e seções com iluminação/textura quando o nicho pedir
- [ ] **CTAs por viewport:** Máximo 2 CTAs primários visíveis simultaneamente por viewport. CTA secundário deve ter contraste visual explicitamente menor (outline, tamanho menor, cor de menor destaque)
- [ ] **Labels de botões:** Verbo de ação consistente em todo o site (não misturar "Saiba mais", "Veja mais", "Confira", "Clique aqui")
- [ ] **Zero Pill Badges Decorativos:** Nenhum badge `[🟢 ...]` artificial no topo da dobra
- [ ] **Zero Loops de Border-Beam:** Nenhum botão ou card secundário com gradiente girando continuamente sem hover
- [ ] **Formulários com estados:** Loading (spinner + cursor not-allowed), sucesso (mensagem inline) e erro (destaque no campo) — sem `alert()` nativo
- [ ] **Formulários Multi-Etapa:** Botão 'Voltar' funcional em todas as etapas subsequentes, rollback sincronizado de progresso, TTL de cache (2h) e validação estrita de cidades
- [ ] **Links do WhatsApp:** Endpoint direto `api.whatsapp.com/send` para mensagens com quebras de linha (zero `wa.me` com redirect 302) e formatação com marcadores universais (zero emojis de 4 bytes corrompidos)
- [ ] **:focus-visible:** Não removido — outline visível em navegação por teclado
- [ ] **Blocos de texto:** `max-width: 65ch` aplicado em parágrafos e texto corrido
- [ ] **Affordances em touch/mobile:** Dicas de ação e ampliação ("Ampliar Foto") visíveis permanentemente em telas touch (`@media (hover: none), (max-width: 768px)`), sem depender de hover
- [ ] **Ritmo visual:** Nenhuma sequência de 3+ seções `[DENSA]` consecutivas (grid, lista, tabela, cards múltiplos)
- [ ] **Prefers-reduced-motion:** Fallback estático implementado para todas as animações e transições

---

## 7. Accessibility Audit Gate (Formato Tabular Formal)

Cada problema de acessibilidade encontrado DEVE ser documentado no seguinte formato antes da correção:

```
┌───────────────────┬───────────────────────────────────────────────────┐
│ Problema          │ [descrição objetiva do problema encontrado]       │
├───────────────────┼───────────────────────────────────────────────────┤
│ Princípio violado │ [WCAG X.X.X — nome do critério]                  │
├───────────────────┼───────────────────────────────────────────────────┤
│ Impacto           │ [quem é afetado e como]                          │
├───────────────────┼───────────────────────────────────────────────────┤
│ Correção proposta │ [ação técnica concreta e verificável]            │
├───────────────────┼───────────────────────────────────────────────────┤
│ Validação         │ [critério mensurável para confirmar resolução]   │
└───────────────────┴───────────────────────────────────────────────────┘
```

**Exemplo:**

| Campo | Valor |
| :--- | :--- |
| **Problema** | Texto `--color-text-muted` (#888888) sobre fundo `--color-bg` (#FAFAFA) tem ratio 3.40:1 |
| **Princípio violado** | WCAG 1.4.3 — Contraste Mínimo |
| **Impacto** | Usuários com baixa visão, daltonismo ou em telas ao sol não conseguem ler o texto |
| **Correção proposta** | Escurecer `--color-text-muted` para #737373 (ratio 4.54:1) no archetype CSS |
| **Validação** | Contrast ratio ≥ 4.5:1 confirmado via WebAIM Contrast Checker |

**Critérios mínimos a auditar:**
1. Contraste de `--color-text` sobre `--color-bg` (≥ 4.5:1)
2. Contraste de `--color-text-muted` sobre `--color-bg` (≥ 4.5:1)
3. Contraste de `--color-text-light` sobre `--color-bg` (≥ 4.5:1 para body, ≥ 3:1 se usado apenas em texto grande)
4. Contraste de texto de CTA sobre `--color-accent` (≥ 3:1 para texto grande)
5. Presença de `<label>` explícito em todos os campos de formulário
6. Presença de `alt` descritivo em todas as `<img>` (exceto decorativas com `alt=""` + `aria-hidden="true"`)
7. Ordem de foco lógica via Tab (sem `tabindex` > 0)
8. `aria-hidden="true"` em textos puramente decorativos

---

## 8. Responsividade de Página Completa Gate (Verificação Manual pelo Usuário)

Este gate é **separado e adicional** à verificação CSS por bloco isolado. Deve ser executado com a página completa montada.

> 🚫 **PROIBIÇÃO DE TESTES AUTOMATIZADOS:** A IA é expressamente proibida de rodar testes automatizados de browser (Playwright, Puppeteer, Selenium, etc.). A conferência deve ser solicitada diretamente ao usuário.

### 8.1 Viewports Obrigatórios para o Usuário
O usuário deve conferir manualmente no navegador:
| Viewport | Resolução | Representa |
| :--- | :--- | :--- |
| Mobile | **375px** | iPhone SE / Android compacto |
| Tablet | **768px** | iPad Mini / tablets 8" |
| Desktop | **1024px** | Laptop 13" / telas normais |

### 8.2 Procedimento Solicitado ao Usuário
1. O usuário abre o arquivo no seu navegador (ex: Chrome, Edge, Safari).
2. Abre o DevTools (F12) e ativa o modo Device Toolbar (Ctrl+Shift+M).
3. Seleciona os viewports e confirma:
   - [ ] Nenhum overflow horizontal (scroll lateral)
   - [ ] Texto não encosta nas bordas da tela
   - [ ] Imagens e vídeos não extravasam o container
   - [ ] Botões e CTAs com área de toque ≥ 44px
   - [ ] Formulários usáveis sem zoom
   - [ ] Menu hambúrguer funcional e acessível
   - [ ] Footer completamente visível (não encoberto por Sticky Bar)
   - [ ] Tabelas com scroll horizontal e indicador visual

### 8.3 Regra de Ouro
> O site **NÃO pode ser declarado "responsivo" ou "pronto"** pela IA sem que o usuário humano tenha confirmado a verificação visual no seu navegador.

---

## 9. Deploy & Cabeçalhos de Segurança HTTP

Todo projeto deployado na Vercel DEVE conter um arquivo `vercel.json` na raiz com os cabeçalhos mínimos de segurança:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

**Regra:** A presença do `vercel.json` com estes headers é item obrigatório do Passo 5 (QA) do `agency-flow.md`. A CSP (Content-Security-Policy) deve ser configurada projeto a projeto após inventário das fontes externas.

---

## 10. Auditoria Estática Instantânea (Linter `static-qa.js`)

Todo projeto DEVE ser submetido à auditoria estática automatizada antes de qualquer solicitação de validação visual ao usuário humano:

- **Comando:** `node .design-system/linter/static-qa.js [pasta-do-projeto]`
- **Critério de Bloqueio:** Se houver qualquer 🔴 FAIL (cores hexadecimais literais fora de variáveis de tokens, imagens sem `alt`, ausência de `llms.txt` ou `robots.txt`), o projeto **NÃO pode ser declarado concluído**. A IA deve corrigir todas as falhas antes de avançar.

---

## 11. Navegação Instantânea e Transições (Speculation Rules & View Transitions)

Para eliminar o "flash branco" e a sensação de lentidão entre páginas em sites Multi-Page:

1. **Speculation Rules API:** Inclusão do bloco declarativo `<script type="speculationrules">` no `<head>` com `eagerness: "moderate"`, pré-renderizando páginas internas no hover sem custo excessivo de rede. (Ver receita em `native-2026-apis.md`).
2. **Cross-Document View Transitions:** Declarar `@view-transition { navigation: auto; }` no CSS global com fallback obrigatório para `@media (prefers-reduced-motion: reduce)`.

---

## 12. GEO (Generative Engine Optimization) & Schemas JSON-LD

Todo projeto entregue deve incluir o Schema.org canônico específico do seu nicho via `<script type="application/ld+json">`, conforme documentado em `geo-schema-catalog.md`:
- Saúde: `@type: "Dentist"` ou `"MedicalClinic"`.
- B2B / Jurídico: `@type: "LegalService"` ou `"AccountingService"`.
- Gastronomia: `@type: "Restaurant"` com `hasMenu` e horários.
- Serviços Locais: `@type: "LocalBusiness"` com `geo` e `areaServed`.

---

## 13. Padrão Canônico de Links e Mensagens do WhatsApp

Para garantir entregabilidade perfeita de mensagens multi-linha e evitar corrupção de caracteres em qualquer dispositivo:

### 13.1 Endpoint Direto vs `wa.me` (Preservação de `%0A`)
- **PROIBIÇÃO de `wa.me` para mensagens com quebras de linha:**
  - O encurtador `wa.me` executa um **redirecionamento HTTP 302** via cabeçalho `Location:`. Pela especificação HTTP (RFC 7230), quebras de linha (`\n` / `%0A`) são achatadas em um único espaço corrido durante o redirecionamento nos servidores do WhatsApp.
- **ENDPOINT OBRIGATÓRIO:**
  ```javascript
  const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
  ```
  O endpoint `https://api.whatsapp.com/send` entrega os parâmetros diretamente para o cliente web/mobile sem redirecionamento 302 intermediário, preservando 100% das quebras de linha.

### 13.2 Blindagem Anti-Mojibake (Proibição de Emojis de 4 Bytes)
- **O Problema:** Emojis com múltiplos bytes e seletores de variação (ex: `🏙️`, `📱`, `👉`) frequentemente sofrem corrupção de charset (*mojibake*) no Windows e WhatsApp Web, renderizando o caractere de interrogação quebrado ``.
- **A Solução:** Utilizar símbolos universais UTF-8 de 1-3 bytes (`•`, `*`, `→`, `✔`) e negrito nativo do WhatsApp:
  ```text
  Olá! Meu nome é *[Nome]*, sou de *[Cidade / UF]*...
  
  • *Telefone:* [Telefone]
  • *Modelo:* [Opção]
  
  Gostaria de mais informações!
  ```

---

## Referências Cruzadas

| Documento Fonte | Seções Extraídas |
| :--- | :--- |
| `agency-flow.md` | Passo 5 (QA gate, checklist de padrões técnicos) |
| `site-refactoring-engine/SKILL.md` | Seções 2 (mobile), 3 (acessibilidade), 3.5 (responsividade), 4 (segurança), 5 (favicons/SEO) |
| `premium-web-design/SKILL.md` | Seção 5 (princípios mobile-first, touch targets, safe areas, segurança XSS) |
| `premium-web-design/patterns/conversion.md` | Seções CONV-01 a CONV-06 (funis, CTAs, links WhatsApp e wizards) |
| `premium-web-design/patterns/js-modules/module-multistep-form-wizard.md` | Wizard multi-etapa com Voltar, Cache TTL e WhatsApp direto |
| `premium-web-design/patterns/js-modules/module-address-autocomplete.md` | Autocomplete com validação estrita de cidades |
| `premium-web-design/patterns/native-2026-apis.md` | View Transitions, Speculation Rules, Scroll-Driven CSS, Popover API |
| `premium-web-design/patterns/approved-js-libraries.md` | Matriz de micro-bibliotecas cliente autorizadas (<20KB) |
| `premium-web-design/patterns/geo-schema-catalog.md` | Modelos canônicos de Schema JSON-LD para IAs |
| `premium-web-design/patterns/js-modules/module-whatsapp-utm-tracker.md` | Captura de UTMs, DataLayer e atribuição de conversão |
| `premium-web-design (principles/ui-principles.md)` | Seção 5 (contraste WCAG), Seção 6 (unidades responsivas) |
| `premium-web-design (principles/ux-principles.md)` | Seção 3 (feedback de estado), Seção 4 (affordances), Seção 5 (prevenção de erros) |
| `windows-and-assets-safety.md` | Seção 2 (estabilidade de assets, anti-404) |
