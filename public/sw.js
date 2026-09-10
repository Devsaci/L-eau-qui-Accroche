// Service Worker - L'eau qui accroche (PWA Offline Cache)
const CACHE_NAME = 'eau-qui-accroche-v1';

// Assets essentiels à mettre en cache lors de l'installation
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/roman-extrait.pdf',
];

// Installation : pré-chargement des assets critiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Certains assets non critiques n’ont pu être pré-mis en cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activation : nettoyage des anciens caches et prise de contrôle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes réseau (Offline-first / Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignorer les requêtes non GET ou non HTTP/HTTPS (ex: chrome-extension://)
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Requêtes de navigation HTML : Network-first avec fallback sur /index.html en cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Fichiers statiques, PDF, polices : Cache-First avec mise à jour en tâche de fond
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Hors-ligne et ressource non encore en cache
        });

      return cachedResponse || fetchPromise;
    })
  );
});
