const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  '/index.html',
  '/style.css',
  '/text.css',
  '/effects.js',
  '/script.min.js',
  '/img/pattern.png',
  '/img/favicon.ico',
  '/img/chesspieces/wikipedia/bB.svg',
  '/img/chesspieces/wikipedia/bK.svg',
  '/img/chesspieces/wikipedia/bN.svg',
  '/img/chesspieces/wikipedia/bP.svg',
  '/img/chesspieces/wikipedia/bQ.svg',
  '/img/chesspieces/wikipedia/bR.svg',
  '/img/chesspieces/wikipedia/wB.svg',
  '/img/chesspieces/wikipedia/wK.svg',
  '/img/chesspieces/wikipedia/wN.svg',
  '/img/chesspieces/wikipedia/wP.svg',
  '/img/chesspieces/wikipedia/wQ.svg',
  '/img/chesspieces/wikipedia/wR.svg',
  '/audio/error.mp3',
  '/audio/move.mp3',
  '/css/chessboard-1.0.0.css',
  '/js/chessboard-1.0.0.min.js',
  '/chessrules/chess.min.js'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
        document.getElementById("#download").style.display = "none";
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});