import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Cairo, Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kareemosama.dev'),
  title: 'Kareem Osama — Software Developer | The Digital Atelier',
  description:
    'Signature personal developer portfolio of Kareem Osama. Computer science student, software architect, and creator of the Nexora educational platform. Engineering ideas into digital reality.',
  keywords: [
    'Kareem Osama',
    'كريم أسامة',
    'Software Developer',
    'Computer Science',
    'Nexora',
    'Portfolio',
    'Frontend Architect',
    'C++',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Kareem Osama' }],
  creator: 'Kareem Osama',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Kareem Osama — The Digital Atelier',
    description:
      'Engineering ideas into digital reality with architectural precision and creative discipline.',
    url: 'https://kareemosama.dev',
    siteName: 'Kareem Osama Atelier',
    images: [
      {
        url: '/images/kareem-osama.jpg',
        width: 1200,
        height: 1600,
        alt: 'Kareem Osama Portrait',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#090a0d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${spaceGrotesk.variable} ${cairo.variable} ${geist.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#07080a] text-[#f4f2eb] font-sans selection:bg-[#00ff9d] selection:text-[#07080a]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
