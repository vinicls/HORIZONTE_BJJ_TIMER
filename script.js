/* =========================================================
   HORIZONTE JIU JITSU • TIMER
   Versão: 1.9.5.fix
   Base: v1.9.3 original (restaurada integralmente)
   Alterações: som do splash (appintroboom.mp3), bloqueio de rolagem e Wake Lock.
   ========================================================= */

(function () {

  // =========================================================
  // ===== VARIÁVEIS GERAIS E ELEMENTOS DE INTERFACE =====
  // =========================================================

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

  const dateText = document.getElementById("dateText");
  const timeText = document.getElementById("timeText");

  const buildInfo = document.getElementById("buildInfo");

  // =========================================================
  // ===== SONS E ÁUDIOS =====
  // =========================================================

  const beep = new Audio("assets/beep.mp3");
  const gong = new Audio("assets/gong.mp3");
  const fight = new Audio("assets/fight.mp3");
  const click = new Audio("assets/click.mp3");
  const endRest = new Audio("assets/end_rest.mp3");

  const introSound = document.getElementById("introSound"); // Som do splash

  let soundEnabled = true;

  // =========================================================
  // ===== SPLASH INICIAL =====
  // =========================================================

  const splash = document.getElementById("splash");

  if (splash) {
    setTimeout(() => {
      try {
        introSound.currentTime = 0;
        introSound.play().catch(() => { /* autoplay bloqueado */ });
      } catch (e) { /* ignora erros */ }
      splash.classList.add("hidden");
      document.body.classList.remove("splashing"); // Libera rolagem após o splash
    }, 5000);
  }

  // =========================================================
  // ===== VARIÁVEIS DE CONTROLE DO CRONÔMETRO =====
  // =========================================================

  let timer = null;
  let totalSeconds = 0;
  let remaining = 0;
  let currentRound = 1;
  let totalRounds = 1;
  let restTime = 0;
  let prepTime = 0;
  let state = "idle"; // idle, prep, round, rest, paused, done
  let focusMode = false;

  // =========================================================
  // ===== BLOQUEIO DE TELA (WAKE LOCK API) =====
  // =========================================================

  let wakeLock = null;

  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("[WakeLock] Ativo");
        wakeLock.addEventListener("release", () => {
          console.log("[WakeLock] Liberado");
        });
      }
    } catch (err) {
      console.warn("[WakeLock] Erro ao solicitar:", err);
    }
  }

  function releaseWakeLock() {
    if (wakeLock !== null) {
      wakeLock.release();
      wakeLock = null;
    }
  }

  // =========================================================
  // ===== ATUALIZAÇÃO DE DATA E HORA =====
  // =========================================================

  function updateDateTime() {
    const now = new Date();
    const options = { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" };
    dateText.textContent = now.toLocaleDateString("pt-BR", options).replace(".", "");
    timeText.textContent = now.toLocaleTimeString("pt-BR", { hour12: false });
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

  // =========================================================
  // ===== FUNÇÕES AUXILIARES =====
  // =========================================================

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateStatus(text) {
    statusPanel.textContent = text;
  }

  function playSound(audio) {
    if (soundEnabled) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }

  function resetDisplayColor() {
    countdownDisplay.style.color = "#e6edf3";
  }

  // =========================================================
  // ===== CONTAGEM REGRESSIVA =====
  // =========================================================

  function startCountdown(duration, nextState) {
    remaining = duration;
    clearInterval(timer);

    timer = setInterval(() => {
      countdownDisplay.textContent = formatTime(remaining);

      if (remaining <= 0) {
        clearInterval(timer);

        if (state === "prep") {
          playSound(fight);
          state = "round";
          updateStatus(`ROUND ${currentRound}/${totalRounds}`);
          startCountdown(totalSeconds, "round");
          return;
        }

        if (state === "round") {
          playSound(gong);
          if (currentRound < totalRounds) {
            currentRound++;
            state = "rest";
            updateStatus("DESCANSO");
            startCountdown(restTime, "rest");
          } else {
            finishAll();
          }
          return;
        }

        if (state === "rest") {
          if (currentRound <= totalRounds) {
            playSound(endRest);
            state = "round";
            updateStatus(`ROUND ${currentRound}/${totalRounds}`);
            startCountdown(totalSeconds, "round");
          }
          return;
        }
      }

      // Sinais sonoros e visuais
      if (remaining <= 3 && state === "round") {
        countdownDisplay.style.color = "#ef4444";
        playSound(beep);
      } else if (remaining <= 10 && state === "rest") {
        countdownDisplay.style.color = "#facc15";
        playSound(beep);
      } else if (state === "prep") {
        countdownDisplay.style.color = "#f59e0b";
        playSound(beep);
      }

      remaining--;
    }, 1000);
  }

  // =========================================================
  // ===== FUNÇÕES DE FASES =====
  // =========================================================

  function startPrep() {
    state = "prep";
    updateStatus("PREPARAR!");
    startCountdown(prepTime, "prep");
  }

  function startRound() {
    state = "round";
    updateStatus(`ROUND ${currentRound}/${totalRounds}`);
    playSound(fight);
    startCountdown(totalSeconds, "round");
  }

  function finishAll() {
    state = "done";
    updateStatus("FIM!");
    countdownDisplay.style.color = "#ef4444";
    playSound(gong);
    releaseWakeLock(); // Libera o bloqueio ao final
  }

  // =========================================================
  // ===== TEMAS E SONS =====
  // =========================================================

  function applyTheme(value) {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  }

  function applySoundState(value) {
    soundEnabled = (value === "on");
    localStorage.setItem("sound", value);
  }

  themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
  soundSelect.addEventListener("change", (e) => applySoundState(e.target.value));
  themeSelectMobile.addEventListener("change", (e) => applyTheme(e.target.value));
  soundSelectMobile.addEventListener("change", (e) => applySoundState(e.target.value));

  // Inicializa preferências salvas
  const savedTheme = localStorage.getItem("theme") || "horizon";
  const savedSound = localStorage.getItem("sound") || "on";
  applyTheme(savedTheme);
  applySoundState(savedSound);
  themeSelect.value = savedTheme;
  soundSelect.value = savedSound;
  themeSelectMobile.value = savedTheme;
  soundSelectMobile.value = savedSound;

  // =========================================================
  // ===== BOTÕES PRINCIPAIS =====
  // =========================================================

  soundTestBtn.addEventListener("click", () => {
    if (!soundEnabled) return;
    click.currentTime = 0;
    click.play();
  });

  applyBtn.addEventListener("click", () => {
    prepTime = parseInt(prepSelect.value) || 0;
    const mins = parseInt(minutesSelect.value) || 0;
    const secs = parseInt(secondsSelect.value) || 0;
    totalSeconds = mins * 60 + secs;
    totalRounds = parseInt(roundsSelect.value) || 1;
    restTime = parseInt(restSelect.value) || 0;
    currentRound = 1;
    state = "idle";
    countdownDisplay.textContent = formatTime(totalSeconds);
    updateStatus("PRONTO");
  });

  startPauseBtn.addEventListener("click", () => {
    if (state === "idle" || state === "paused") {
      if (state === "idle") {
        focusMode = true;
        document.body.classList.add("focus");
        currentRound = 1;
        if (prepTime > 0) startPrep();
        else startRound();
        requestWakeLock(); // Mantém a tela ligada
      } else if (state === "paused") {
        state = "round";
        updateStatus(`ROUND ${currentRound}/${totalRounds}`);
        startCountdown(remaining, state);
      }
      startPauseBtn.textContent = "PAUSAR";
      resetBtn.disabled = true;
    } else if (state === "round" || state === "rest" || state === "prep") {
      state = "paused";
      clearInterval(timer);
      updateStatus("PAUSADO");
      startPauseBtn.textContent = "RETOMAR";
    }
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    if (confirm("Deseja realmente PARAR o cronômetro?")) {
      state = "idle";
      focusMode = false;
      document.body.classList.remove("focus");
      countdownDisplay.textContent = "00:00";
      updateStatus("PARADO");
      resetBtn.disabled = false;
      releaseWakeLock(); // Libera o bloqueio ao parar
    }
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Deseja realmente redefinir as configurações iniciais?")) {
      clearInterval(timer);
      state = "idle";
      countdownDisplay.textContent = "00:00";
      updateStatus("PRONTO");
      document.documentElement.setAttribute("data-theme", "horizon");
      themeSelect.value = "horizon";
      soundSelect.value = "on";
      localStorage.setItem("theme", "horizon");
      localStorage.setItem("sound", "on");
      prepSelect.value = "0";
      minutesSelect.value = "5";
      secondsSelect.value = "0";
      roundsSelect.value = "1";
      restSelect.value = "30";
      releaseWakeLock(); // Libera o bloqueio no reset
    }
  });

})();
