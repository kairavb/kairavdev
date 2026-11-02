import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { PageGrid } from "./components/PageGrid";
import { ScrollToTop } from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kairav.dev"),
  title: "Kairav Bhatia | Software Engineer",
  description: "Software engineer from New Delhi building fast, clean full-stack web apps, backends in Go, and the DevOps that keeps them running.",
  keywords: ["Kairav Bhatia", "Software Engineer", "Full Stack Developer", "Golang", "DevOps", "Web Developer", "New Delhi"],
  authors: [{ name: "Kairav Bhatia" }],
  alternates: { canonical: "https://kairav.dev" },
  openGraph: {
    title: "Kairav Bhatia | Software Engineer",
    description: "Software engineer building fast, clean full-stack web apps, backends in Go, and the DevOps that keeps them running.",
    url: "https://kairav.dev",
    siteName: "Kairav Bhatia",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kairav Bhatia - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairav Bhatia | Software Engineer",
    description: "Software engineer building fast, clean full-stack web apps, backends in Go, and the DevOps that keeps them running.",
    creator: "@iamkairav",
    images: ["/og.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kairav Bhatia",
  url: "https://kairav.dev",
  image: "https://kairav.dev/profile.jpg",
  jobTitle: "Software Engineer",
  description:
    "Software engineer from New Delhi building fast, clean full-stack web apps, backends in Go, and the DevOps that keeps them running.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  knowsAbout: ["Go", "TypeScript", "React", "Next.js", "Node.js", "DevOps", "PostgreSQL", "Docker", "Linux"],
  sameAs: [
    "https://github.com/kairavb",
    "https://linkedin.com/in/kairavb",
    "https://x.com/iamkairav",
    "https://leetcode.com/u/kairavb/",
    "https://codeforces.com/profile/kairav/",
    "https://www.instagram.com/iamkairav/",
    "https://medium.com/@kairavb",
    "https://takeuforward.org/profile/kairav",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollToTop />
        <Navbar />
        <PageGrid>{children}</PageGrid>
        <Analytics />
      </body>
    </html>
  );
}
