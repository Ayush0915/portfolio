import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteTitle = "Ayush Kumar Bhadani — Portfolio";
const siteDescription = "Final-year CS (Data Science) student building AI/ML systems — multi-agent pipelines, RAG, and applied ML.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayushkr-bhadani.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Ayush Kumar Bhadani Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ayush Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var theme = (saved === 'light' || saved === 'dark')
                    ? saved
                    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col transition-colors duration-300"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ayush Kumar Bhadani",
              "url": "https://ayushkr-bhadani.vercel.app",
              "sameAs": [
                "https://github.com/Ayush0915",
                "https://www.linkedin.com/in/ayush-kumar-bhadani-78558a21a/"
              ],
              "jobTitle": "AI/ML Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Bangalore Institute of Technology"
              },
              "description": "AI/ML Engineer specializing in multi-agent systems, optimized RAG pipelines, and production machine learning — including a code-review multi-agent system (CodeVerdict, 87.5% precision), a natural-language SQL engine (AskSQL), and an LLM-based career intelligence platform. Final-year B.Tech CS (Data Science) student at Bangalore Institute of Technology with a 9.45 CGPA."
            })
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-10 pt-24">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
