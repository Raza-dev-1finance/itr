import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import localFont from 'next/font/local'

// If you want to use a custom font you need to add it first in the pages/_app.tsx
// const myFont = localFont({ src: '/fonts/fonnts.com-Spirits-Soft-.otf' })

export const metadata: Metadata = {
  title: "ITR Filing",
  description: "ITR Filing",
  keywords: ["ITR", "Filing", "Tax", "Compliance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Markazi+Text:wght@400..700&display=swap" rel="stylesheet"/>
      </Head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
