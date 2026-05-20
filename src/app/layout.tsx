import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'PlacementPro — 60-Day SDE Interview Prep',
  description: 'Your gamified 60-day placement preparation platform. Master DSA, core CS subjects, and get placed at your dream company.',
  keywords: ['placement preparation', 'DSA', 'coding interview', 'LeetCode', 'SDE interview'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
