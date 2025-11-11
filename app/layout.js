import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My PWA App",
  description: "PWA with Firebase Push Notifications",
  manifest: "/manifest.json", // 👈 add manifest here
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ PWA & Apple Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />

        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="My PWA App" />

        {/* iOS Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
