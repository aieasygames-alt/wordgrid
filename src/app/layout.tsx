import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieBanner from "@/components/CookieBanner";

const GA_ID = "G-MLZV98LG8Z";

// Anti-flash: apply saved theme before first paint
const themeScript = `
(function(){try{var t=localStorage.getItem('wordgrid-theme')||'dark';var d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.classList.add('light')}else{d.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()
`;

// Consent Mode v2 default: denied until user chooses
const consentScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
`;

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Word Grid — Play Free Word Grid Puzzle Online | WordGrid",
    template: "%s | WordGrid",
  },
  description:
    "Play word grid, the free online word grid puzzle game. Connect adjacent letters in a 4×4 grid to find hidden words — like Boggle, free in your browser. New daily challenge every day. No download, no sign-up.",
  keywords: [
    "boggle online", "boggle online free", "play boggle online free",
    "free boggle", "boggle game", "boggle word game", "play boggle",
    "word grid", "word grid puzzle", "word grid game", "word puzzle",
    "daily word game", "free word game", "browser word game",
    "word search puzzle", "free boggle online",
  ],
  alternates: {
    canonical: BASE_URL,
  },
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
    title: "WordGrid — Free Daily Word Grid Puzzle Game",
    description:
      "Connect adjacent letters in a 4×4 grid to find hidden words. New daily challenge every day!",
    images: [
      {
        url: "/share-card-bg.png",
        width: 1200,
        height: 630,
        alt: "WordGrid — Free word grid puzzle game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WordGrid — Free Daily Word Grid Puzzle",
    description: "Find words in a 4×4 grid. New daily challenge!",
    images: ["/share-card-bg.png"],
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
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <CookieBanner />
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  );
}
