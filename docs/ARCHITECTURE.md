# Arquitetura e decisões técnicas

Registro curto das decisões do projeto: o que foi escolhido, as alternativas e o porquê.

## Objetivo

Um portfólio de página única que:

- carregue rápido em qualquer dispositivo;
- seja fácil de editar sem conhecimento de front-end moderno;
- possa ser publicado de graça e sem servidor.

## Decisão 1: HTML, CSS e JS puros, sem framework

- **Opção A (escolhida): HTML/CSS/JS puros.** Mais simples e adequada ao projeto. Zero dependências, sem `npm install`, sem build, e carrega rápido.
- **Opção B: Next.js / React + Tailwind.** Mais escalável (várias páginas, blog, i18n, componentes), mas desnecessária para uma página única.

**Quando rever:** se o site ganhar blog, várias páginas, versão em inglês ou integração com uma API (por exemplo, um chat RAG sobre o currículo).

## Decisão 2: separar em arquivos por responsabilidade

| Arquivo | Responsabilidade | Muda quando… |
|---|---|---|
| `index.html` | Conteúdo e estrutura | muda um texto ou uma seção |
| `styles.css` | Aparência | muda o visual |
| `config.js` | Dados de contato | muda telefone ou link |
| `main.js` | Comportamento dos links | quase nunca |
| `background.js` | Efeito visual | quase nunca |

Cada arquivo tem um motivo para mudar (princípio de responsabilidade única aplicado a front-end simples).

## Decisão 3: `<script defer>` em vez de ES modules

- **Opção A (escolhida): scripts clássicos com `defer`.** Funcionam até abrindo o `index.html` direto do disco (`file://`) e mantêm a ordem de execução: `config.js` → `main.js` → `background.js`.
- **Opção B: `type="module"` com `import`.** Mais organizado em projetos grandes, mas exige um servidor local e não traz ganho aqui.

## Decisão 4: design por tokens

Cores, fontes e medidas ficam em variáveis CSS no `:root`. Trocar a identidade visual é editar um bloco só.

| Token | Uso |
|---|---|
| `--bg`, `--surface` | Preto com leve viés roxo |
| `--purple` | Cor principal (títulos, destaques) |
| `--neon` | Verde fluorescente para sinais "vivos" e CTAs |
| `--font-display` | Syne: títulos |
| `--font-body` | Figtree: texto |
| `--font-mono` | JetBrains Mono: detalhes técnicos |

## Decisão 5: responsividade fluida

- Tipografia e espaçamentos com `clamp()` (escala contínua, sem saltos).
- O título do topo usa **container queries** (`cqi`): o tamanho acompanha a largura do bloco e não a da tela, o que evita que o nome invada a demo em telas largas.
- Grid e Flexbox com `gap`; colunas viram uma só abaixo de ~900px.

## Decisão 6: deploy com GitHub Actions + Pages

- **Opção A (escolhida): GitHub Pages via Actions.** Gratuito, versionado junto com o código, e cada push na `main` publica.
- **Opção B: Vercel/Netlify.** Ótimas (previews por PR, analytics), mas são mais uma conta e mais uma configuração.

O workflow publica só `index.html` e `assets/`, então README e docs não vão para o site.

## Fora de escopo, por enquanto

- Analytics
- Formulário de contato (exigiria backend ou serviço externo)
- Testes automatizados (pouca lógica; os riscos são visuais)
