// Ciudad Sangrienta: portal para dos experiencias Unity WebGL.
// Los iframes se crean solo al pulsar Jugar para no descargar ambas builds a la vez.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

function createUnityPlayer(settings) {
  const shell = document.getElementById(settings.shell);
  const frame = document.getElementById(settings.frame);
  const coverButton = document.getElementById(settings.start);
  const loading = document.getElementById(settings.loading);
  const state = document.getElementById(settings.state);
  const fullButton = document.getElementById(settings.fullscreen);
  const reloadButton = document.getElementById(settings.reload);
  const stopButton = document.getElementById(settings.stop);
  let started = false;

  function launch() {
    if (started) return;
    if (otherPlayer && otherPlayer.isRunning()) otherPlayer.stop();
    started = true;
    shell.classList.add('is-started');
    loading.hidden = false;
    state.textContent = 'CARGANDO VISOR UNITY...';
    [fullButton, reloadButton, stopButton].forEach(button => button.disabled = false);
    frame.src = frame.dataset.src;
  }
  function stop() {
    if (document.fullscreenElement === shell && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    frame.removeAttribute('src');
    started = false;
    shell.classList.remove('is-started');
    loading.hidden = true;
    state.textContent = 'SISTEMA EN ESPERA';
    [fullButton, reloadButton, stopButton].forEach(button => button.disabled = true);
  }
  function reload() {
    if (!started) return;
    loading.hidden = false;
    state.textContent = 'RECARGANDO UNITY...';
    frame.src = frame.dataset.src;
  }
  let otherPlayer = null;
  function setOtherPlayer(player) { otherPlayer = player; }
  coverButton.addEventListener('click', () => { launch(); frame.focus(); });
  frame.addEventListener('load', () => {
    if (!started) return;
    // iframe load significa que se recibió HTML, no que Unity haya finalizado su carga.
    loading.hidden = true;
    state.textContent = 'VISOR ABIERTO · HAZ CLIC PARA JUGAR';
  });
  reloadButton.addEventListener('click', reload);
  stopButton.addEventListener('click', stop);
  fullButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === shell) await document.exitFullscreen();
      else if (shell.requestFullscreen) await shell.requestFullscreen();
    } catch (_) { state.textContent = 'PANTALLA COMPLETA NO DISPONIBLE'; }
  });
  document.addEventListener('fullscreenchange', () => {
    const isFull = document.fullscreenElement === shell;
    fullButton.textContent = isFull ? '⤢ SALIR PANTALLA COMPLETA' : '⛶ PANTALLA COMPLETA';
    fullButton.setAttribute('aria-label', isFull ? 'Salir de pantalla completa' : 'Expandir el juego a pantalla completa');
  });
  return { launch, stop, setOtherPlayer, isRunning: () => started };
}

const runnerPlayer = createUnityPlayer({
  shell:'game-shell', frame:'game-frame', start:'start-game', loading:'game-loading',
  state:'game-state', fullscreen:'fullscreen-game', reload:'reload-game', stop:'stop-game'
});
const mazePlayer = createUnityPlayer({
  shell:'maze-game-shell', frame:'maze-game-frame', start:'maze-start-game', loading:'maze-game-loading',
  state:'maze-game-state', fullscreen:'maze-fullscreen-game', reload:'maze-reload-game', stop:'maze-stop-game'
});
// Only one Unity game is loaded at a time, avoiding GPU and memory contention.
runnerPlayer.setOtherPlayer(mazePlayer);
mazePlayer.setOtherPlayer(runnerPlayer);

document.querySelectorAll('[data-launch-game]').forEach(link => link.addEventListener('click', () => runnerPlayer.launch()));
document.querySelectorAll('[data-launch-maze]').forEach(link => link.addEventListener('click', () => mazePlayer.launch()));
