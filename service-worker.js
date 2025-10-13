const CACHE_NAME = 'bjj_timer_v1_9_0_m1';
const ASSETS = ['./','./index.html','./styles.css','./script.js','./manifest.json'];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))});
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)))})