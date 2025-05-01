import type { Metadata } from 'next';
import { Fira_Sans } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '600', '700'], // Select weights you want
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'ITR Filing',
  description: 'ITR Filing',
  keywords: ['ITR', 'Filing', 'Tax', 'Compliance'],
  openGraph: {
    images: [
      {
        url: 'https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/Website_team/Backend/ITRSubdomain_1746088599.png',
        alt: 'ITR Filing Thumbnail',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaSans.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> */}
      </Head>
      <body className={`antialiased bg-[#F9F9F9] lg:bg-[#E2E1F3] min-h-screen`}>{children}</body>
    </html>
  );
}
