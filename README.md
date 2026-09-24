# portfolio

Portfólio pessoal de Kaue Oliveira, com identidade roxa e efeitos sutis.

## estrutura

- Apresentação: nome, área de atuação, foto, redes e acesso aos projetos.
- Sobre mim: objetivos profissionais e graduação em Ciência da Computação (4º período, cursando).
- Projetos: portfólio pessoal em destaque e seis projetos públicos do GitHub,
  com descrição, tecnologias, funcionalidades e acesso ao código-fonte.
- Habilidades: linguagens estudadas e aplicadas nos projetos.
- Contato: e-mail, LinkedIn, WhatsApp e GitHub.

## projetos do GitHub

Seleção estática baseada nos READMEs e nas linguagens dos repositórios públicos.
O site não depende de requisições à API do GitHub para exibir os projetos.

- [OliSnack API](https://github.com/KaueSun/OliSnack-API): API de pratos brasileiros com FastAPI e PostgreSQL.
- [Viral Cuts Bot](https://github.com/KaueSun/Viral-bot): cortes de vídeo, transcrição, legendas e organização Kanban.
- [Sistema de estoque](https://github.com/KaueSun/sistema-de-estoque): protótipo CRUD com simulação de cargos no front-end.
- [NutriSearch](https://github.com/KaueSun/Sistema-de-Consulta-de-Calorias): consulta nutricional com a API USDA.
- [Dashboard de comunicação](https://github.com/KaueSun/dashboard-comunicacao-interna): protótipo MVC com JSONPlaceholder.
- [Conselheiro Socrático](https://github.com/KaueSun/Api-gemini): aplicação de terminal com Node.js e Google Gemini.

Os cards usam ilustrações abstratas; não representam capturas das interfaces.
Os links levam ao código-fonte. Para atualizar a seleção, edite `.github-projects`
em `index.html` e confira o README do respectivo projeto.

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
└── assets/
    ├── css/
    │   └── main.css
    ├── js/
    │   ├── main.js
    │   └── effects.js
    ├── images/
    │   └── profile.jpg
    └── icons/
        └── favicon.svg
```

- `index.html`: conteúdo e estrutura do site.
- `assets/css/main.css`: estilos e responsividade.
- `assets/js/main.js`: menu móvel, navegação ativa, controle de movimento e cópia de e-mail.
- `assets/js/effects.js`: partículas, botões magnéticos e iluminação dos cards.
- `assets/images/profile.jpg`: foto de perfil utilizada na apresentação e na prévia do projeto.
- `assets/icons/favicon.svg`: ícone do site.

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
