import InfinityProductList from '@/components/product-infinite-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/20/solid';
import { unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';

const getCachedProducts = nextCache(getInitialProducts, ['home-products'], {
    revalidate: 60,
});

async function getInitialProducts() {
    console.log('DB_Products Hit!!');
    const products = await db.product.findMany({
        select: {
            title: true,
            photo: true,
            id: true,
            created_at: true,
            price: true,
        },
        // take: 1,
        orderBy: {
            created_at: 'desc',
        },
    });
    return products;
}

export const metadata = {
    title: 'Home',
};

export default async function Products() {
    const initialProducts = await getCachedProducts();
    return (
        <div className="flex flex-col p-5 gap-5">
            <InfinityProductList initialProducts={initialProducts} />
            <Link
                href={'products/add'}
                className="flex items-center justify-center size-16 rounded-full fixed bg-orange-500 
                bottom-24 right-8 *:text-white transition-colors hover:bg-orange-400"
            >
                <PlusIcon className="size-10"></PlusIcon>
            </Link>
        </div>
    );
}
