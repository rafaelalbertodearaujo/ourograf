# 🏢 Protocolo de Orquestração da Agência (Modo Agência)

<!--
## CHANGELOG — Rule Engine Version
| Versão | Data       | Autor | Mudança                                                        |
| :----- | :--------- | :---- | :------------------------------------------------------------- |
| v1.8.0 | 2026-09-08 | AGY   | Arquitetura em Duas Camadas do Task Observer: Micro Observer  |
|        |            |       | por Bloco (Hook post_code_block) e Macro Observer no          |
|        |            |       | Fechamento (Hook on_close), novos padrões de Wizards e AP-24.  |
| v1.7.0 | 2026-09-04 | AGY   | Criação do AP-20 contra o vício do Hero Split 2-Colunas em     |
|        |            |       | gastronomia/marcas físicas; amarração no Checkpoint de Coding. |
| v1.6.0 | 2026-09-04 | AGY   | Design Despoluído & Filtro Subtrativo (Anti-Slop V2 AP-14 a    |
|        |            |       | AP-19: banimento de bordismo, falso glow, hovers inquietos e   |
|        |            |       | gradientes em texto; benchmarks Cozinha da Sil e Space).       |
| v1.5.0 | 2026-09-04 | AGY   | Blindagem Anti-One-Shot (Hard Stop físico obrigatório,        |
|        |            |       | Protocolo de Correção Cirúrgica, Gate de Pesquisa HTTP com     |
|        |            |       | prova real, Checagens H/H2/I/J/K no static-qa.js e             |
|        |            |       | Protocolo de Dados Ausentes contra alucinações).               |
| v1.4.0 | 2026-09-04 | AGY   | Expansão de Nichos (Clinical, Corporate, Architecture), Motor  |
|        |            |       | de Atribuição WhatsApp UTM, APIs Nativas 2026 (Speculation     |
|        |            |       | Rules, View Transitions, Scroll-Driven), Homologação de Micro- |
|        |            |       | Libs, Linter Estático de QA (static-qa.js) e GEO Schema.org.   |
| v1.3.0 | 2026-09-03 | AGY   | Saneamento de Ghost References (redirecionamento explícito aos |
|        |            |       | módulos da skill premium-web-design), centralização de utils.js|
|        |            |       | (anti-XSS), vercel.json obrigatório e limpeza do font-registry.|
| v1.2.0 | 2026-09-03 | AGY   | Sincronização 2026: 16 Arquétipos CSS nativos, novos anti-     |
|        |            |       | patterns AP-10 a AP-14, Modern CSS (dvh, text-wrap: balance),   |
|        |            |       | bloqueio de fontes saturadas e novo Checkpoint de Raciocínio.   |
| v1.1.0 | 2026-08-28 | AGY   | Roteamento de contexto por etapa, checkpoint de raciocínio     |
| v1.0.0 | 2026-01-01 | AGY   | Versão inicial do protocolo de orquestração                    |

**RULE ENGINE VERSION ATUAL: v1.7.0**
Para travar um projeto nesta versão, preencha `RULE_ENGINE_VERSION: v1.6.0` no BRIEFING.md do projeto.
Se o BRIEFING.md do projeto tiver RULE_ENGINE_VERSION diferente da versão atual, a IA DEVE alertar o usuário
antes de prosseguir: "⚠️ Este projeto está fixado na versão [X] das regras. A versão atual é v1.6.0.
Aplicar a atualização pode alterar comportamentos. Deseja atualizar o pin? (S/N)"
-->

Esta regra determina o fluxo de trabalho e o comportamento da IA para o desenvolvimento e manutenção deste projeto. Ela amarra todas as nossas skills personalizadas de forma a garantir integridade técnica, conformidade com o Notion e combate ativo ao AI Slop.

---

## 🗺️ Roteamento de Contexto por Etapa (Context Routing)

> **Princípio:** Cada papel/etapa lê APENAS os arquivos estritamente necessários para sua função.
> Isso reduz consumo de tokens e elimina a lentidão percebida por carregamento desnecessário de contexto.

| Etapa / Papel         | Arquivos Obrigatórios a Ler                                                                                                     | Arquivos Proibidos de Ler (nesta etapa) |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| **Passo 1 — Scanner** | `project-setup-scanner/SKILL.md`, `BRIEFING.md` (local)                                                                        | Todos os outros                         |
| **Passo 2 — Briefing**| `BRIEFING.md`, `BRIEFING-TEMPLATE.md` (se ausente)                                                                             | Skills de pesquisa e código             |
| **Passo 3 — Research**| `research-driven-creation/SKILL.md`, skill `premium-web-design` (módulos em `principles/`, `patterns/`, `decision-records/`, `benchmarks/*.md`, `geo-schema-catalog.md`), `.design-system/modelos-backgrounds-aprovados.md` | `web-standards.md`, `development-flow.md` (ainda não) |
| **Passo 4 — Coding**  | `development-flow.md` (seções 1 e 4), tokens do arquétipo (`primitives.css` + `archetypes/<X>.css`), `native-2026-apis.md`, `approved-js-libraries.md`, `module-whatsapp-utm-tracker.md`, `web-standards.md` seções 1-2 e 5.7 | `research-driven-creation/SKILL.md` (já concluída) |
| **Passo 5 — QA**      | `node .design-system/linter/static-qa.js`, `web-standards.md` (completo), checklists de UX/A11y Audit (seção 6 e 7 de `site-refactoring-engine/SKILL.md`) | Todos os arquivos de pesquisa           |
| **Passo 6 — Fechar**  | `task-observer/SKILL.md`, `BRIEFING.md` seção "Feedback Pós-Lançamento", `font-registry.md`                                    | Skills de desenvolvimento               |

---

## 🛑 0. Detecção de Contexto (Estudos vs. Clientes)

Sempre que a IA iniciar uma conversa neste diretório, ela assume obrigatoriamente o **Modo Agência Corporativo**, executando o protocolo de orquestração detalhado abaixo.

### Resolução de Conflito de Skills Externas
- **A skill `impeccable` (builtin) é SUBORDINADA às regras internas da agência.** Em qualquer conflito entre `impeccable` e as regras em `premium-web-design`, `site-refactoring-engine` ou `web-standards.md`, as regras internas SEMPRE prevalecem (ex: obrigatoriedade estrita de Vanilla JS/HTML/CSS nativo vs frameworks React/Framer Motion).
- A `impeccable` só deve ser consultada como referência complementar de polimento visual APÓS a conformidade com todas as regras internas ter sido verificada.

---

## 🛠️ 1. O Fluxo de Orquestração do Projeto (Sem Furos)

A IA executará sequencialmente estes passos integrados:

### Passo 1: Scanner de Projeto (Entrada)
> **Contexto mínimo:** `project-setup-scanner/SKILL.md` + `BRIEFING.md` local
*   **Scanner:** A IA ativa a skill `project-setup-scanner` para confirmar a stack utilizada (ex: Vanilla, React, Node) e verificar a integridade dos arquivos de regras na pasta `.agents/rules/`.
*   **Referências Locais:** A IA lê os arquivos `referencias-design.md` e `tools-e-seguranca.md` da pasta `.agents/rules/` para carregar o catálogo de ferramentas homologadas e galerias de inspiração curadas.
*   **Verificação de Pin:** A IA lê o campo `RULE_ENGINE_VERSION` do `BRIEFING.md`. Se o campo `RULE_ENGINE_VERSION` estiver **ausente** no `BRIEFING.md`, a IA deve interpretá-lo como versão `v0.0.0` (desatualizado) e emitir o alerta de versão. **Nunca** pular a verificação de versão por ausência do campo. Se estiver desatualizado em relação ao CHANGELOG acima, emite o alerta de versão antes de prosseguir.

### Passo 2: Carregamento do Briefing (Local-First com Fallback Notion)
> **Contexto mínimo:** `BRIEFING.md` + `BRIEFING-TEMPLATE.md` (se ausente)
*   **Leitura Local (Prioridade):** A IA lê o arquivo `BRIEFING.md` na raiz do projeto para extrair os dados do cliente (nome, nicho, WhatsApp, paleta de cores, referências pesquisadas e histórico de etapas).
*   **Sincronização com o Notion (Opcional):** Se houver conexão e o `notion-mcp-server` estiver disponível, a IA tenta localizar a página do projeto correspondente no Notion para verificar o status atualizado.
*   **Se a chamada ao Notion falhar (erro de rede, 403, 429 ou timeout):**
    1.  A IA informa o usuário que o Notion está indisponível.
    2.  Utiliza o `BRIEFING.md` local como fonte única de dados e prossegue normalmente.
    3.  Se nenhum `BRIEFING.md` existir, solicita ao usuário os dados mínimos (nome do cliente, nicho, WhatsApp) e os grava no `BRIEFING.md`.

### Passo 2.5: Garantia de BRIEFING.md
*   Se o arquivo `BRIEFING.md` não existir na raiz do projeto atual:
    1.  A IA deve criá-lo imediatamente copiando o conteúdo e estrutura de `BRIEFING-TEMPLATE.md` localizado na pasta raiz do workspace `sites/`.
    2.  Preencher com os dados conhecidos e solicitar os faltantes ao usuário.

### Passo 3: Escolha da Engine de Trabalho & Arquitetura
> **Contexto mínimo (Research):** `research-driven-creation/SKILL.md`, skill `premium-web-design` (`principles/*.md`, `patterns/*.md`, `benchmarks/cozinha-sil.md`, `benchmarks/space-refatorado.md`)
Após ler o briefing local e analisar a pasta, a IA divide a ação em duas rotas possíveis:
1.  **Site Novo (Sem código local ou pasta vazia):** A IA ativa a skill `research-driven-creation`.
    *   *Ação:* Executa a pesquisa de referências por perfis (pesquisa web real provada + combinação de conhecimento prévio), propõe o direcionamento estético e a **Arquitetura de Páginas** (Single-Page vs Multi-Page).
    *   *Decisão de Arquitetura:* Sites complexos (restaurantes, e-commerce, barbearias com agendamento) devem ser estruturados como Multi-Page (ex: separar Home do Cardápio/Catálogo/Dashboard), seguindo os benchmarks de arquitetura e qualidade dos projetos `cozinha-sil` e `space-refatorado` documentados na skill `premium-web-design` (`benchmarks/`).
    *   *Seleção entre os 16 Arquétipos Oficiais:* A IA DEVE selecionar o arquétipo mais aderente ao negócio entre os **16 arquétipos tokenizados** em `sites/.design-system/archetypes/` (ex: *13. Clinical Authority*, *14. Corporate Prestige*, *15. Architectural Monolith*, *16. Boutique B2B SaaS*, além dos gastronômicos e comerciais 1 a 12).
    *   *Check de Fontes & Superfícies:* A IA DEVE ler `sites/.design-system/font-registry.md` e escolher fontes display e body que não estejam saturadas (ex: proibir Outfit e DM Sans em excesso nos novos projetos). Para o direcionamento visual de superfícies, consultar `sites/.design-system/modelos-backgrounds-aprovados.md` como catálogo de inspiração contextual (cores sólidas são bem-vindas em blocos/seções; o que se combate é a monocultura escura chapada de ponta a ponta sem ritmo visual).
    *   *Doutrina Anti-Slop (2026):* Consultar obrigatoriamente `web-standards.md` Seção 5.7 (AP-01 a AP-19) e a skill `premium-web-design` (`principles/anti-patterns.md`), injetando **Human-Crafted Cues** (quebras intencionais de grid, assimetria editorial, tipografia de duas vozes) e aplicando a Navalha de Ockham.
2.  **Site Existente (Presença de código legado):** A IA ativa a skill `site-refactoring-engine`.
    *   *Ação:* Cria o backup de segurança (`_legacy/` ou branch git) e executa o checklist de auditoria visual de slop, responsividade, acessibilidade e favicons.
    *   *Auditoria de Superfície:* Verificar o ritmo visual do site. Se for um bloco escuro monótono de ponta a ponta sem vida, propor enriquecimento com texturas adequadas ao nicho.
    *   *Benchmark:* Os projetos `cozinha-sil` e `space-refatorado` são os pisos mínimos de qualidade estética, modularidade, tipografia e sobriedade aceitáveis para o ecossistema (ver skill `premium-web-design/benchmarks/`).

### ✅ Gate de Pesquisa (Obrigatório antes de avançar para o Passo 4)

Para cada referência listada no BRIEFING, o agente DEVE:
1. Executar `read_url_content` na URL
2. Extrair e citar textualmente no chat: (a) paleta visual descrita no CSS/HTML, (b) estrutura do Hero, (c) tipografia usada
3. Preencher a tabela de Checklist de Qualidade da Pesquisa (`research-driven-creation/SKILL.md`) com [x] em cada critério
4. Se a URL retornar erro 403/404, substituir por outra URL válida antes de prosseguir

**O agente NÃO pode avançar para o Passo 4 sem colar no chat evidências de pelo menos 2 URLs visitadas com sucesso.**

### Passo 4: Desenvolvimento Incremental Bloco a Bloco
> **Contexto mínimo (Coding):** `development-flow.md` seções 1 e 4, `primitives.css`, `archetypes/<X>.css`, `.design-system/utils.js`, `web-standards.md` seções 1-2 e 5.7

### ⚙️ Checkpoint de Raciocínio (Gate Formal — NÃO pode ser omitido)

O formato do Checkpoint é OBRIGATÓRIO como primeira coisa em cada resposta de entrega de bloco.
Se o Checkpoint não for emitido, o bloco NÃO foi entregue segundo as regras da agência.

Antes de gerar qualquer bloco de código, a IA DEVE emitir visivelmente ao usuário um checkpoint resumido no formato:
```
⚙️ Checkpoint — [Nome do Bloco]:
  Regras verificadas: tokens (--space-*) ✓ | touch target 44px ✓ | breakpoint 768px ✓ | 
  fonte ≥16px ✓ | 100dvh ✓ | text-wrap: balance ✓ | anti-slop (AP-10 a AP-20) ✓ | 
  filtro subtrativo (zero bordismo, zero glow, hover calmo) ✓ | ritmo de superfície ✓ | font-registry.md consultado ✓
  Arquétipo ativo: [nome-do-arquetipo.css] (1 dos 16 arquivos CSS homologados)
  Tokens carregados: primitives.css ✓
  Decisões: [ex: "Superfície sólida limpa com respiro de 96px" + "Tipografia rústica autêntica sem gradiente de texto"]
```
Se qualquer item estiver ✗, a IA deve resolver o bloqueio antes de gerar código.

O item `anti-slop (AP-10 a AP-20) ✓` e `filtro subtrativo ✓` do Checkpoint exige que o agente:
- Declare explicitamente por que o Hero não tem pill badge (AP-11) nem gradiente em texto (AP-17)
- Declare explicitamente que não há bento grid homogêneo (AP-10) nem border-beam contínuo (AP-12)
- Declare explicitamente que ícones em grids não são Squircles cinzas (AP-13)
- Declare explicitamente que não há halos de neon/glow (AP-14) nem arames de bordas coloridas de 1px em tudo (AP-16)
- Declare explicitamente que cards estáticos não possuem `translateY` no hover (AP-15)
- Declare explicitamente que a tipografia é autêntica ao nicho (AP-18) e o layout tem respiro editorial (AP-19)
- Declare explicitamente que a Hero Section NÃO usa o split 2-colunas SaaS (texto à esquerda + card/logo na direita) em gastronomia e produtos físicos (AP-20), adotando palco imersivo de apetite ou composição editorial.

### 🧹 Passo 4.1: O Filtro Subtrativo (A Navalha de Ockham)
Antes de submeter o bloco ao usuário, a IA aplica o teste de subtração inspirado nos benchmarks `cozinha-sil` e `space-refatorado`:
1. *Se remover a borda de 1px o card continua claro pelo fundo?* $\rightarrow$ **Remover a borda.**
2. *O card é meramente informativo?* $\rightarrow$ **Desligar hover translateY.**
3. *O subtítulo só repete o título?* $\rightarrow$ **Deletar o subtítulo.**
4. *O título precisa de falso ouro em gradiente?* $\rightarrow$ **Usar cor sólida de alto contraste.**

*   A IA aplica integralmente a regra de **Bloqueio de Código e Desenvolvimento Incremental** definida em `development-flow.md` seção 1, emitindo obrigatoriamente o **Micro Task Observer** (com checagem de sentido, touch affordance, forms/links e linter estático 0 FAIL) ao final de cada bloco antes de solicitar a validação do usuário.
*   **Proibição Absoluta de Browser Automation:** A IA é expressamente proibida de rodar testes automatizados de navegador (`Playwright`, `browser_subagent`, etc.). Ao entregar cada bloco, solicita a conferência visual manual diretamente ao usuário.
*   **Validação Tipográfica & Tokens:** Antes de entregar cada bloco, a IA executa o **Checklist de Validação Tipográfica & Tokens** da skill `premium-web-design` seção 4, confirmando a presença de duas variáveis de fonte distintas, uso de `clamp()`, importação dos tokens CSS do sistema (`--space-*`) e ausência de repetição no registro global.

### Passo 5: Aplicação de Padrões Técnicos e Qualidade (web-standards)
> **Contexto mínimo (QA):** `web-standards.md` completo + checklists de UX/Accessibility Audit
Durante a codificação e na validação de cada seção, a IA aplica obrigatoriamente a regra local `.agents/rules/web-standards.md`:
*   **Auditoria Estática Instantânea (Sem Browser):** A IA DEVE rodar via terminal o comando `node .design-system/linter/static-qa.js [pasta-do-projeto]`. Se houver qualquer 🔴 FAIL (cores hexadecimais soltas, imagens sem alt, falhas de SEO), a entrega é bloqueada até a correção.
*   **Zero Testes Automatizados de Navegador:** O QA visual é 100% analítico e a conferência visual final é delegada ao usuário no navegador dele.
*   Importação obrigatória de `primitives.css` e do manifest de cores/arquétipo correspondente em `.design-system/archetypes/`.
*   Garantia de Favicons em múltiplos formatos (SVG, ICO, PNG).
*   Responsividade móvel inegociável (overflow-x, paddings laterais, alvos de toque 44x44px, fontes 16px mínimo, `100dvh` em heros/modais, `text-wrap: balance`).
*   Lógica anti-double click de 1.5s em botões e máscara sanitizada de inputs.
*   Acessibilidade vestibular: fallback obrigatório para `@media (prefers-reduced-motion: reduce)`.
*   Segurança de integração (RLS no Supabase/Firebase, Turnstile anti-bot).
*   Atribuição de conversão: inclusão obrigatória de `whatsapp-utm-tracker.js` e schemas JSON-LD (`geo-schema-catalog.md`).

### Passo 6: Fechamento, Notion Update, Task Observer & Higiene
> **Contexto mínimo (Fechamento):** `task-observer/SKILL.md`, seção "Feedback Pós-Lançamento" do `BRIEFING.md`, `font-registry.md`
Ao concluir o projeto ou fases críticas:
1.  **Notion (Escrita Leve):** A IA tenta atualizar a propriedade de status da página correspondente no Notion (ex: "Planejamento & UX", "Aprovado & Em Produção" ou "No Ar Oficial"), sem adicionar blocos textuais. Se o Notion estiver indisponível, registra a pendência no `BRIEFING.md` local.
2.  **Macro Task Observer:** A IA roda o modo macro da skill `task-observer` para consolidar o histórico e registrar aprendizados, produzindo: (a) lista de aprendizados técnicos, (b) proposta concreta de atualização de skill se aplicável, (c) integração do Feedback Pós-Lançamento do `BRIEFING.md`, (d) confirmação de status do Notion.
3.  Novas paletas ou soluções técnicas descobertas durante o código são sugeridas para a biblioteca central `premium-web-design/SKILL.md` para expandir o cérebro de design da agência.
4.  **Pin de Versão:** Confirmar que o campo `RULE_ENGINE_VERSION` no `BRIEFING.md` está correto e atualizado para a versão que foi efetivamente usada no projeto.
5.  **Higiene Periódica (A cada 10 projetos ou 3 meses):** O agente deve sugerir ao usuário rodar uma sessão de limpeza das rules e do `font-registry.md` para comprimir logs de briefings, arquivar receitas sem uso e evitar sobrecarga de contexto.
6.  **Verificação Empírica (Gate de Encerramento):** A IA é PROIBIDA de declarar o projeto como "concluído" ou "pronto" sem executar o Checklist de Fechamento do `task-observer/SKILL.md` seção 6 e apresentar as provas ao usuário. Se qualquer item do checklist falhar, o projeto NÃO está concluído e a IA deve informar quais itens falharam e propor a correção.
7.  **Garbage Collection (Limpeza Obrigatória de Contexto):** Ao encerrar qualquer projeto ou refatoração de regras, a IA deve verificar se existem:
    - Arquivos `.md` ou `.txt` soltos na raiz de `sites/` que não sejam `BRIEFING-TEMPLATE.md`, `arquitetura-ecossistema.md` ou `contexto.md` ativo → Mover para `sites/.archive/`
    - Arquivos soltos dentro de `.design-system/` que não sejam `primitives.css`, `font-registry.md` ou subpastas `archetypes/` → Mover para `sites/.archive/`
    - Skills em `~/.gemini/config/skills/` que não são referenciadas em nenhum Hook nem no `agency-flow.md` → Reportar como `⚠️ SKILL ÓRFÃ`.

---

## 🔄 1.5 Sistema de Lifecycle Hooks (Extensibilidade Plug-and-Play)

Quando uma nova skill, módulo ou protocolo for adicionado ao ecossistema, ele NÃO precisa ser hardcoded diretamente no fluxo fixo deste arquivo. Em vez disso, ele deve declarar em seu frontmatter YAML ou cabeçalho a qual Hook se acopla.

| Hook | Momento de Disparo | Skills/Módulos Acoplados |
| :--- | :--- | :--- |
| `on_scan` | Passo 1 — Início / Scanner | `project-setup-scanner` |
| `on_research` | Passo 3 — Pesquisa de Mercado | `research-driven-creation` |
| `pre_blueprint` | Passo 3 — Antes de definir seções/copy | `humanizer-protocol.md` (Anti-AI Slop Linguístico e Copywriting) |
| `pre_code_block` | Passo 4 — Antes de gerar cada bloco HTML | Checklist Tipográfico (`premium-web-design` seção 4) |
| `post_code_block` | Passo 4 — Após gerar cada bloco | `humanizer-protocol.md` + `task-observer` (Micro: Sentido, Touch, Form/WhatsApp, Linter 0 FAIL) |
| `on_qa` | Passo 5 — Auditoria de Qualidade | `site-refactoring-engine` (checklists de UX e Acessibilidade), `web-standards.md` |
| `on_close` | Passo 6 — Fechamento | `task-observer` (Macro: Fechamento consolidado, Font Registry, Feedback e Deploy) |

### Taxonomia de Novas Adições
Antes de criar qualquer novo arquivo no ecossistema, classifique-o formalmente:
- **Regra** (`.agents/rules/*.md`): Invariante global inegociável (ex: touch targets 44px, Proibição de One-Shot). Nunca muda por projeto.
- **Skill** (`~/.gemini/config/skills/`): Workflow autônomo com múltiplas etapas (ex: scanner, research-engine, site-refactoring).
- **Padrão/Princípio** (`premium-web-design/patterns/` ou `principles/`): Catálogo de consulta técnica sob demanda.
- **Hook/Middleware** (declarado no frontmatter de um arquivo): Filtro que intercepta uma etapa sem ter workflow próprio.

### Protocolo de Integração Segura
Ao adicionar qualquer novo conteúdo ao ecossistema:
1. Classifique-o usando a Taxonomia acima.
2. Verifique se já existe algo que cubra a mesma responsabilidade (usar busca/grep no `agency-flow.md` e nos `SKILL.md`).
3. Se houver sobreposição, a nova adição deve ser INTEGRADA ao arquivo existente, nunca criada como arquivo isolado ("ilha").
4. Declare o Hook correspondente se for um middleware de etapa.
5. Atualize o `project-setup-scanner` para validar a presença e integridade do novo arquivo.


