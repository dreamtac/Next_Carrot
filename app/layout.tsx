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
    parallel, // parallel을 명시적으로 가져옵니다.
}: {
    children: React.ReactNode;
    parallel: React.ReactNode; // parallel의 타입을 ReactNode로 지정.
}) {
    console.log('Parallel slot:', parallel);
    return (
        <html lang="en" className="bg-neutral-900">
            <body className={`${inter.className} text-white max-w-screen-sm mx-auto`}>
                {parallel}
                {children}
            </body>
        </html>
    );
}
