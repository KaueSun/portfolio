"""Generate the portfolio's one-page resume. Requires reportlab and pymupdf for QA."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'docs' / 'kaue-oliveira-curriculo.pdf'
DEST.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor('#22202c')
purple = colors.HexColor('#613599')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=27, leading=32, textColor=ink, spaceAfter=6),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=11, leading=16, textColor=purple, spaceAfter=10),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=15, textColor=ink, spaceAfter=7),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=9, leading=14, textColor=ink, spaceAfter=8),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=15, textColor=purple, spaceBefore=14, spaceAfter=7),
    'project': ParagraphStyle('project', fontName='Helvetica-Bold', fontSize=10, leading=15, textColor=ink, spaceBefore=4, spaceAfter=3),
}
content=[]
def add(text, style='body'):
    content.append(Paragraph(text,styles[style]))
def a(url,label):
    return f'<a href="{url}" color="#613599">{label}</a>'
add('Kaue de Oliveira','name')
add('Desenvolvedor de Software | Web, APIs e Inteligência Artificial','role')
add(a('mailto:kaueodev1@gmail.com','kaueodev1@gmail.com')+' | '+a('https://github.com/KaueSun','github.com/KaueSun')+' | '+a('https://www.linkedin.com/in/kaue-oliveira-20b35b358','LinkedIn'),'small')
content.append(HRFlowable(width='100%',thickness=1,color=colors.HexColor('#dcd2e7')))
add('PERFIL E OBJETIVO','section')
add('Estudante de Ciência da Computação com projetos em aplicações web, APIs, automação e inteligência artificial. Busco estágio em desenvolvimento de software para contribuir com soluções práticas e aprender em equipe.')
add('FORMAÇÃO','section')
add('<b>Ciência da Computação</b> | 4º período, cursando')
add('PROJETOS SELECIONADOS','section')
add(a('https://github.com/KaueSun/Eevee-assistant','EEVEE - Assistente de IA por voz'),'project')
add('Aplicativo para Windows com chat e voz ao vivo, memória aprovada por perfil e biblioteca de materiais. Integra OpenAI e leitura opcional do Google Agenda. Coordena áudio, contexto e interrupções.<br/><b>Tecnologias:</b> Python, OpenAI, Qt e SQLite.')
add(a('https://github.com/KaueSun/OliSnack-API','OliSnack API - Pratos regionais brasileiros'),'project')
add('API com catálogo de pratos, cálculo nutricional por ingrediente e autenticação JWT. Persistência em PostgreSQL, migrations e ambiente com Docker.<br/><b>Tecnologias:</b> Python, FastAPI, PostgreSQL e Docker.')
add(a('https://github.com/KaueSun/Viral-bot','Viral Cuts Bot - Automação de vídeos'),'project')
add('Processa vídeos em segundo plano, transcreve falas, seleciona momentos por contexto e exporta cortes verticais com legendas. Organiza os clipes em um board Kanban.<br/><b>Tecnologias:</b> Python, FastAPI, Whisper, FFmpeg e SQLite.')
add('TECNOLOGIAS E FUNDAMENTOS','section')
add('<b>Frontend:</b> HTML, CSS e JavaScript.<br/><b>Backend e dados:</b> Python, FastAPI, Node.js, APIs REST, PostgreSQL, SQLite e Docker.<br/><b>IA e automação:</b> OpenAI, Google Gemini, Whisper e FFmpeg.<br/><b>Ferramentas:</b> Git e GitHub.<br/><b>Estudos:</b> Java, C++, estruturas de dados, backend e IA aplicada.')
doc=SimpleDocTemplate(str(DEST),pagesize=A4,rightMargin=43,leftMargin=43,topMargin=38,bottomMargin=34,title='Currículo - Kaue de Oliveira',author='Kaue de Oliveira')
doc.build(content)
print(DEST)
