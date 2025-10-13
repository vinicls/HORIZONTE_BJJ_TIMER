// ===== HORIZONTE JIU JITSU • TIMER — v1.9.0_m1 =====

(() => {
  'use strict';

  // ---- Elementos principais
  const display        = document.getElementById('countdownDisplay');
  const statusPanel    = document.getElementById('statusPanel');
  const prepSelect     = document.getElementById('prepSelect');
  const minutesSelect  = document.getElementById('minutesSelect');
  const secondsSelect  = document.getElementById('secondsSelect');
  const roundsSelect   = document.getElementById('roundsSelect');
  const restSelect     = document.getElementById('restSelect');
  const applyBtn       = document.getElementById('applyBtn');
  const startPauseBtn  = document.getElementById('startPauseBtn');
  const stopBtn        = document.getElementById('stopBtn');
  const resetBtn       = document.getElementById('resetBtn');
  const soundTestBtn   = document.getElementById('soundTestBtn');
  const dateText       = document.getElementById('dateText');
  const timeText       = document.getElementById('timeText');
  const themeSelect    = document.getElementById('themeSelect');
  const soundSelect    = document.getElementById('soundSelect');
  const themeSelectMobile = document.getElementById('themeSelectMobile');
  const soundSelectMobile = document.getElementById('soundSelectMobile');
  const splash         = document.getElementById('splash');
  const buildInfo      = document.getElementById('buildInfo');

  // ---- Versão / Rodapé
  if (buildInfo) {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2,'0');
    const mm = String(now.getMonth()+1).padStart(2,'0');
    const yyyy = now.getFullYear();
    buildInfo.textContent = `v1.9.0_m1 • atualizado em ${dd}/${mm}/${yyyy} • desenvolvido por Vinicius Simões`;
  }

  // ---- Data/Hora (ativo para desktop/TV; oculto por CSS no mobile/tablet)
  function updateDateTime(){
    const now = new Date();
    const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    const dd = String(now.getDate()).padStart(2,'0');
    const mm = String(now.getMonth()+1).padStart(2,'0');
    const yyyy = now.getFullYear();
    dateText.textContent = `Data: ${dd}/${mm}/${yyyy} (${dias[now.getDay()]})`;
    timeText.textContent = `Hora: ${now.toLocaleTimeString('pt-BR', { hour12:false })}`;
  }
  setInterval(updateDateTime, 250); updateDateTime();

  // ---- Detecção simples de dispositivo
  function getDeviceClass(){
    const mm = window.matchMedia;
    const coarse = mm && mm('(pointer:coarse)').matches;
    const noHover = mm && mm('(hover: none)').matches;
    const sw = window.screen?.width || window.innerWidth;
    const sh = window.screen?.height || window.innerHeight;
    const ua = navigator.userAgent || '';
    const isTVUA = /Tizen|SMART-TV|SmartTV|Web0S|WebOS|NetCast|HbbTV/i.test(ua);
    if (isTVUA || (noHover && sw>=1280 && sh>=720)) return 'tv';
    if (coarse && !isTVUA) return 'mobile';
    return 'desktop';
  }
  function applyDeviceClass(){ document.body.setAttribute('data-device', getDeviceClass()); }
  applyDeviceClass(); window.addEventListener('resize', applyDeviceClass);

  // ---- Sons
  const sounds = {
    tick : new Audio('assets/beep.mp3'),
    fight: new Audio('assets/fight.mp3'),
    gong : new Audio('assets/gong.mp3'),
    click: new Audio('assets/click.mp3')
  };
  Object.values(sounds).forEach(a => { a.preload = 'auto'; a.volume = 0.9; });
  function getActiveSoundSelect(){ return (window.matchMedia('(max-width: 1024px)').matches ? soundSelectMobile : soundSelect); }
  function play(name){
    const on = (getActiveSoundSelect()?.value ?? 'on') === 'on';
    if(!on) return;
    const a = sounds[name]; if(!a) return;
    try { a.currentTime = 0; a.play(); } catch(e){}
  }
  function unlockAudio(){ Object.values(sounds).forEach(a => a.play().then(()=>{ a.pause(); a.currentTime = 0; }).catch(()=>{})); window.removeEventListener('pointerdown', unlockAudio); window.removeEventListener('keydown', unlockAudio); }
  window.addEventListener('pointerdown', unlockAudio, { once:true }); window.addEventListener('keydown', unlockAudio, { once:true });
  soundTestBtn.addEventListener('click', ()=>{ play('click'); setTimeout(()=>play('tick'), 120); setTimeout(()=>play('gong'), 340); });

  // ---- Tema e persistência
  function applyTheme(value){
    if(value === 'classico' || value === 'claro' || value === 'estados') document.documentElement.setAttribute('data-theme', value);
    else document.documentElement.setAttribute('data-theme', 'horizon');
    localStorage.setItem('bjj_timer_theme', value);
  }
  function getActiveThemeSelect(){ return (window.matchMedia('(max-width: 1024px)').matches ? themeSelectMobile : themeSelect); }

  function syncThemeSelects(value){
    if (themeSelect) themeSelect.value = value;
    if (themeSelectMobile) themeSelectMobile.value = value;
    applyTheme(value);
  }
  function syncSoundSelects(value){
    if (soundSelect) soundSelect.value = value;
    if (soundSelectMobile) soundSelectMobile.value = value;
    saveSettings({ soundOn: value === 'on' });
  }

  if (themeSelect) themeSelect.addEventListener('change', e => syncThemeSelects(e.target.value));
  if (themeSelectMobile) themeSelectMobile.addEventListener('change', e => syncThemeSelects(e.target.value));
  if (soundSelect) soundSelect.addEventListener('change', e => syncSoundSelects(e.target.value));
  if (soundSelectMobile) soundSelectMobile.addEventListener('change', e => syncSoundSelects(e.target.value));

  const SETTINGS_KEY = 'bjj_timer_settings';
  function saveSettings(partial){
    try{
      const current = loadSettings() || {};
      const merged = { version: '1.0', ...current, ...partial };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    }catch(e){}
  }
  function loadSettings(){
    try{
      const raw = localStorage.getItem(SETTINGS_KEY);
      if(!raw) return null;
      const obj = JSON.parse(raw);
      const valid = {};
      valid.version = '1.0';
      valid.prepSeconds  = [0,5,10].includes(+obj.prepSeconds) ? +obj.prepSeconds : 0;
      valid.roundMinutes = (Number.isFinite(+obj.roundMinutes) && +obj.roundMinutes>=0 && +obj.roundMinutes<=10) ? +obj.roundMinutes : 5;
      valid.roundSeconds = [0,15,30,45].includes(+obj.roundSeconds) ? +obj.roundSeconds : 0;
      valid.rounds       = [1,2,3,4,5].includes(+obj.rounds) ? +obj.rounds : 1;
      valid.restSeconds  = [10,20,30,40,50,60].includes(+obj.restSeconds) ? +obj.restSeconds : 30;
      valid.theme        = ['horizon','classico','claro','estados'].includes(obj.theme) ? obj.theme : 'horizon';
      valid.soundOn      = (obj.soundOn === false) ? false : true;
      return valid;
    }catch(e){ return null; }
  }

  const cached = loadSettings();
  const themeSaved = (cached && cached.theme) || localStorage.getItem('bjj_timer_theme') || 'horizon';
  syncThemeSelects(themeSaved);

  if (cached){
    prepSelect.value    = String(cached.prepSeconds);
    minutesSelect.value = String(cached.roundMinutes);
    secondsSelect.value = String(cached.roundSeconds);
    roundsSelect.value  = String(cached.rounds);
    restSelect.value    = String(cached.restSeconds);
    syncSoundSelects(cached.soundOn ? 'on' : 'off');
  } else {
    syncSoundSelects('on');
  }

  // ---- Estado do timer
  let cfg = {
    prepSeconds: Number(prepSelect.value),
    roundSeconds: (Number(minutesSelect.value)*60)+Number(secondsSelect.value),
    rounds: Number(roundsSelect.value),
    restSeconds: Number(restSelect.value)
  };
  let running = false, lastTick = null, lastWhole = null;
  let phase = 'idle'; // idle | prep | round | rest
  let remain = cfg.roundSeconds, currentRound = 1;

  // Garante preparação antes do 1º round (se configurada)
  let initialPrepPending = false;

  // ---- Utilitários UI
  const fmt = (sec) => { const s = Math.max(0, Math.floor(sec)); const m = Math.floor(s/60); const ss = s % 60; return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`; };
  const setStateAttr = (v) => document.body.setAttribute('data-state', v);
  const render = () => { display.textContent = fmt(remain); };

  const setDisplayWarning = (on) => { display.classList.toggle('final-warning', on); display.classList.toggle('flash-red', on); };
  const setRestMode = (on) => { display.classList.toggle('rest-mode', on); };
  const setRestWarning = (on) => { display.classList.toggle('rest-warning', on); display.classList.toggle('flash-amber', on); };

  function statusText(){ if (phase === 'idle') return 'PAUSADO'; if (phase === 'prep') return 'PREPARAÇÃO'; if (phase === 'round') return 'EM EXECUÇÃO'; if (phase === 'rest') return 'DESCANSO'; return 'PAUSADO'; }
  function updateStatusPanel(custom){ const base = custom || statusText(); statusPanel.textContent = `ROUND ${currentRound}/${cfg.rounds} • ${base}`; }

  // ---- Modo foco
  function enterFocus(){ document.body.classList.add('focus'); }
  function exitFocus(){ document.body.classList.remove('focus'); }

  // ---- Fases
  function enterPhase(newPhase){
    phase = newPhase; lastWhole = null;

    if (phase === 'prep'){
      remain = cfg.prepSeconds;
      if (remain <= 0) return enterPhase('round');
      setDisplayWarning(false); setRestWarning(false); setRestMode(false);
      setStateAttr('prep'); updateStatusPanel('PREPARAÇÃO'); render();
      return;
    }
    if (phase === 'round'){
      remain = cfg.roundSeconds;
      setDisplayWarning(false); setRestWarning(false); setRestMode(false);
      setStateAttr('round'); updateStatusPanel('EM EXECUÇÃO'); play('fight'); render();
      return;
    }
    if (phase === 'rest'){
      remain = cfg.restSeconds;
      setDisplayWarning(false); setRestWarning(false); setRestMode(true);
      setStateAttr('rest'); updateStatusPanel('DESCANSO'); render();
      return;
    }
  }

  function nextStepAfterRoundEnd(){
    play('gong');
    if (currentRound < cfg.rounds){
      if (cfg.restSeconds > 0){ enterPhase('rest'); }
      else { currentRound++; enterPhase('round'); }
    } else { finishTraining(); }
  }

  function perSecondCue(){
    if (phase === 'prep'){ play('tick'); return; }
    if (phase === 'rest' && remain > 0 && remain <= 10){ play('tick'); updateStatusPanel('PREPARAR!'); return; }
    if (phase === 'round' && remain > 0 && remain <= 3){ play('tick'); }
  }

  function engine(ts){
    if(!running) return;
    if(lastTick == null){ lastTick = ts; lastWhole = Math.floor(remain); }
    const dt = (ts - lastTick) / 1000; lastTick = ts;
    remain -= dt;

    if (remain <= 0){
      if (phase === 'prep'){
        initialPrepPending = false;
        enterPhase('round');
      } else if (phase === 'round'){
        nextStepAfterRoundEnd();
      } else if (phase === 'rest'){
        currentRound++;
        enterPhase('round'); // nunca volta para prep entre rounds
      }
      if (!running){ render(); return; }
    }

    const warnRound = (phase === 'round' && remain > 0 && remain <= 3); setDisplayWarning(warnRound);
    const warnRest = (phase === 'rest' && remain > 0 && remain <= 10); setRestWarning(warnRest);

    const nowWhole = Math.floor(remain);
    if(nowWhole !== lastWhole){ perSecondCue(); lastWhole = nowWhole; }

    render();
    requestAnimationFrame(engine);
  }

  function setButtonsForState(){
    applyBtn.disabled = running;
    const isIdle = (phase === 'idle' && !running);
    resetBtn.disabled = !isIdle;
    restSelect.disabled = (Number(roundsSelect.value) <= 1);
  }

  function syncCfgFromSelects(){
    const m = Number(minutesSelect.value || 0);
    const s = Number(secondsSelect.value || 0);
    cfg = {
      prepSeconds: Number(prepSelect.value || 0),
      roundSeconds: (m*60) + s,
      rounds: Number(roundsSelect.value || 1),
      restSeconds: Number(restSelect.value || 30)
    };
  }

  // ---- Iniciar / Pausar / Retomar / Parar / Reset
  function start(){
    if (running) return;

    syncCfgFromSelects();
    lastTick = null; lastWhole = null;
    currentRound = 1;
    initialPrepPending = cfg.prepSeconds > 0;

    enterFocus();
    if (initialPrepPending) enterPhase('prep'); else enterPhase('round');

    running = true;
    setButtonsForState();
    requestAnimationFrame(engine);
    startPauseBtn.innerHTML = '<strong>PAUSAR</strong>';
  }

  function pause(){
    if(!running) return;
    running = false;
    setDisplayWarning(false); setRestWarning(false);
    setStateAttr('paused'); updateStatusPanel('PAUSADO');
    setButtonsForState();
    startPauseBtn.innerHTML = '<strong>RETOMAR</strong>';
  }

  function resume(){
    if(running) return;
    running = true;
    setStateAttr(phase); setButtonsForState();
    requestAnimationFrame(engine);
    startPauseBtn.innerHTML = '<strong>PAUSAR</strong>';
  }

  function finishTraining(){ play('gong'); stopToIdle(); exitFocus(); }

  function stopToIdle(){
    running = false; phase = 'idle'; currentRound = 1; remain = cfg.roundSeconds;
    initialPrepPending = false;
    setDisplayWarning(false); setRestWarning(false); setRestMode(false);
    setStateAttr('paused'); updateStatusPanel('PAUSADO'); render(); setButtonsForState();
    startPauseBtn.innerHTML = '<strong>INICIAR</strong>';
  }

  function applyDefaultsAndSave(){
    prepSelect.value = '0'; minutesSelect.value = '5'; secondsSelect.value = '0'; roundsSelect.value = '1'; restSelect.value = '30';
    syncThemeSelects('horizon'); syncSoundSelects('on');
    saveSettings({ prepSeconds:0, roundMinutes:5, roundSeconds:0, rounds:1, restSeconds:30, soundOn:true, theme:'horizon' });
    restSelect.disabled = true;
    cfg.prepSeconds = 0; cfg.roundSeconds = 5*60; cfg.rounds = 1; cfg.restSeconds = 30;
    initialPrepPending = false; stopToIdle();
  }

  function apply(){
    play('click');
    const m = Number(minutesSelect.value || 0);
    const s = Number(secondsSelect.value || 0);
    cfg.prepSeconds = Number(prepSelect.value || 0);
    cfg.roundSeconds = (m*60) + s;
    cfg.rounds = Number(roundsSelect.value || 1);
    cfg.restSeconds = Number(restSelect.value || 30);
    saveSettings({
      prepSeconds: cfg.prepSeconds,
      roundMinutes: m, roundSeconds: s,
      rounds: cfg.rounds, restSeconds: cfg.restSeconds,
      soundOn: (getActiveSoundSelect().value === 'on'),
      theme: getActiveThemeSelect().value
    });
    initialPrepPending = false;
    stopToIdle();
  }

  // ---- Listeners
  applyBtn.addEventListener('click', apply);
  startPauseBtn.addEventListener('click', () => { if (running) { pause(); } else { if (phase === 'idle') start(); else resume(); } });
  stopBtn.addEventListener('click', () => { play('click'); if (confirm('Parar e voltar à tela principal?')) { stopToIdle(); exitFocus(); } });
  resetBtn.addEventListener('click', () => {
    if (phase !== 'idle') return;
    if (confirm('RESET: restaurar configuração padrão (1 round, 5:00, sem preparação, tema Horizon, sons ON) e salvar?')) {
      play('click'); applyDefaultsAndSave();
    }
  });
  roundsSelect.addEventListener('change', () => { restSelect.disabled = (Number(roundsSelect.value) <= 1); });

  window.addEventListener('keydown', (e) => {
    const code = e.code || e.key;
    if (code === 'Enter' || code === 'NumpadEnter' || code === 'MediaPlayPause'){ e.preventDefault(); if (running) { pause(); } else { if (phase === 'idle') start(); else resume(); } return; }
    if (code === 'Backspace' || code === 'Escape'){ e.preventDefault(); if (confirm('Parar e voltar à tela principal?')) { stopToIdle(); exitFocus(); } return; }
    if (/^Digit[1-5]$/.test(code)){ const n = Number(code.replace('Digit','')); roundsSelect.value = String(n); restSelect.disabled = (n <= 1); return; }
    if (code === 'Digit0'){ const sel = getActiveSoundSelect(); sel.value = (sel.value === 'on') ? 'off' : 'on'; saveSettings({ soundOn: sel.value === 'on' }); return; }
  }, {passive:false});

  // ---- PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  }

  // ---- Splash: bloqueio total de rolagem e clique até desaparecer
  setTimeout(()=> { document.getElementById('splash').classList.add('hidden'); document.body.classList.remove('splashing'); }, 5000);

  // ---- Inicialização (exibição inicial coerente)
  apply();
})();
