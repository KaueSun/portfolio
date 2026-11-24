# Portfólio de Kaue Oliveira

Portfólio estático em português com apresentação profissional, projetos, stack, trajetória e contato.

## Direção visual

Um observatório ao entardecer abre a página. A paisagem sugere distância e descoberta. A composição em painéis e os filetes de bronze reinterpretam a referência editorial da capa. Em cada estudo de caso, a mesma hierarquia conduz a leitura de problema, arquitetura e decisões.

| Cor | Uso |
| --- | --- |
| Ameixa profunda `#18121F` | Fundo da página |
| Violeta escuro `#211A2B` | Superfície dos cards e do guia |
| Dourado envelhecido `#DBBA88` | Ação principal, links e categorias |
| Bronze `#8E725A` | Contornos e divisórias |
| Azul frio `#A7BFDC` | Tecnologias e foco por teclado |
| Verde sálvia `#A9CBB6` | Disponibilidade e categoria de back-end |
| Marfim `#F4EDF3` | Texto principal sobre superfícies escuras |

Spectral dá aos nomes e títulos o ritmo de uma página impressa. DM Sans facilita a leitura de descrições e controles. Georgia e Segoe UI oferecem alternativas locais.

## Organização da página

1. Apresentação com paisagem original, currículo e acesso aos projetos.
2. Três estudos de caso, com ilustrações que representam voz, dados e edição de vídeo. Os demais trabalhos ficam em uma lista expansível.
3. Sobre mim, com retrato e formação.
4. Stack, com links para exemplos de aplicação.
5. Trajetória da graduação aos projetos autorais e ao objetivo profissional.
6. Contato por e-mail e redes profissionais.

## Projetos do GitHub

Seleção estática baseada nos READMEs e nas linguagens dos repositórios públicos.
O site não depende de requisições à API do GitHub para exibir os projetos.

- [EEVEE](https://github.com/KaueSun/Eevee-assistant): assistente de voz para Windows com OpenAI, memória por perfil, biblioteca local e Google Agenda opcional.
- [OliSnack API](https://github.com/KaueSun/OliSnack-API): API de pratos brasileiros com FastAPI e PostgreSQL.
- [Viral Cuts Bot](https://github.com/KaueSun/Viral-bot): cortes de vídeo, transcrição, legendas e organização Kanban.
- [Sistema de estoque](https://github.com/KaueSun/sistema-de-estoque): protótipo CRUD com simulação de cargos no front-end.
- [NutriSearch](https://github.com/KaueSun/Sistema-de-Consulta-de-Calorias): consulta nutricional com a API USDA.
- [Dashboard de comunicação](https://github.com/KaueSun/dashboard-comunicacao-interna): protótipo MVC com JSONPlaceholder.
- [Conselheiro Socrático](https://github.com/KaueSun/Api-gemini): aplicação de terminal com Node.js e Google Gemini.

## Execução

Use `python -m http.server 8000` na raiz e abra `http://localhost:8000`. O site usa HTML, CSS e JavaScript e pode ser hospedado como arquivos estáticos.

A folha `assets/css/main.css` contém os estilos compartilhados. O menu, a navegação ativa, o arquivo de projetos e a cópia do endereço ficam em `assets/js/main.js`. O guia opcional em `assets/js/guide.js` oferece respostas pré-escritas em um diálogo nativo.

O layout adapta os três painéis a uma coluna e usa um recorte próprio da paisagem no celular. Botões e ilustrações têm transições curtas. A página respeita a preferência de movimento reduzido e oferece um controle para pausar as animações. A navegação, o arquivo expansível, o currículo e o link de e-mail também funcionam com JavaScript desativado.

Os ícones Bootstrap Icons v1.13.1 usam a licença MIT em `assets/icons/LICENSE-bootstrap-icons.txt`.

## Currículo

O PDF de uma página fica em `assets/docs/kaue-oliveira-curriculo.pdf`. Para gerar uma nova versão, atualize `scripts/build_resume.py` e execute `python scripts/build_resume.py` em um ambiente com ReportLab.

O endereço profissional é **kauedeoliveira.dev@gmail.com**.
