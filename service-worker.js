const CACHE_NAME = 'hale-man-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',

  // آدرس کامل عکس‌هایی که استفاده کردید را هم اضافه کنید
  'favicon.ico',
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});