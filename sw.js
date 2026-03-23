/* ─────────────────────────────────────────────
   sw.js — Pranay Rishi Portfolio Service Worker
   Enables offline viewing via cache-first strategy
───────────────────────────────────────────── */
const CACHE = 'pranay-portfolio-v1';
const PRECACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/images/pfp.png'
];

// Install: pre-cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', e => {
  // Only handle GET requests for same-origin or CDN assets
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Cache successful responses
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
