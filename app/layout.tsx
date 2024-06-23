import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '~components/layout/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store inventory management App',
  description: `Manage your store inventory efficiently with our store inventory management app.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Store inventory management App</title>
        <meta
          name="description"
          content="Manage your store inventory efficiently with our store inventory management app."
        />
      </head>
      <body className={`bg-gray-100 font-sans ${inter.className}`}>
        <Header />
        <main className="container mx-auto max-w-screen-xl px-4">{children}</main>
      </body>
    </html>
  );
}
