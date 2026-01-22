import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titleFont = localFont({
  src: '../public/fonts/AtAero-Regular.otf',
  variable: '--font-title',
});

const bodyFont = localFont({
  src: '../public/fonts/Elianto-Regular.otf',
  variable: '--font-body',
});
const thirdFont = localFont({
  src: '../public/fonts/kanopibrazil-regular.otf',
  variable: '--font-third',
});

const race_font = localFont({
  src: '../public/fonts/race_sport.otf',
  variable: '--font-race',
});

const Angelos = localFont({
  src: '../public/fonts/Angelos.ttf',
  variable: '--font-angelos',
});

const Flagfies = localFont({
  src: '../public/fonts/Flagfies.ttf',
  variable: '--font-flagfies',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rahul Saini",
  "url": "https://rahulsaini.dev",
  "jobTitle": "Full-Stack Developer",
  "description": "Rahul Saini is a passionate Full-Stack Developer specializing in React, Next.js, Node.js, and Blockchain development.",
  "sameAs": [
    "https://github.com/RahulSainijeelo",
    // "https://twitter.com/yourhandle", 
    // "https://linkedin.com/in/yourhandle"
  ]
};

export const metadata: Metadata = {
  title: {
    default: "Exploring Me | RAHUL SAINI",

    template: "%s | Rahul Saini"
  },
  description: "Rahul Saini - A passionate Full-Stack Developer specialized in React, Next.js, Node.js, and Blockchain. Crafting seamless digital experiences and robust backend services.",
  keywords: ["Rahul Saini", "Portfolio", "Full-Stack Developer", "Blockchain Developer", "Solana", "Ethereum", "React", "Next.js", "Node.js", "Solidity", "Software Engineer"],
  authors: [{ name: "Rahul Saini" }],
  creator: "Rahul Saini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahul-saini.me", // Replace with your actual domain
    siteName: "Rahul Saini Portfolio",
    title: "Rahul Saini | Full-Stack Developer & Blockchain Explorer",
    description: "Exploring the intersection of elegant frontend design and sophisticated backend architecture.",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image to /public
        width: 1200,
        height: 630,
        alt: "Rahul Saini Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Saini | Full-Stack Developer",
    description: "Full-Stack Developer crafting engaging frontends and sophisticated backends.",
    creator: "@rahulsaini", // Replace with your actual twitter handle
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titleFont.variable} ${Flagfies.variable} ${Angelos.variable} ${bodyFont.variable} ${thirdFont.variable} ${race_font.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
