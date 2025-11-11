// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, isSupported } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyAkoe7d7fN7wRAlGA25Fkr0yjKxh0tQGs4",
//   authDomain: "shuri-f0b43.firebaseapp.com",
//   projectId: "shuri-f0b43",
//   storageBucket: "shuri-f0b43.appspot.com",
//   messagingSenderId: "458450813335",
//   appId: "1:458450813335:web:5ea5f82cada02c10bbc4d2",
//   databaseURL: "https://shuri-f0b43-default-rtdb.firebaseio.com/",
//   measurementId: "G-MGTQHK36HD",
// };

// export const app = initializeApp(firebaseConfig);

// export const generateFcmTokenTest = async () => {
//   try {
//     const supported = await isSupported();
//     if (!supported) {
//       console.warn("🚫 This browser does not support FCM.");
//       return null;
//     }

//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       alert("⚠️ Notification permission not granted!");
//       return null;
//     }

//     const messaging = getMessaging(app);
//     const registration = await navigator.serviceWorker.register(
//       "/firebase-messaging-sw.js"
//     );

//     const token = await getToken(messaging, {
//       vapidKey: "YOUR_VAPID_KEY", // From Firebase Console → Project Settings → Cloud Messaging
//       serviceWorkerRegistration: registration,
//     });

//     console.log("✅ Generated FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.error("❌ FCM Token error:", error);
//     return null;
//   }
// };

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

// ✅ Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// ✅ Generate FCM Token with full browser + SW checks
export const generateFcmTokenTest = async () => {
  try {
    // 🔹 Step 1: Check FCM support
    const fcmSupported = await isSupported();
    if (!fcmSupported) {
      alert("🚫 Firebase Cloud Messaging is not supported in this browser.");
      console.warn("❌ FCM not supported in this environment");
      return null;
    }

    // 🔹 Step 2: Check if service workers are supported
    if (!("serviceWorker" in navigator)) {
      alert("🚫 Service Workers are not supported in this browser.");
      console.warn("❌ Service Worker not supported");
      return null;
    }

    // 🔹 Step 3: Register Service Worker
    let registration;
    try {
      registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("✅ Service Worker registered:", registration);
    } catch (swError) {
      console.error("❌ Failed to register Service Worker:", swError);
      alert("❌ Service Worker registration failed. Check HTTPS or file path.");
      return null;
    }

    // 🔹 Step 4: Ask for Notification permission
    const permission = await Notification.requestPermission();
    console.log("🔔 Notification permission:", permission);

    if (permission !== "granted") {
      alert("⚠️ Notifications permission not granted!");
      return null;
    }

    // 🔹 Step 5: Get Messaging instance and generate token
    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY", // Replace with your real VAPID key
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("✅ Generated FCM Token:", token);
      alert("✅ FCM Token generated successfully!");
      return token;
    } else {
      console.warn(
        "⚠️ No FCM token returned. Possibly APNs not linked in Firebase."
      );
      alert("⚠️ FCM token not generated. Check APNs setup in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error generating FCM Token:", error);
    alert("❌ Error while generating token: " + error.message);
    return null;
  }
};
