import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Bilal — AI Automation Engineer",
  description:
    "AI Automation Engineer specializing in RAG pipelines, LLM agents, and production-grade automation systems. Building intelligent solutions from Islamabad, Pakistan.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LangGraph",
    "LangChain",
    "RAG",
    "Automation",
    "Python",
    "Muhammad Bilal",
    "NLP",
    "LLM",
  ],
  authors: [{ name: "Muhammad Bilal" }],
  openGraph: {
    title: "Muhammad Bilal — AI Automation Engineer",
    description:
      "Building production-grade AI automation systems, RAG pipelines, and LLM-powered agents.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0A0A0B" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
