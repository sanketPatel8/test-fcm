/* firebase-messaging-sw.js */
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

// ✅ Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAkoe7d7fN7wRAlGA25Fkr0yjKxh0tQGs4",
  authDomain: "shuri-f0b43.firebaseapp.com",
  projectId: "shuri-f0b43",
  storageBucket: "shuri-f0b43.appspot.com",
  messagingSenderId: "458450813335",
  appId: "1:458450813335:web:5ea5f82cada02c10bbc4d2",
});

// ✅ Initialize Messaging
const messaging = firebase.messaging();

// ✅ Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message: ", payload);
  const notificationTitle = payload.notification?.title || "Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ For Safari/iOS PWA compatibility — ensure activate event is claimed
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
