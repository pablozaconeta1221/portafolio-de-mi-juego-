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
  }, { threshold: .10 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });


// ========= Integración del videojuego remoto en la misma página =========
// Nota: el contenido WebGL es ajeno a este sitio; se incrusta sin modificar el juego.
const gameShell = document.getElementById('game-shell');
const gameFrame = document.getElementById('game-frame');
const startGameButton = document.getElementById('start-game');
const gameLoading = document.getElementById('game-loading');
const gameState = document.getElementById('game-state');
const fullscreenGameButton = document.getElementById('fullscreen-game');
const reloadGameButton = document.getElementById('reload-game');
const stopGameButton = document.getElementById('stop-game');
const gameSection = document.getElementById('jugar');
let gameStarted = false;

function launchGame() {
  if (gameStarted) return;
  gameStarted = true;
  gameShell.classList.add('is-started');
  gameLoading.hidden = false;
  gameState.textContent = 'CARGANDO PARTIDA...';
  fullscreenGameButton.disabled = false;
  reloadGameButton.disabled = false;
  stopGameButton.disabled = false;
  gameFrame.src = gameFrame.dataset.src;
}

// Cualquier enlace de «Jugar» (encabezado e inicio) abre el juego en el portal.
document.querySelectorAll('[data-launch-game]').forEach(link => {
  link.addEventListener('click', () => {
    launchGame();
    // El href="#jugar" realiza el desplazamiento interno, sin navegar a Netlify.
  });
});
startGameButton.addEventListener('click', () => {
  launchGame();
  gameFrame.focus();
});

gameFrame.addEventListener('load', () => {
  if (!gameStarted) return;
  // El evento indica que cargó la página externa, no que Unity ya terminó de iniciar.
  gameLoading.hidden = true;
  gameState.textContent = 'VISOR ABIERTO · HAZ CLIC PARA JUGAR';
});

reloadGameButton.addEventListener('click', () => {
  if (!gameStarted) return;
  gameLoading.hidden = false;
  gameState.textContent = 'REINICIANDO CARGA...';
  gameFrame.src = gameFrame.dataset.src;
});

stopGameButton.addEventListener('click', async () => {
  if (document.fullscreenElement === gameShell) {
    try { await document.exitFullscreen(); } catch (_) { /* Pantalla completa no disponible. */ }
  }
  gameFrame.removeAttribute('src');
  gameStarted = false;
  gameShell.classList.remove('is-started');
  gameLoading.hidden = true;
  gameState.textContent = 'SISTEMA EN ESPERA';
  fullscreenGameButton.disabled = true;
  reloadGameButton.disabled = true;
  stopGameButton.disabled = true;
});

fullscreenGameButton.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement === gameShell) {
      await document.exitFullscreen();
    } else if (gameShell.requestFullscreen) {
      await gameShell.requestFullscreen();
    }
  } catch (error) {
    gameState.textContent = 'PANTALLA COMPLETA NO DISPONIBLE';
  }
});

document.addEventListener('fullscreenchange', () => {
  const full = document.fullscreenElement === gameShell;
  fullscreenGameButton.textContent = full ? '⤢ SALIR PANTALLA COMPLETA' : '⛶ PANTALLA COMPLETA';
  fullscreenGameButton.setAttribute('aria-label', full ? 'Salir de pantalla completa' : 'Expandir el juego a pantalla completa');
});
