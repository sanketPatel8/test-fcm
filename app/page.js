"use client";
import { useEffect, useState } from "react";
import { generateFcmTokenTest } from "./firebase";

export default function Home() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isChrome = /CriOS/i.test(navigator.userAgent);

    if (isIOS && isChrome) {
      alert(
        "⚠️ Chrome on iOS does not support push notifications. Please open this site in Safari and Add to Home Screen."
      );
      return;
    }

    if (isIOS && !isStandalone) {
      alert("📱 Please add this app to your Home Screen in Safari first.");
      return;
    }

    initFCM();

    async function initFCM() {
      const token = await generateFcmTokenTest();
      if (token) {
        alert("✅ Got FCM Token!");
        setFcmToken(token);
      } else {
        alert("🚫 Push notifications not supported on this device/browser.");
      }
    }
  }, []);

  return (
    <main
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🔔 Firebase Push Notification Setup</h1>
      <p>Open this site in Safari → Add to Home Screen → Then reopen it.</p>

      {fcmToken ? (
        <div>
          <h3>✅ Your FCM Token:</h3>
          <code
            style={{
              display: "block",
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "8px",
              wordBreak: "break-all",
              color: "#333",
              marginTop: "10px",
            }}
          >
            {fcmToken}
          </code>
        </div>
      ) : (
        <p>🔄 Waiting for token...</p>
      )}
    </main>
  );
}
