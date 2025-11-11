/* firebase-messaging-sw.js */
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAkoe7d7fN7wRAlGA25Fkr0yjKxh0tQGs4",
  authDomain: "shuri-f0b43.firebaseapp.com",
  projectId: "shuri-f0b43",
  storageBucket: "shuri-f0b43.appspot.com",
  messagingSenderId: "458450813335",
  appId: "1:458450813335:web:5ea5f82cada02c10bbc4d2",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192x192.png",
  });
});
