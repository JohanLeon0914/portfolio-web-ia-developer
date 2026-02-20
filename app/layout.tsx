import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "Johan León — Full Stack Developer",
  description: "...",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { url: "/favicon-192x192.png", sizes: "192x192" },
      { url: "/favicon-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <div className="noise" aria-hidden="true" />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
