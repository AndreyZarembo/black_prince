'use strict';

const CACHE = 'pomodoro-v2';
const SHELL = [
  './',
  './index.html',
  './locales.js',
  './manifest.webmanifest',
  './fonts/DSEG7Classic-Bold.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return; // analytics etc: network only

  // The page itself: network first, so deploys arrive; cache fallback for offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Static assets and web fonts: cache first, fill on miss
  e.respondWith(
    caches.match(req, { ignoreSearch: url.origin === location.origin }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(resp => {
        if (resp.ok || resp.type === 'opaque') {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return resp;
      });
    })
  );
});
