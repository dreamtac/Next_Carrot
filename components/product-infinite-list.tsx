'use client';

import { getMoreProducts } from '@/app/products/[id]/actions';
import { useState } from 'react';
import ProductList from './product-list';

type Props = {
    initialProducts: {
        id: number;
        title: string;
        price: number;
        photo: string;
        created_at: Date;
    }[];
};

export default function InfinityProductList({ initialProducts }: Props) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const onLoadMoreProducts = async () => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(1);
        setProducts(prev => [...prev, ...newProducts]);
        setIsLoading(false);
    };
    return (
        <div className="flex flex-col p-5 gap-5">
            {products.map(product => {
                return <ProductList key={product.id} {...product} />;
            })}
            <button
                className={
                    isLoading
                        ? 'text-sm font-semibold w-fit mx-auto rounded-lg bg-gray-500 px-3 py-1.5 text-gray-400'
                        : 'text-sm font-semibold w-fit mx-auto rounded-lg bg-orange-500 px-3 py-1.5 hover:opacity-90 active:scale-95'
                }
                disabled={isLoading}
                onClick={onLoadMoreProducts}
            >
                {isLoading ? '가져오는 중' : '더 가져오기'}
            </button>
        </div>
    );
}
