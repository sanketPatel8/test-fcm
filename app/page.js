"use client";
import { useState, useEffect } from "react";
import { generateFcmTokenTest } from "./firebase";

export default function Home() {
  const [token, setToken] = useState(null);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isChrome = /CriOS/i.test(ua);
    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    setIsIosSafari(isIOS && !isChrome);
    setIsStandalone(standalone);

    if (isIOS && isChrome) {
      alert(
        "⚠️ Chrome on iOS does not support push notifications. Please open this site in Safari and Add to Home Screen."
      );
      return;
    }

    if (isIOS && !standalone) {
      alert(
        "📱 Please add this app to your Home Screen in Safari first to enable notifications."
      );
      return;
    }

    // On Android/Desktop, directly initialize
    if (!isIOS) {
      handleGenerateToken();
    }
  }, []);

  const handleGenerateToken = async () => {
    const t = await generateFcmTokenTest();
    if (t) {
      setToken(t);
      console.log("✅ FCM Token:", t);
    } else {
      console.log("❌ Failed to get FCM token");
    }
  };

  return (
    <main style={{ textAlign: "center", padding: "40px" }}>
      <h1>🔔 Firebase Push Notifications Test</h1>

      {isIosSafari && isStandalone && (
        <>
          <p>
            ✅ You’re using iOS PWA mode. Tap the button below to enable push
            notifications.
          </p>
          <button
            onClick={handleGenerateToken}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            Enable Notifications
          </button>
        </>
      )}

      {!isIosSafari && (
        <p>Token auto-generates for Android & Desktop browsers.</p>
      )}

      {token && (
        <div style={{ marginTop: "20px", wordBreak: "break-all" }}>
          <h3>✅ Your FCM Token:</h3>
          <code>{token}</code>
        </div>
      )}
    </main>
  );
}
