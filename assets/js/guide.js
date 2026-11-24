'use strict';

// A transparent, offline guide. No model, microphone or external API is used.
(() => {
  if (!window.HTMLDialogElement) return;
  // Symbols are embedded in each page, so icons also work offline.
  const icon = (name) => `<svg class="icon icon-${name}" width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#ui-${name}"></use></svg>`;
  const root = new URL('../../', document.currentScript.src);
  const link = (path) => new URL(path, root).href;
  const answers = [
    { question: 'Quais projetos usam Python?', text: 'EEVEE, OliSnack API e Viral Cuts Bot usam Python. Eles exploram, respectivamente, assistência por voz, APIs de nutrição e automação de vídeos.', label: 'Conhecer os projetos', path: 'index.html#projects' },
    { question: 'Por onde começar a explorar?', text: 'A EEVEE é o projeto em destaque: uma assistente para Windows com voz ao vivo, memória por perfil e consulta a materiais de estudo. A página do projeto explica a arquitetura e as decisões.', label: 'Explorar a EEVEE', path: 'projects/eevee/' },
    { question: 'O que o Kaue está estudando?', text: 'Kaue cursa Ciência da Computação e estuda IA aplicada, backend e estruturas de dados. Está aberto a estágios, projetos e colaboração.', label: 'Falar com o Kaue', path: 'index.html#contact' },
  ];
  const launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'guide-launch';
  launch.setAttribute('aria-label', 'Explore com a EEVEE');
  launch.setAttribute('aria-haspopup', 'dialog');
  launch.setAttribute('aria-controls', 'portfolio-guide');
  launch.innerHTML = `<span aria-hidden="true">${icon('soundwave')}</span><span>Explore com a EEVEE</span>`;
  const dialog = document.createElement('dialog');
  dialog.id = 'portfolio-guide';
  dialog.className = 'guide-dialog';
  dialog.setAttribute('aria-labelledby', 'guide-title');
  dialog.setAttribute('aria-describedby', 'guide-disclosure');
  dialog.innerHTML = '<div class="guide-header"><h2 id="guide-title">Um guia pelo portfólio.</h2><button class="guide-close" type="button" aria-label="Fechar guia" autofocus><svg class="icon icon-x-lg" width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#ui-x-lg"></use></svg></button></div><p class="guide-disclosure" id="guide-disclosure">Inspirado na EEVEE. Escolha uma pergunta para ver respostas prontas sobre o Kaue. Este guia não usa IA ao vivo.</p><div class="guide-options"></div><div class="guide-answer" role="status" aria-live="polite" aria-atomic="true"><p>O que você quer conhecer?</p></div>';
  const options = dialog.querySelector('.guide-options');
  const output = dialog.querySelector('.guide-answer');
  answers.forEach((answer) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = answer.question;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      options.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      const text = document.createElement('p');
      text.textContent = answer.text;
      const action = document.createElement('a');
      action.href = link(answer.path);
      action.textContent = answer.label;
      action.insertAdjacentHTML('beforeend', icon(answer.path.endsWith('#contact') ? 'chat-dots' : 'arrow-right'));
      action.addEventListener('click', () => dialog.close());
      output.replaceChildren(text, action);
    });
    options.append(button);
  });
  launch.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.guide-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  document.body.append(launch, dialog);
})();
