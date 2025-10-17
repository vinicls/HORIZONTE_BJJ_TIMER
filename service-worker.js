/* =========================================================
   HORIZONTE JIU JITSU • TIMER
   Service Worker — v1.9.4
   Atualização: apenas nome do cache (bjj_timer_v1_9_4)
   ========================================================= */

const CACHE_NAME = "bjj_timer_v1_9_4";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/logo.png",
  "./assets/appintroboom.mp3",
  "./assets/beep.mp3",
  "./assets/click.mp3",
  "./assets/fight.mp3",
  "./assets/gong.mp3",
  "./assets/end_rest.mp3",
  "./icon-256.png",
  "./apple-touch-icon.png"
];

/* --------------------------
   INSTALAÇÃO
--------------------------- */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

/* --------------------------
   ATIVAÇÃO
--------------------------- */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* --------------------------
   FETCH
--------------------------- */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response ||
      fetch(event.request).then(fetchRes =>
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        })
      ).catch(() => caches.match("./index.html"))
    )
  );
});
