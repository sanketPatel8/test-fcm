"use client";
import { useEffect, useState } from "react";
import { generateFcmTokenTest } from "./firebase";

export default function Home() {
  const [UToken, setUToken] = useState(null);

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
      alert(
        "📱 Please add this app to your Home Screen in Safari to enable notifications."
      );
      return;
    }

    initFCM();

    async function initFCM() {
      const token = await generateFcmTokenTest();
      if (token) {
        alert("✅ Got FCM Token:\n" + token);
        setUToken(token); // ✅ Update state
      } else {
        alert(
          "🚫 Push notifications not supported on this device/browser.",
          token
        );
        setUToken(token);
      }
    }
  }, []);

  return (
    <main style={{ textAlign: "center", padding: "50px" }}>
      <h1>🔔 Firebase Push Notification Setup</h1>
      <p>Open this in Safari → Add to Home Screen → Then reopen the app.</p>

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
          }}
        >
          {UToken}
        </code>
      </div>
    </main>
  );
}
