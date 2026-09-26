# portfolio

Portfólio pessoal de Kaue Oliveira, com identidade roxa e efeitos sutis.

## estrutura

- Apresentação: nome, área de atuação, foto, redes e acesso aos projetos.
- Sobre mim: objetivos profissionais e graduação em Ciência da Computação (4º período, cursando).
- Projetos: EEVEE em destaque, seguida de OliSnack API e Viral Cuts Bot;
  os demais projetos continuam disponíveis, com o portfólio ao final.
- Estudos de caso: páginas estáticas dos três projetos principais, com problema,
  solução, arquitetura, decisões, limites e possíveis evoluções.
- Habilidades: frontend, backend, dados/infraestrutura, IA/automação, ferramentas
  e fundamentos, com links para os projetos em que cada tecnologia é aplicada.
- Agora: projeto em construção, temas de estudo e oportunidades buscadas.
- Currículo: PDF de uma página com dados da formação e projetos do portfólio.
- Contato: e-mail, LinkedIn, WhatsApp e GitHub.

## projetos do GitHub

Seleção estática baseada nos READMEs e nas linguagens dos repositórios públicos.
O site não depende de requisições à API do GitHub para exibir os projetos.

- [EEVEE](https://github.com/KaueSun/Eevee-assistant): assistente de voz para Windows com OpenAI, memória por perfil, biblioteca local e Google Agenda opcional.
- [OliSnack API](https://github.com/KaueSun/OliSnack-API): API de pratos brasileiros com FastAPI e PostgreSQL.
- [Viral Cuts Bot](https://github.com/KaueSun/Viral-bot): cortes de vídeo, transcrição, legendas e organização Kanban.
- [Sistema de estoque](https://github.com/KaueSun/sistema-de-estoque): protótipo CRUD com simulação de cargos no front-end.
- [NutriSearch](https://github.com/KaueSun/Sistema-de-Consulta-de-Calorias): consulta nutricional com a API USDA.
- [Dashboard de comunicação](https://github.com/KaueSun/dashboard-comunicacao-interna): protótipo MVC com JSONPlaceholder.
- [Conselheiro Socrático](https://github.com/KaueSun/Api-gemini): aplicação de terminal com Node.js e Google Gemini.

Os cards usam ilustrações abstratas; não representam capturas das interfaces.
A arte da EEVEE é feita em CSS. Não há screenshots ou vídeos de demonstração.
Os detalhes foram conferidos nos READMEs públicos em 25/09/2026. As páginas
separam capacidades atuais de possibilidades de evolução, sem prometer prazos.
Para atualizar a seleção, edite `index.html` e a página correspondente em
`projects/`, conferindo o README do respectivo projeto.

## tecnologias

- HTML5
- CSS3
- JavaScript (sem dependências de runtime)
- Google Fonts

## arquivos

```text
portfolio/
├── index.html
├── README.md
├── projects/
│   ├── eevee/index.html
│   ├── olisnack/index.html
│   └── viral-cuts/index.html
├── scripts/build_resume.py
└── assets/
    ├── css/
    │   ├── main.css
    │   └── showcase.css
    ├── docs/kaue-oliveira-curriculo.pdf
    ├── js/
    │   ├── main.js
    │   ├── effects.js
    │   └── guide.js
    ├── images/
    │   └── profile.jpg
    └── icons/
        └── favicon.svg
```

- `index.html`: conteúdo e estrutura do site.
- `assets/css/main.css`: estilos e responsividade.
- `assets/css/showcase.css`: destaque da EEVEE, estudos de caso, habilidades,
  guia e refinamentos responsivos da apresentação.
- `assets/js/main.js`: menu móvel, navegação ativa, controle de movimento e cópia de e-mail.
- `assets/js/effects.js`: partículas, botões magnéticos e iluminação dos cards.
- `assets/js/guide.js`: guia opcional com perguntas e respostas prontas, em um
  diálogo nativo acessível. Não executa IA, não usa microfone e não envia dados.
- `assets/images/profile.jpg`: foto original com tratamento de cor apenas em CSS.
- `assets/icons/favicon.svg`: ícone do site.
- Ícones de interface e logos: [Bootstrap Icons v1.13.1](https://icons.getbootstrap.com/),
  sob licença MIT preservada em `assets/icons/LICENSE-bootstrap-icons.txt`.
  Os símbolos SVG ficam embutidos em cada página e funcionam sem CDN, fontes
  de ícones ou JavaScript. Os textos dos links continuam acessíveis; os SVGs
  decorativos usam `aria-hidden`. No celular, os links sociais formam duas colunas
  com áreas de toque de pelo menos 46 px.

## executar localmente

Abra `index.html` no navegador ou use `python -m http.server 8000` e acesse
`http://localhost:8000`. O botão de copiar e-mail aparece quando a API de área
de transferência está disponível em um contexto seguro (HTTPS ou localhost).

## interações e acessibilidade

- Menu móvel com suporte a Escape, foco por teclado e indicação da seção atual.
- Entradas ao rolar e inclinação sutil da foto, respeitando `prefers-reduced-motion`.
- Controle para pausar e retomar efeitos; movimento reduzido do sistema tem prioridade.
- Cena de partículas limitada a 30 fps, com resolução limitada a 1,5× e menos pontos no celular.
- Animação suspensa quando a abertura sai da tela ou a aba fica oculta.
- Fundo estático em CSS quando JavaScript ou Canvas não estão disponíveis.
- Conteúdo e navegação disponíveis mesmo sem JavaScript.
- Fontes locais de fallback caso o Google Fonts esteja indisponível.
- Links diretos para o repositório deste portfólio, GitHub e contatos existentes.
- No celular, o guia fica em uma bolha de 48 px para reduzir a cobertura de conteúdo.
- Páginas próprias usam caminhos relativos e diretórios com `index.html`, sem
  exigir roteador JavaScript ou regras especiais de reescrita.

## currículo

O botão `Baixar currículo` aponta para um PDF real em `assets/docs/`. Seu conteúdo
usa apenas os dados já presentes no portfólio e nos projetos; instituição,
previsão de formatura e experiência profissional não foram presumidas.

Para atualizá-lo, edite `scripts/build_resume.py`, instale `reportlab` no ambiente
Python de desenvolvimento e execute `python scripts/build_resume.py`. O site
publicado continua estático e não precisa de Python. Confira a renderização do
PDF após editar e mantenha formação e tecnologias sincronizadas com o site.

## validação da atualização

- Home e três páginas de projeto verificadas em 320, 360, 390, 620, 768, 1024 e
  1440 px, sem rolagem horizontal.
- Menu móvel, Escape, retorno de foco, guia, download do PDF e controle de efeitos.
- Conteúdo e navegação também conferidos com JavaScript desativado.
- PDF de uma página renderizado e inspecionado visualmente.

## referências do rework roxo

- [OriginKit — Blob Text Reveal](https://www.originkit.dev/components/blob-text-reveal): inspiração para entrada gradual de texto com desfoque.
- [Skiper UI — Text roll navigation](https://skiper-ui.com/v1/skiper58): referência de interação e cuidado com a navegação.
- [React Bits](https://reactbits.dev/get-started/index): referências de Spotlight Card, Magnet, Tilted Card e Particles.
- [Three.js — exemplos](https://threejs.org/examples/): referência visual de partículas e composição em profundidade.

As referências orientaram a direção visual; nenhum componente pago ou código de
demo foi copiado. A implementação é própria, com CSS, Canvas 2D, projeção em
perspectiva, IntersectionObserver e requestAnimationFrame. Não requer React ou
Three.js para executar e mantém a estrutura estática original do projeto.

link: portfolio-dem3.vercel.app
