# Padrão de Fluxo de Desenvolvimento e Design (Anti-Slop & No-Auto-Test)

<!--
## CHANGELOG — development-flow.md
| Versão | Data       | Autor | Mudança                                                                       |
| :----- | :--------- | :---- | :---------------------------------------------------------------------------- |
| v1.7.0 | 2026-09-08 | AGY   | Integração do Micro Task Observer no Hard Stop Protocol (§1), auditoria ativa |
|        |            |       | bloco a bloco anti-alucinação e sincronização com agency-flow v1.7.0.         |
| v1.6.0 | 2026-09-04 | AGY   | Design Despoluído & Filtro Subtrativo (§3.1), sincronização com agency-flow v1.6.0. |
| v1.5.0 | 2026-09-04 | AGY   | Hard Stop Protocol (§1), Protocolo de Correção Cirúrgica (§1), sincronização com agency-flow.md v1.5.0. |
| v1.4.0 | 2026-09-04 | AGY   | Sincronização com agency-flow.md v1.4.0 (Linter estático, UTMs, 2026 APIs)   |
| v1.2.0 | 2026-09-03 | AGY   | Sincronização com agency-flow.md v1.2.0 (Modern CSS, 16 arquétipos e AP-10 a AP-14) |
| v1.1.0 | 2026-08-28 | AGY   | Checkpoint de raciocínio obrigatório antes de cada bloco; referência ao CHANGELOG de agency-flow |
| v1.0.0 | 2026-01-01 | AGY   | Versão inicial                                                                |

Esta regra está sincronizada com agency-flow.md v1.7.0. Atualize em conjunto.
-->

Esta regra é a fonte canônica do fluxo de desenvolvimento. Ela é aplicada globalmente em qualquer tarefa de criação, modificação ou refatoração de sites neste workspace.


## 1. Bloqueio de Código e Desenvolvimento Incremental (Regra Canônica)

> ⚠️ Esta é a ÚNICA definição autoritativa da regra de bloqueio. Todas as outras skills e rules devem referenciar esta seção em vez de redefinir a regra.

- **Proibição de One-Shot**: A IA nunca deve criar ou modificar múltiplos arquivos de uma só vez ou implementar um site inteiro sem interação.
- **Protocolo de Ação**:
  1. Apresentar o plano detalhado de alterações e aguardar aprovação explícita.
  2. Implementar apenas **um componente ou bloco lógico por vez (HTML + CSS + JS)**.
  3. Encerrar cada entrega perguntando: *"Podemos iniciar a etapa N+1 (Bloco: [Nome]) de X etapas?"*
  4. Aguardar o feedback do usuário antes de prosseguir para o próximo bloco.
- **Aprovação Unitária**: Cada bloco é entregue 100% finalizado e testado na IDE de forma isolada antes do agente avançar.

### 🚨 Hard Stop Protocol & 👁️ Micro Task Observer (Mecanismo de Bloqueio Físico e Qualidade)

Após gerar ou editar **qualquer** bloco de código (HTML, CSS ou JS), o agente DEVE:
1. **Executar Auditoria Estática:** Rodar imediatamente `node .design-system/linter/static-qa.js [projeto]`. Se houver qualquer 🔴 FAIL, aplicar correção cirúrgica antes de apresentar ao usuário.
2. **Executar o Micro Task Observer:** Avaliar o bloco sob as 5 dimensões críticas (sentido & propósito sem slop, touch affordance sem dependência de hover, formulários/links estritos, ausência de anti-patterns AP-01 a AP-24 e extração de lógica inédita >40 linhas).
3. **Encerrar a mensagem com o bloco estruturado de aprovação:**
   ```
   👁️ Micro Task Observer — Bloco [N]: [Nome do Bloco]
     • Sentido & Propósito: [Frase justificando o valor do bloco sem slop]
     • Touch & Mobile Affordance: [Garantido funcionamento sem hover em telas touch / min-height 44px]
     • Formulários & Links: [Validação estrita, WhatsApp direto api.whatsapp.com/send, cache TTL 2h, ou N/A]
     • Anti-Patterns (AP-01 a AP-25): Zero violações detectadas (incluindo rota de fuga em login)
     • Linter Estático: 0 FAIL | X WARN
     • Extração Imediata: [Lógica >40 linhas sugerida para patterns/js-modules/ ou N/A]

   Por favor, abra `[arquivo]` no seu navegador e valide o visual.
   Podemos avançar para o Bloco [N+1]: [Nome do Próximo Bloco]? (S/N)
   ```
4. **Aguardar resposta explícita do usuário (S/N)** antes de qualquer nova linha de código.

**PROIBIÇÃO ABSOLUTA:** O agente NÃO pode gerar o Bloco N+1 na mesma mensagem do Bloco N, mesmo que o usuário tenha aprovado o plano completo anteriormente. A aprovação do plano autoriza a sequência, não o one-shot.

### ✂️ Protocolo de Correção Cirúrgica (Anti-Regressão)

Ao corrigir um problema em um bloco específico, o agente é PROIBIDO de:
- Recriar o arquivo HTML/CSS/JS inteiro
- Remover ou modificar blocos que não são escopo da correção
- Usar `write_to_file` com `Overwrite: true` em arquivos que já contêm blocos aprovados

**Ferramenta obrigatória para correções:** `replace_file_content` com `TargetContent` cirurgicamente delimitado ao trecho problemático.
**Antes de qualquer correção:** declarar explicitamente: "Vou editar apenas [componente X] — todos os outros blocos permanecerão intocados."

## 2. Proibição Absoluta de Testes Automatizados e Browser Automation (Banimento do Playwright)

> 🚫 **REGRA INEGOCIÁVEL DE SEGURANÇA E PERFORMANCE:**
> É **TERMINANTEMENTE PROIBIDO** sob qualquer hipótese a IA rodar, propor, gerar scripts ou acionar ferramentas de testes automatizados de navegador (como `Playwright`, `Puppeteer`, `Selenium`, `Cypress`, `browser_subagent` ou headless browsers).

- **Proibição em Planos de Verificação:** A IA NUNCA deve incluir comandos de testes automatizados ou scripts de browser no plano de verificação. A seção de testes automatizados deve conter apenas `N/A - Verificação 100% manual`.
- **Validação Exclusivamente Humana:** Toda e qualquer validação visual e interativa pertence **única e exclusivamente ao usuário**, abrindo o arquivo diretamente no navegador dele.
- **Pergunta Obrigatória:** A IA encerra a entrega solicitando a conferência manual ao usuário (ex: *"Por favor, abra o arquivo `index.html` em seu navegador e valide o layout"*). NUNCA tente testar o navegador por conta própria.

## 3. Diretrizes de Design Premium e Anti-AI Slop
- **Sem Pop-ups / Modais Intrusivos na Hero Section**: É proibido por padrão colocar banners promocionais automáticos, modais de captura, ou cartões flutuantes (como badges) que encubram a imagem ou o produto principal do cabeçalho / Hero section.
- **Foco Visual Limpo**: O cabeçalho e a seção inicial (Hero) devem ter um design de alta qualidade e limpo, focando no título da proposta de valor, chamadas para ação claras (CTAs) e na imagem conceitual. Elementos de suporte ou promoções secundárias devem ser integrados ao longo do scroll da página de forma contextual ou ativados por clique do usuário, nunca exibidos de forma intrusiva e automática.

### 3.1 Princípio do Design Despoluído & Filtro Subtrativo (A Lição de Cozinha da Sil e Space)
- **A Lei da Navalha de Ockham:** O design converte por clareza, fotos reais e tipografia confiante, não por ornamentos vazios.
- **Fim do Bordismo (AP-16):** Nunca contorne todas as caixas com arames coloridos de 1px. Use contraste de superfícies (`--color-surface` vs `--color-bg`) e sombras naturais suaves.
- **Zero Glow / Neon (AP-14):** Halos e luzes simuladas são proibidos fora de arquétipos futuristas.
- **Hover Calmo (AP-15):** Cards estáticos não devem pular (`translateY(0)`). Apenas botões e links de ação devem ter elevação interativa.
- **Cores Sólidas de Alto Contraste (AP-17):** Proibido falso ouro em degradê (`-webkit-background-clip: text`).
- **Respiro Editorial (AP-19):** Dê no mínimo 64px a 96px de respiro entre seções e elimine subtítulos redundantes que apenas repetem o título.

## 4. Obrigatoriedade de Design Tokens
- **Importação Obrigatória:** Todo projeto DEVE começar importando os arquivos base do Design System no início do seu CSS:
  ```css
  @import url("../../../.design-system/primitives.css");
  @import url("../../../.design-system/archetypes/nome-do-arquétipo.css");
  ```
  *(Ajustar o caminho relativo para a raiz de acordo com a estrutura do projeto)*
- **Proibição de Valores Literais (Mágicos):** É expressamente proibido declarar valores hexadecimais, rgb/rgba literais, valores em pixels para gaps/paddings/margins, escalas de sombras (`box-shadow`), escalas de arredondamento (`border-radius`) ou z-index diretamente nas regras de estilo dos componentes.
- **Uso Estrito de Tokens:** Use única e exclusivamente as variáveis do Design System (`var(--space-*)`, `var(--color-*)`, `var(--shadow-*)`, `var(--radius-*)`, `var(--z-*)` e `--text-*`).
- **Variáveis Locais:** Valores altamente específicos do cliente (ex: cor exata do logo ou URL de imagem específica) devem ser declarados no `:root` local do projeto com o prefixo `--local-*` e referenciados via `var(--local-*)`, documentando a exceção.

