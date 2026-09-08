---
description: Regras obrigatórias de manipulação de código no Windows e gerenciamento de imagens para evitar corrupção e 404s.
---

# Windows and Assets Safety

Estas regras são **ABSOLUTAS** e se sobrepõem a qualquer conveniência no ambiente Windows.

## 1. A Lei Anti-Corrupção (Regex e UTF-8 no PowerShell)
- **NUNCA** utilize substituições globais por Regex no PowerShell (`$content -replace '...'`) para fazer correções gramaticais em arquivos que misturam Português e Inglês (ex: HTML e CSS).
  - *Motivo:* O PowerShell do Windows aplica codificação padrão que corrompe acentos em UTF-8 (ex: "Experiência" vira "experiǦncia"). Além disso, o motor Case-Insensitive faz falsos positivos, destruindo classes de programação (ex: `Se\S+o` destrói `.section-padding` transformando em `.Seção-padding`).
- **SEMPRE** utilize a ferramenta nativa `write_to_file` do sistema Antigravity para reescrever ou editar arquivos que possuam caracteres especiais (acentuação) e sintaxe misturada, pois ela garante a integridade do UTF-8 e preserva literais JS (`${}`).

## 2. Estabilidade de Assets (Anti-404)
- **NUNCA** utilize links dinâmicos e instáveis do Unsplash (como `source.unsplash` ou `images.unsplash.com/...` com query strings complexas como `?q=80&w=800` via parâmetros de busca dinâmicos) como placeholders definitivos de um layout de produção.
  - *Motivo:* Eles sofrem severo rate-limiting, falham frequentemente no carregamento e destroem a demonstração visual do site (buracos na UI).
- **SEMPRE** utilize links estáticos absolutos de CDNs amigáveis a hotlinking e de altíssima confiabilidade (como o **Pexels**), ou baixe fisicamente a imagem para o repositório local.
