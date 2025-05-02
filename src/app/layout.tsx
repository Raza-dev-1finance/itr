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
      <body className={`antialiased bg-[#F9F9F9] lg:bg-[#E2E1F3] min-h-screen`}>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}></script>
        <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
          `}}>
        </script>
        <script dangerouslySetInnerHTML={{__html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}}></script>
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {children}
      </body>
    </html>
  );
}
