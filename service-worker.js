/* =========================================================
   HORIZONTE JIU JITSU • TIMER
   Service Worker — v1.9.5.fix
   Base: v1.9.3 original (restaurada)
   Alterações: atualização do CACHE_NAME e inclusão do som appintroboom.mp3.
   ========================================================= */

const CACHE_NAME = "bjj_timer_v1_9_5_fix";

const FILES_TO_CACHE = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/logo.png",
  "./assets/beep.mp3",
  "./assets/click.mp3",
  "./assets/fight.mp3",
  "./assets/gong.mp3",
  "./assets/end_rest.mp3",
  "./assets/appintroboom.mp3",
  "./icon-192.png",
  "./icon-256.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

/* =========================================================
   INSTALAÇÃO
   ========================================================= */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app files");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* =========================================================
   ATIVAÇÃO
   ========================================================= */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* =========================================================
   FETCH — CACHE-FIRST COM FALLBACK
   ========================================================= */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match("./index.html");
        })
      );
    })
  );
});
