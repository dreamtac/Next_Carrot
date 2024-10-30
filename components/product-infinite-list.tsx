'use client';

import { getMoreProducts } from '@/app/(tabs)/products/actions';
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
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const onLoadMoreProducts = async () => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(page + 1);
        if (newProducts.length !== 0) {
            setPage(prev => prev + 1);
            setProducts(prev => [...prev, ...newProducts]);
        } else {
            setIsLastPage(true);
        }

        setIsLoading(false);
    };
    return (
        <div className="flex flex-col p-5 gap-5">
            {products.map(product => {
                return <ProductList key={product.id} {...product} />;
            })}
            <button
                className={
                    isLastPage
                        ? 'text-sm font-semibold w-fit mx-auto  px-3 py-1.5 text-gray-400'
                        : isLoading
                        ? 'text-sm font-semibold w-fit mx-auto rounded-lg bg-gray-500 px-3 py-1.5 text-gray-400'
                        : 'text-sm font-semibold w-fit mx-auto rounded-lg bg-orange-500 px-3 py-1.5 hover:opacity-90 active:scale-95'
                }
                disabled={isLastPage ? true : isLoading}
                onClick={onLoadMoreProducts}
            >
                {isLastPage ? '모든 상품을 불러왔습니다.' : isLoading ? '가져오는 중' : '더 가져오기'}
            </button>
        </div>
    );
}
