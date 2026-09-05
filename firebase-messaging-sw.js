// Service Worker مخصوص Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCqN16oDe7vut3Smp4L48y8yfSt3dHcSUQ",
  authDomain: "app-khanevadeh-bc38f.firebaseapp.com",
  databaseURL: "https://app-khanevadeh-bc38f-default-rtdb.firebaseio.com",
  projectId: "app-khanevadeh-bc38f",
  storageBucket: "app-khanevadeh-bc38f.firebasestorage.app",
  messagingSenderId: "646966036280",
  appId: "1:646966036280:web:8f10776ac2d5b3971a63cd"
});

const messaging = firebase.messaging();

// نمایش نوتیف وقتی اپ کاملاً بسته یا در پس‌زمینه است
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'گروه خانوادگی';
  const body = (payload.notification && payload.notification.body) || '';
  self.registration.showNotification(title, {
    body: body,
    icon: 'icon.png',
    badge: 'icon.png',
    vibrate: [100, 50, 100],
    dir: 'rtl',
    lang: 'fa'
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('./');
    })
  );
});
