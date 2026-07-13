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
    default: "Play Word Grid Online Free — No Download | WordGrid",
    template: "%s | WordGrid",
  },
  description:
    "Play WordGrid online free in your browser. Connect adjacent letters in classic or larger square grids, try timed or Zen mode, and come back for the Daily board. No download, no sign-up.",
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
    title: "Play Word Grid Online Free — WordGrid",
    description:
      "Connect adjacent letters in square grids to find hidden words. Play free in your browser with timed, Zen, and Daily boards.",
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
    title: "Play Word Grid Online Free — WordGrid",
    description: "Find words in square grids. Free browser play, no download.",
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
