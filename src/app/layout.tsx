import type { Metadata } from 'next';
import { Bangers, Roboto } from 'next/font/google';
import './globals.css';
import { Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const bangers = Bangers({
  variable: '--font-bangers',
  subsets: ['latin'],
  weight: ['400'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Mooz Tech | Web Development Solutions',
  description:
    'Fawwaz at Mooz Tech helps turn exciting ideas into real web projects. Professional web development services and solutions.',
  keywords: [
    'web development',
    'Mooz Tech',
    'Fawwaz',
    'web solutions',
    'software development',
  ],
  authors: [{ name: 'Fawwaz' }],
  creator: 'Fawwaz',
  publisher: 'Mooz Tech',
  robots: 'index, follow',
  metadataBase: new URL('https://mooz.tech'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mooz.tech',
    title: 'Mooz Tech | Web Development Solutions',
    description:
      'Fawwaz at Mooz Tech helps turn exciting ideas into real web projects. Professional web development services and solutions.',
    siteName: 'Mooz Tech',
    images: [
      {
        url: '/mooz-logo.jpg',
        width: 800,
        height: 800,
        alt: 'Mooz Tech Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mooz Tech | Web Development Solutions',
    description:
      'Fawwaz at Mooz Tech helps turn exciting ideas into real web projects. Professional web development services and solutions.',
    images: ['/mooz-logo.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/mooz-logo.jpg', type: 'image/jpeg', sizes: '180x180' },
    ],
    apple: [{ url: '/mooz-logo.jpg', sizes: '180x180', type: 'image/jpeg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${bangers.variable} ${roboto.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
