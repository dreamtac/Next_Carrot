import ProductList from '@/components/product-list';
import db from '@/lib/db';

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            photo: true,
            id: true,
            created_at: true,
            price: true,
        },
    });
    return products;
}

export default async function Products() {
    const products = await getProducts();
    return (
        <div>
            <h1 className="text-white text-4xl">Products!</h1>
            <div className="flex flex-col p-5 gap-5">
                {products.map(product => {
                    return <ProductList key={product.id} {...product} />;
                })}
            </div>
        </div>
    );
}
