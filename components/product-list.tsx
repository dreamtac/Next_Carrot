import { formatToTimeAgo, formatToWon } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
    id: number;
    title: string;
    photo: string;
    price: number;
    created_at: Date;
}
export default function ProductList({ id, title, photo, price, created_at }: ProductProps) {
    return (
        <div className="border-b border-neutral-700 pb-5">
            <Link href={`/products/${id}`} className="flex items-center gap-5">
                <div className="relative size-28 rounded-lg overflow-hidden">
                    <Image fill src={photo} alt={title} className="object-cover"></Image>
                </div>
                <div className="flex flex-col gap-1  text-white">
                    <span className="text-lg">{title}</span>
                    <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
                    <span className="text-lg font-semibold">₩ {formatToWon(price)}</span>
                </div>
            </Link>
        </div>
    );
}
