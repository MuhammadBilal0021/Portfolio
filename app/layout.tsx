import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BILAL.WORKS — AI Automation Engineer | Deep Space Portfolio",
  description:
    "Muhammad Bilal — AI Automation Engineer, RAG & LLM Specialist, NLP Pipeline Builder. Building production-grade intelligent systems from Islamabad, Pakistan.",
  keywords: [
    "AI Engineer", "Machine Learning", "LangGraph", "LangChain", "RAG",
    "Automation", "Python", "Muhammad Bilal", "NLP", "LLM",
  ],
  authors: [{ name: "Muhammad Bilal" }],
  openGraph: {
    title: "BILAL.WORKS — AI Automation Engineer",
    description: "Scroll through deep space to explore AI agents, ML pipelines, and automation systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#03030a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
