const CACHE_NAME = 'shamsi-calendar-cache-v1';
const urlsToCache = [
  '/',
  'index.html', // نام فایل اصلی HTML شما

  // ========== آیکون‌ها (باید توسط شما ساخته شوند) ==========
  'icon-192.png',
  'icon-512.png',

  // ========== کتابخانه‌های خارجی (CDN) ==========
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap'
];

// ۱. نصب Service Worker و کش کردن فایل‌ها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ۲. پاسخ به درخواست‌ها از طریق کش
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // اگر درخواست در کش موجود بود، آن را برگردان
        if (response) {
          return response;
        }
        // در غیر این صورت، از شبکه درخواست کن
        return fetch(event.request);
      })
  );
});

// ۳. حذف کش‌های قدیمی (برای آپدیت‌های آینده)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
