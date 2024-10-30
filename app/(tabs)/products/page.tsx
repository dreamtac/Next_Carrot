import InfinityProductList from '@/components/product-infinite-list';
import db from '@/lib/db';

async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            photo: true,
            id: true,
            created_at: true,
            price: true,
        },
        take: 1,
        orderBy: {
            created_at: 'desc',
        },
    });
    return products;
}

export default async function Products() {
    const initialProducts = await getInitialProducts();
    return (
        <div className="flex flex-col p-5 gap-5">
            <InfinityProductList initialProducts={initialProducts} />
        </div>
    );
}
