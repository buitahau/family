import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Johnson Family',
  description: 'Welcome to our family story. Get to know each member through their personal journeys, memories, and moments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}