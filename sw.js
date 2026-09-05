// Service Worker ساده برای نمایش نوتیفیکیشن سیستمی
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// دریافت پیام از صفحه اصلی برای نمایش نوتیف
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(data.title || 'گروه خانوادگی', {
      body: data.body || '',
      icon: 'icon.png',
      badge: 'icon.png',
      vibrate: [100, 50, 100],
      dir: 'rtl',
      lang: 'fa'
    });
  }
});

// وقتی کاربر روی نوتیف کلیک می‌کنه، اپ رو باز کنه
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
