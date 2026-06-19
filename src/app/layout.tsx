import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Anti-flash: apply saved theme before first paint
const themeScript = `
(function(){try{var t=localStorage.getItem('wordgrid-theme')||'dark';var d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.classList.add('light')}else{d.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()
`;

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "WordGrid — Free Daily Word Search Puzzle Game",
    template: "%s | WordGrid",
  },
  description:
    "Play WordGrid, a free online Boggle-style word search puzzle game. Connect adjacent letters in a 4×4 grid to find words. New daily challenge every day. No sign-up required.",
  keywords: [
    "word game", "word puzzle", "word search", "boggle online", "boggle free",
    "boggle word game", "daily word game", "word grid", "free word game",
    "browser word game", "boggle style", "free boggle",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WordGrid",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    type: "website",
    siteName: "WordGrid",
    url: BASE_URL,
    title: "WordGrid — Free Daily Word Search Puzzle Game",
    description:
      "Connect adjacent letters in a 4×4 grid to find hidden words. New daily challenge every day!",
  },
  twitter: {
    card: "summary",
    title: "WordGrid — Free Daily Word Puzzle",
    description: "Find words in a 4×4 grid. New daily challenge!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
