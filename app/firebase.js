// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAkoe7d7fN7wRAlGA25Fkr0yjKxh0tQGs4",
  authDomain: "shuri-f0b43.firebaseapp.com",
  projectId: "shuri-f0b43",
  storageBucket: "shuri-f0b43.appspot.com",
  messagingSenderId: "458450813335",
  appId: "1:458450813335:web:5ea5f82cada02c10bbc4d2",
  databaseURL: "https://shuri-f0b43-default-rtdb.firebaseio.com/",
  measurementId: "G-MGTQHK36HD",
};

export const app = initializeApp(firebaseConfig);

export const generateFcmTokenTest = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("🚫 This browser does not support FCM.");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("⚠️ Notification permission not granted!");
      return null;
    }

    const messaging = getMessaging(app);
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY", // From Firebase Console → Project Settings → Cloud Messaging
      serviceWorkerRegistration: registration,
    });

    console.log("✅ Generated FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ FCM Token error:", error);
    return null;
  }
};
