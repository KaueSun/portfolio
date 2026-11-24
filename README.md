# Portfólio de Kaue de Oliveira

Portfólio estático em português com projetos, stack, trajetória e contato.

## Direção visual

A abertura usa uma ilustração original de uma biblioteca com estantes de madeira, luz de leitura âmbar e um ponto azul de luz natural. A profundidade vem de três planos de iluminação. A moldura em bronze e a composição em formato de página dupla retomam a atmosfera da referência. O tom profissional vem da hierarquia da apresentação e do espaço dedicado às decisões técnicas nos estudos de caso.

| Cor | Uso |
| --- | --- |
| Verde floresta `#111C17` | Fundo e navegação |
| Verde escuro `#202F26` | Superfície dos cards |
| Vinho `#382424` e marrom `#271F19` | Painéis de vídeo e contato |
| Bronze `#876B4E` e cobre `#BD875D` | Molduras, filetes e seção ativa |
| Âmbar `#DFB77D` | Ações principais, links e ênfase em títulos |
| Bege `#EFE5CE` e marfim `#F7ECD8` | Fundo da stack e texto sobre fundos escuros |
| Azul suave `#A6C5D1` | Tecnologias, elemento de voz e foco por teclado |

**Instrument Serif** dá ritmo editorial ao nome e aos títulos. **DM Sans** é usada na navegação, nos textos e nos controles. Georgia e Segoe UI são alternativas locais.

## Organização

1. Abertura com apresentação, projetos, currículo e disponibilidade.
2. Sobre mim, com retrato e área de atuação.
3. EEVEE em destaque e painéis para OliSnack API e Viral Cuts Bot. Seus estudos de caso detalham problema, arquitetura, decisões e limites. Os demais trabalhos ficam em uma lista expansível.
4. Stack organizada por áreas, com links para exemplos de aplicação.
5. Trajetória da graduação aos projetos autorais e ao próximo passo profissional.
6. Contato por e-mail e redes.

As artes nos cards são ilustrações de voz, consulta a uma API e edição de vídeo. O menu, a indicação de seção ativa, a expansão automática do arquivo e a cópia do endereço ficam em `assets/js/main.js`. O guia de projetos usa um diálogo nativo com respostas pré-escritas.

No celular, o layout passa a uma coluna e a imagem usa um arquivo menor. A entrada da apresentação e as transições de botões e cards duram menos de um segundo. O site respeita a preferência de movimento reduzido e oferece um controle para pausar as animações.

## Execução

Abra `index.html` ou execute `python -m http.server 8000` na raiz e acesse `http://localhost:8000`. O site é servido como HTML, CSS, JavaScript, imagens e PDF. O botão de cópia de e-mail aparece quando o navegador disponibiliza a área de transferência em um contexto seguro.

Os ícones Bootstrap Icons v1.13.1 usam a licença MIT em `assets/icons/LICENSE-bootstrap-icons.txt`.

## Currículo

O PDF de uma página fica em `assets/docs/kaue-oliveira-curriculo.pdf`. Para gerar uma nova versão, atualize `scripts/build_resume.py` e execute `python scripts/build_resume.py` em um ambiente com ReportLab.

O endereço profissional é **kauedeoliveira.dev@gmail.com**.
