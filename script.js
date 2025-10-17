/* =========================================================
   HORIZONTE JIU JITSU • TIMER
   Versão: 1.9.4
   Alterações: Som appintroboom.mp3 no splash + atualização de versão
   ========================================================= */

(() => {
  "use strict";

  /* --------------------------
     ELEMENTOS GLOBAIS
  --------------------------- */
  const splash = document.getElementById("splash");
  const introSound = document.getElementById("appIntroSound");
  const buildInfo = document.getElementById("buildInfo");
  const countdownDisplay = document.getElementById("countdownDisplay");
  const statusPanel = document.getElementById("statusPanel");
  const startPauseBtn = document.getElementById("startPauseBtn");
  const stopBtn = document.getElementById("stopBtn");
  const resetBtn = document.getElementById("resetBtn");
  const soundTestBtn = document.getElementById("soundTestBtn");
  const applyBtn = document.getElementById("applyBtn");
  const prepSelect = document.getElementById("prepSelect");
  const minutesSelect = document.getElementById("minutesSelect");
  const secondsSelect = document.getElementById("secondsSelect");
  const roundsSelect = document.getElementById("roundsSelect");
  const restSelect = document.getElementById("restSelect");
  const themeSelect = document.getElementById("themeSelect");
  const soundSelect = document.getElementById("soundSelect");
  const themeSelectMobile = document.getElementById("themeSelectMobile");
  const soundSelectMobile = document.getElementById("soundSelectMobile");
  const timeText = document.getElementById("timeText");
  const dateText = document.getElementById("dateText");

  /* --------------------------
     ÁUDIOS
  --------------------------- */
  const sounds = {
    beep: new Audio("assets/beep.mp3"),
    click: new Audio("assets/click.mp3"),
    fight: new Audio("assets/fight.mp3"),
    gong: new Audio("assets/gong.mp3"),
    endrest: new Audio("assets/end_rest.mp3")
  };

  Object.values(sounds).forEach(a => {
    a.preload = "auto";
    a.volume = 0.8;
  });

  /* --------------------------
     VARIÁVEIS DE ESTADO
  --------------------------- */
  let timer = null;
  let remaining = 0;
  let round = 1;
  let totalRounds = 1;
  let restTime = 0;
  let prepTime = 0;
  let state = "idle"; // idle | running | paused | rest | prep | finished
  let soundEnabled = true;
  let focusMode = false;

  /* --------------------------
     SPLASH + SOM INTRODUTÓRIO
  --------------------------- */
  if (introSound) {
    try {
      setTimeout(() => {
        introSound.currentTime = 0;
        introSound.play().catch(() => {});
      }, 200);
    } catch (e) {}
  }

  setTimeout(() => {
    splash.classList.add("hidden");
    document.body.classList.remove("splashing");
  }, 5000);

  /* --------------------------
     DATA E HORA
  --------------------------- */
  function updateDateTime() {
    const now = new Date();
    dateText.textContent = now.toLocaleDateString("pt-BR");
    timeText.textContent = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  /* --------------------------
     FUNÇÕES UTILITÁRIAS
  --------------------------- */
  function playSound(name) {
    if (!soundEnabled) return;
    const s = sounds[name];
    if (s) {
      s.currentTime = 0;
      s.play().catch(() => {});
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function resetDisplayColor() {
    countdownDisplay.style.color = "";
    countdownDisplay.style.animation = "none";
  }

  function blink(color, times = 3, speed = 300) {
    let i = 0;
    const interval = setInterval(() => {
      countdownDisplay.style.color = i % 2 === 0 ? color : "";
      if (++i > times * 2) clearInterval(interval);
    }, speed);
  }

  /* --------------------------
     TEMAS E SONS
  --------------------------- */
  function applyTheme(value) {
    document.documentElement.dataset.theme = value;
    localStorage.setItem("theme", value);
  }

  function applySoundState(value) {
    soundEnabled = value === "on";
    localStorage.setItem("sound", value);
  }

  themeSelect.addEventListener("change", e => {
    applyTheme(e.target.value);
    themeSelectMobile.value = e.target.value;
  });
  themeSelectMobile.addEventListener("change", e => {
    applyTheme(e.target.value);
    themeSelect.value = e.target.value;
  });

  soundSelect.addEventListener("change", e => {
    applySoundState(e.target.value);
    soundSelectMobile.value = e.target.value;
  });
  soundSelectMobile.addEventListener("change", e => {
    applySoundState(e.target.value);
    soundSelect.value = e.target.value;
  });

  /* --------------------------
     INICIALIZAÇÃO DE PREFERÊNCIAS
  --------------------------- */
  const savedTheme = localStorage.getItem("theme") || "horizon";
  const savedSound = localStorage.getItem("sound") || "on";
  themeSelect.value = themeSelectMobile.value = savedTheme;
  soundSelect.value = soundSelectMobile.value = savedSound;
  applyTheme(savedTheme);
  applySoundState(savedSound);

  /* --------------------------
     FUNÇÕES DE CONTROLE DO TIMER
  --------------------------- */
  function updateDisplay() {
    countdownDisplay.textContent = formatTime(remaining);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startCountdown(duration, nextState) {
    remaining = duration;
    updateDisplay();
    stopTimer();
    state = nextState;
    timer = setInterval(() => {
      remaining--;
      updateDisplay();

      // últimos segundos
      if (remaining <= 3 && remaining > 0) {
        countdownDisplay.style.color = "#ef4444";
        countdownDisplay.style.animation = "blink 0.8s step-end infinite";
        playSound("beep");
      }

      if (remaining <= 0) {
        stopTimer();
        countdownDisplay.style.animation = "none";

        if (state === "prep") {
          playSound("fight");
          startRound();
        } else if (state === "running") {
          playSound("gong");
          if (round < totalRounds) {
            startRest();
          } else {
            finishAll();
          }
        } else if (state === "rest") {
          playSound("endrest");
          round++;
          startRound();
        }
      }
    }, 1000);
  }

  function startPrep() {
    state = "prep";
    statusPanel.textContent = "PREPARAÇÃO";
    countdownDisplay.style.color = "#f59e0b";
    startCountdown(prepTime, "prep");
  }

  function startRound() {
    state = "running";
    countdownDisplay.style.color = "#22c55e";
    statusPanel.textContent = `ROUND ${round}/${totalRounds}`;
    startCountdown(currentRoundTime, "running");
  }

  function startRest() {
    state = "rest";
    countdownDisplay.style.color = "#9aa5b1";
    statusPanel.textContent = "DESCANSO";
    startCountdown(restTime, "rest");
  }

  function finishAll() {
    state = "finished";
    countdownDisplay.style.color = "#ef4444";
    statusPanel.textContent = "FIM DO TREINO";
    playSound("gong");
  }

  function pauseTimer() {
    stopTimer();
    state = "paused";
    countdownDisplay.style.color = "#eab308";
  }

  function resumeTimer() {
    if (state === "paused") {
      startCountdown(remaining, "running");
      countdownDisplay.style.color = "#22c55e";
    }
  }

  function resetAll(confirmReset = true) {
    if (confirmReset && !confirm("Deseja realmente redefinir o cronômetro?")) return;
    stopTimer();
    state = "idle";
    round = 1;
    remaining = 0;
    countdownDisplay.textContent = "00:00";
    resetDisplayColor();
    statusPanel.textContent = "ROUND 1/1 • PAUSADO";
    document.body.classList.remove("focus");
  }

  /* --------------------------
     EVENTOS DE CONTROLE
  --------------------------- */
  applyBtn.addEventListener("click", () => {
    playSound("click");
    const m = parseInt(minutesSelect.value);
    const s = parseInt(secondsSelect.value);
    const total = m * 60 + s;
    prepTime = parseInt(prepSelect.value);
    totalRounds = parseInt(roundsSelect.value);
    restTime = parseInt(restSelect.value);
    currentRoundTime = total;
    resetAll(false);
    alert("Configuração definida!");
  });

  startPauseBtn.addEventListener("click", () => {
    playSound("click");
    if (state === "idle") {
      document.body.classList.add("focus");
      if (prepTime > 0) startPrep();
      else startRound();
      startPauseBtn.textContent = "PAUSAR";
      return;
    }
    if (state === "running") {
      pauseTimer();
      startPauseBtn.textContent = "RETOMAR";
      return;
    }
    if (state === "paused") {
      resumeTimer();
      startPauseBtn.textContent = "PAUSAR";
      return;
    }
  });

  stopBtn.addEventListener("click", () => {
    playSound("click");
    if (confirm("Deseja parar o treino atual?")) {
      resetAll(false);
      startPauseBtn.textContent = "INICIAR";
    }
  });

  resetBtn.addEventListener("click", () => {
    playSound("click");
    resetAll(true);
    startPauseBtn.textContent = "INICIAR";
  });

  soundTestBtn.addEventListener("click", () => {
    playSound("beep");
  });

  /* --------------------------
     RODAPÉ DE VERSÃO
  --------------------------- */
  if (buildInfo) {
    const now = new Date();
    buildInfo.textContent = `v1.9.4 • atualizado em ${now.toLocaleDateString("pt-BR")} • desenvolvido por Vinicius Simões`;
  }

  /* --------------------------
     ANIMAÇÕES CSS
  --------------------------- */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes blink {
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
})();
