// ===== HORIZONTE JIU JITSU • TIMER — v2.0.2 =====
// Unificados selects, precisão com performance.now, modo infinito, fullscreen, presets, swipe, acessibilidade, PWA prompt
// Correção: Splash finaliza em 5s com som appintroboom.mp3, main escondido até splash terminar
// v2.0.1: Removido export/import, ajustes em presets, status no modo foco, seletores/presets lado a lado, favicon, piscar preparação
// v2.0.2: Seletores de config horizontal (sem rolagem), temas/sons lado a lado, logo menor à direita dos botões no foco, sons ON por padrão

(() => {
  'use strict';

  // ---- Elementos principais
  const display = document.getElementById('countdownDisplay');
  const statusPanel = document.getElementById('statusPanel');
  const prepSelect = document.getElementById('prepSelect');
  const minutesSelect = document.getElementById('minutesSelect');
  const secondsSelect = document.getElementById('secondsSelect');
  const roundsSelect = document.getElementById('roundsSelect');
  const restSelect = document.getElementById('restSelect');
  const applyBtn = document.getElementById('applyBtn');
  const startPauseBtn = document.getElementById('startPauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const soundTestBtn = document.getElementById('soundTestBtn');
  const dateText = document.getElementById('dateText');
  const timeText = document.getElementById('timeText');
  const themeSelect = document.getElementById('themeSelect');
  const soundSelect = document.getElementById('soundSelect');
  const splash = document.getElementById('splash');
  const mainContainer = document.querySelector('.container');
  const buildInfo = document.getElementById('buildInfo');
  const presetBeginnerBtn = document.getElementById('presetBeginnerBtn');
  const presetAdvancedBtn = document.getElementById('presetAdvancedBtn');

  // ---- Versão / Rodapé
  if (buildInfo) {
    buildInfo.textContent = `v2.0.2 • atualizado em 22/10/2025 • desenvolvido por Vinicius Simões`;
  }

  // ---- Data/Hora
  function updateDateTime() {
    const now = new Date();
    const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    if (dateText) dateText.textContent = `Data: ${dd}/${mm}/${yyyy} (${dias[now.getDay()]})`;
    if (timeText) timeText.textContent = `Hora: ${now.toLocaleTimeString('pt-BR', { hour12: false })}`;
  }
  setInterval(updateDateTime, 250);
  updateDateTime();

  // ---- Detecção de dispositivo (sem UA)
  function getDeviceClass() {
    const mm = window.matchMedia;
    const coarse = mm && mm('(pointer:coarse)').matches;
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    if (coarse && sw < 1280) return 'mobile';
    if (sw >= 1280 && sh >= 720) return 'tv';
    return 'desktop';
  }
  function applyDeviceClass() {
    document.body.setAttribute('data-device', getDeviceClass());
  }
  applyDeviceClass();
  window.addEventListener('resize', applyDeviceClass);

  // ---- Sons
  const sounds = {
    tick: document.getElementById('sound-tick'),
    fight: document.getElementById('sound-fight'),
    gong: document.getElementById('sound-gong'),
    click: document.getElementById('sound-click'),
    intro: document.getElementById('sound-intro')
  };
  Object.values(sounds).forEach(a => { a.preload = 'auto'; a.volume = 0.9; });

  function play(name) {
    const on = soundSelect.value === 'on';
    if (!on) {
      if ('vibrate' in navigator) navigator.vibrate(200);
      return;
    }
    const a = sounds[name];
    if (!a) return;
    try {
      a.currentTime = 0;
      a.play().catch(() => {
        setTimeout(() => a.play().catch(e => console.error('Erro ao tocar som:', e)), 100);
      });
    } catch (e) {
      console.error('Erro ao tocar som:', e);
    }
  }
  function unlockAudio() {
    Object.values(sounds).forEach(a => a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(e => console.error('Erro ao desbloquear áudio:', e)));
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  }
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
  soundTestBtn.addEventListener('click', () => {
    play('click');
    setTimeout(() => play('tick'), 120);
    setTimeout(() => play('gong'), 340);
  });

  // ---- Swipe para pause/stop em mobile
  let touchStartX = 0;
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0 && running) pause();
      else if (deltaX < 0 && confirm('Parar e voltar à tela principal?')) { stopToIdle(); exitFocus(); }
    }
  }
  document.getElementById('timerSection').addEventListener('touchstart', handleTouchStart);
  document.getElementById('timerSection').addEventListener('touchend', handleTouchEnd);

  // ---- Tema e persistência
  function applyTheme(value) {
    if (['classico', 'claro', 'estados'].includes(value)) document.documentElement.setAttribute('data-theme', value);
    else document.documentElement.setAttribute('data-theme', 'horizon');
    localStorage.setItem('bjj_timer_theme', value);
  }
  function syncSelect(id, value) {
    const select = document.getElementById(id);
    if (select) select.value = value;
    if (id === 'themeSelect') applyTheme(value);
    else if (id === 'soundSelect') saveSettings({ soundOn: value === 'on' });
  }
  themeSelect.addEventListener('change', e => syncSelect('themeSelect', e.target.value));
  soundSelect.addEventListener('change', e => syncSelect('soundSelect', e.target.value));

  const SETTINGS_KEY = 'bjj_timer_settings';
  function saveSettings(partial) {
    try {
      const current = loadSettings() || {};
      const merged = { version: '2.0', ...current, ...partial };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    } catch (e) {
      console.error('Erro ao salvar settings:', e);
    }
  }
  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      const valid = {};
      valid.version = '2.0';
      valid.prepSeconds = [0, 5, 10].includes(+obj.prepSeconds) ? +obj.prepSeconds : 0;
      valid.roundMinutes = (Number.isFinite(+obj.roundMinutes) && +obj.roundMinutes >= 0 && +obj.roundMinutes <= 10) ? +obj.roundMinutes : 5;
      valid.roundSeconds = [0, 15, 30, 45].includes(+obj.roundSeconds) ? +obj.roundSeconds : 0;
      valid.rounds = ['infinite', 1, 2, 3, 4, 5].includes(obj.rounds) ? obj.rounds : 1;
      valid.restSeconds = [10, 20, 30, 40, 50, 60].includes(+obj.restSeconds) ? +obj.restSeconds : 30;
      valid.theme = ['horizon', 'classico', 'claro', 'estados'].includes(obj.theme) ? obj.theme : 'horizon';
      valid.soundOn = (obj.soundOn === false) ? false : true;
      return valid;
    } catch (e) {
      console.error('Erro ao carregar settings:', e);
      return null;
    }
  }

  // Definir som ON como padrão
  syncSelect('soundSelect', 'on');
  const cached = loadSettings();
  const themeSaved = (cached && cached.theme) || localStorage.getItem('bjj_timer_theme') || 'horizon';
  syncSelect('themeSelect', themeSaved);
  if (cached) {
    prepSelect.value = String(cached.prepSeconds);
    minutesSelect.value = String(cached.roundMinutes);
    secondsSelect.value = String(cached.roundSeconds);
    roundsSelect.value = String(cached.rounds);
    restSelect.value = String(cached.restSeconds);
    if (cached.soundOn !== undefined) syncSelect('soundSelect', cached.soundOn ? 'on' : 'off');
  }

  // ---- Estado do timer
  let cfg = {
    prepSeconds: Number(prepSelect.value),
    roundSeconds: (Number(minutesSelect.value) * 60) + Number(secondsSelect.value),
    rounds: roundsSelect.value,
    restSeconds: Number(restSelect.value)
  };
  let phase = 'idle';
  let running = false;
  let remain = cfg.roundSeconds;
  let currentRound = 1;
  let initialPrepPending = false;
  let lastTick = null;
  let lastWhole = null;

  function setStateAttr(state) { document.body.setAttribute('data-state', state); }
  function setDisplayWarning(warn) { display.classList.toggle('final-warning', warn); display.classList.toggle('flash-red', warn); }
  function setRestWarning(warn) { display.classList.toggle('rest-warning', warn); display.classList.toggle('flash-amber', warn); }
  function setPrepWarning(warn) { display.classList.toggle('prep-warning', warn); display.classList.toggle('flash-prep', warn); }
  function setRestMode(rest) { display.classList.toggle('rest-mode', rest); }

  function render() {
    let t = Math.max(0, Math.floor(remain));
    const m = String(Math.floor(t / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    display.textContent = `${m}:${s}`;
    display.setAttribute('aria-valuenow', t);
  }

  function updateStatusPanel(base) {
    if (cfg.rounds === 'infinite') {
      statusPanel.textContent = `ROUND ∞ • ${base}`;
    } else {
      statusPanel.textContent = `ROUND ${currentRound}/${cfg.rounds} • ${base}`;
    }
  }

  // ---- Modo foco
  function enterFocus() {
    document.body.classList.add('focus');
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(e => console.error('Erro ao entrar em fullscreen:', e));
      }
    } catch (e) {
      console.error('Erro ao tentar fullscreen:', e);
    }
  }
  function exitFocus() {
    document.body.classList.remove('focus');
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(e => console.error('Erro ao sair de fullscreen:', e));
      }
    } catch (e) {
      console.error('Erro ao tentar sair de fullscreen:', e);
    }
  }

  // ---- Fases
  function enterPhase(newPhase) {
    phase = newPhase;
    lastWhole = null;
    if (phase === 'prep') {
      remain = cfg.prepSeconds;
      if (remain <= 0) return enterPhase('round');
      setDisplayWarning(false);
      setRestWarning(false);
      setPrepWarning(true);
      setRestMode(false);
      setStateAttr('prep');
      updateStatusPanel('PREPARAÇÃO');
      render();
      return;
    }
    if (phase === 'round') {
      remain = cfg.roundSeconds;
      setDisplayWarning(false);
      setRestWarning(false);
      setPrepWarning(false);
      setRestMode(false);
      setStateAttr('round');
      updateStatusPanel('LUTA');
      play('fight');
      render();
      return;
    }
    if (phase === 'rest') {
      remain = cfg.restSeconds;
      setDisplayWarning(false);
      setRestWarning(false);
      setPrepWarning(false);
      setRestMode(true);
      setStateAttr('rest');
      updateStatusPanel('DESCANSO');
      render();
      return;
    }
  }

  function nextStepAfterRoundEnd() {
    play('gong');
    if (cfg.rounds === 'infinite' || currentRound < cfg.rounds) {
      if (cfg.restSeconds > 0) {
        enterPhase('rest');
      } else {
        currentRound++;
        enterPhase('round');
      }
    } else {
      finishTraining();
    }
  }

  function perSecondCue() {
    if (phase === 'prep') { play('tick'); return; }
    if (phase === 'rest' && remain > 0 && remain <= 10) { play('tick'); updateStatusPanel('PREPARAR!'); return; }
    if (phase === 'round' && remain > 0 && remain <= 3) { play('tick'); }
  }

  function engine(ts) {
    if (!running) return;
    if (lastTick == null) { lastTick = performance.now(); lastWhole = Math.floor(remain); }
    const dt = (ts - lastTick) / 1000;
    lastTick = ts;
    remain -= dt;

    if (remain <= 0) {
      if (phase === 'prep') {
        initialPrepPending = false;
        enterPhase('round');
      } else if (phase === 'round') {
        nextStepAfterRoundEnd();
      } else if (phase === 'rest') {
        currentRound++;
        enterPhase('round');
      }
      if (!running) { render(); return; }
    }

    const warnRound = (phase === 'round' && remain > 0 && remain <= 3);
    setDisplayWarning(warnRound);
    const warnRest = (phase === 'rest' && remain > 0 && remain <= 10);
    setRestWarning(warnRest);
    const warnPrep = (phase === 'prep' && remain > 0);
    setPrepWarning(warnPrep);

    const nowWhole = Math.floor(remain);
    if (nowWhole !== lastWhole) {
      perSecondCue();
      lastWhole = nowWhole;
    }

    render();
    requestAnimationFrame(engine);
  }

  function setButtonsForState() {
    applyBtn.disabled = running;
    const isIdle = (phase === 'idle' && !running);
    resetBtn.disabled = !isIdle;
    restSelect.disabled = (roundsSelect.value === '1' || roundsSelect.value === 'infinite');
  }

  function syncCfgFromSelects() {
    const m = Number(minutesSelect.value || 0);
    const s = Number(secondsSelect.value || 0);
    cfg = {
      prepSeconds: Number(prepSelect.value || 0),
      roundSeconds: Number.isNaN(m * 60 + s) ? 300 : (m * 60) + s,
      rounds: roundsSelect.value,
      restSeconds: Number(restSelect.value || 30)
    };
  }

  // ---- Iniciar / Pausar / Retomar / Parar / Reset
  function start() {
    if (running) return;
    syncCfgFromSelects();
    lastTick = null;
    lastWhole = null;
    currentRound = 1;
    initialPrepPending = cfg.prepSeconds > 0;
    enterFocus();
    if (initialPrepPending) enterPhase('prep');
    else enterPhase('round');
    running = true;
    setButtonsForState();
    requestAnimationFrame(engine);
    startPauseBtn.innerHTML = '<strong>PAUSAR</strong>';
  }

  function pause() {
    if (!running) return;
    running = false;
    setDisplayWarning(false);
    setRestWarning(false);
    setPrepWarning(false);
    setStateAttr('paused');
    updateStatusPanel('PAUSADO');
    setButtonsForState();
    startPauseBtn.innerHTML = '<strong>RETOMAR</strong>';
  }

  function resume() {
    if (running) return;
    running = true;
    setStateAttr(phase);
    enterFocus();
    setButtonsForState();
    requestAnimationFrame(engine);
    startPauseBtn.innerHTML = '<strong>PAUSAR</strong>';
  }

  function finishTraining() {
    play('gong');
    stopToIdle();
    exitFocus();
  }

  function stopToIdle() {
    running = false;
    phase = 'idle';
    currentRound = 1;
    remain = cfg.roundSeconds;
    initialPrepPending = false;
    setDisplayWarning(false);
    setRestWarning(false);
    setPrepWarning(false);
    setRestMode(false);
    setStateAttr('paused');
    updateStatusPanel('PAUSADO');
    render();
    setButtonsForState();
    startPauseBtn.innerHTML = '<strong>INICIAR</strong>';
  }

  function applyDefaultsAndSave() {
    prepSelect.value = '0';
    minutesSelect.value = '5';
    secondsSelect.value = '0';
    roundsSelect.value = '1';
    restSelect.value = '30';
    syncSelect('themeSelect', 'horizon');
    syncSelect('soundSelect', 'on');
    saveSettings({ prepSeconds: 0, roundMinutes: 5, roundSeconds: 0, rounds: 1, restSeconds: 30, soundOn: true, theme: 'horizon' });
    restSelect.disabled = true;
    cfg.prepSeconds = 0;
    cfg.roundSeconds = 5 * 60;
    cfg.rounds = 1;
    cfg.restSeconds = 30;
    initialPrepPending = false;
    stopToIdle();
  }

  function apply() {
    play('click');
    syncCfgFromSelects();
    saveSettings({
      prepSeconds: cfg.prepSeconds,
      roundMinutes: Number(minutesSelect.value || 0),
      roundSeconds: Number(secondsSelect.value || 0),
      rounds: cfg.rounds,
      restSeconds: cfg.restSeconds,
      soundOn: soundSelect.value === 'on',
      theme: themeSelect.value
    });
    initialPrepPending = false;
    stopToIdle();
  }

  // ---- Presets
  presetBeginnerBtn.addEventListener('click', () => {
    prepSelect.value = '10';
    minutesSelect.value = '3';
    secondsSelect.value = '0';
    roundsSelect.value = '3';
    restSelect.value = '60';
    apply();
  });
  presetAdvancedBtn.addEventListener('click', () => {
    prepSelect.value = '10';
    minutesSelect.value = '5';
    secondsSelect.value = '0';
    roundsSelect.value = '3';
    restSelect.value = '60';
    apply();
  });

  // ---- Listeners
  applyBtn.addEventListener('click', apply);
  startPauseBtn.addEventListener('click', () => {
    if (running) pause();
    else if (phase === 'idle') start();
    else resume();
  });
  stopBtn.addEventListener('click', () => {
    play('click');
    if (confirm('Parar e voltar à tela principal?')) { stopToIdle(); exitFocus(); }
  });
  resetBtn.addEventListener('click', () => {
    if (phase !== 'idle') return;
    if (confirm('RESET: restaurar configuração padrão (1 round, 5:00, sem preparação, tema Horizon, sons ON) e salvar?')) {
      play('click');
      applyDefaultsAndSave();
    }
  });
  roundsSelect.addEventListener('change', () => {
    restSelect.disabled = (roundsSelect.value === '1' || roundsSelect.value === 'infinite');
  });

  window.addEventListener('keydown', (e) => {
    const code = e.code || e.key;
    if (code === 'Enter' || code === 'NumpadEnter' || code === 'MediaPlayPause') {
      e.preventDefault();
      if (running) pause();
      else if (phase === 'idle') start();
      else resume();
      return;
    }
    if (code === 'Backspace' || code === 'Escape') {
      e.preventDefault();
      if (confirm('Parar e voltar à tela principal?')) { stopToIdle(); exitFocus(); }
      return;
    }
    if (/^Digit[1-5]$/.test(code)) {
      const n = Number(code.replace('Digit', ''));
      roundsSelect.value = String(n);
      restSelect.disabled = (n <= 1);
      return;
    }
    if (code === 'Digit0') {
      syncSelect('soundSelect', soundSelect.value === 'on' ? 'off' : 'on');
      return;
    }
  }, { passive: false });

  // ---- PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(e => console.error('Erro ao registrar service worker:', e));
  }

  // ---- PWA Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.createElement('button');
    installBtn.className = 'btn btn-lg btn-fixed';
    installBtn.innerHTML = '<strong>INSTALAR APP</strong>';
    installBtn.style.margin = '10px auto';
    installBtn.style.display = 'block';
    document.querySelector('.set-form').appendChild(installBtn);
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') console.log('PWA instalado');
        deferredPrompt = null;
        installBtn.remove();
      });
    });
  });

  // ---- Splash
  function hideSplash() {
    splash.classList.add('hidden');
    mainContainer.classList.remove('hidden-main');
    play('intro');
    setTimeout(() => {
      if (!splash.classList.contains('hidden')) {
        splash.style.display = 'none';
        mainContainer.style.display = 'flex';
      }
    }, 5500);
  }
  setTimeout(hideSplash, 5000);

  // ---- Inicialização
  apply();
})();