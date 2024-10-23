import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Carrot Market',
        default: 'Carrot Market',
    },
    description: 'Sell and buy all the things',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-neutral-900">
            <body className={`${inter.className} text-white max-w-screen-sm mx-auto`}>{children}</body>
        </html>
    );
}
