'use client';

import { getMoreProducts } from '@/app/(tabs)/products/actions';
import { useEffect, useRef, useState } from 'react';
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
    const scrollTrigger = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        //trigger (더 가져오기 span을 유저가 보게 됨)가 발동되면 interception observer는 trigger 감시를 중단함.
        //onLoadMoreProducts 함수가 실행되어 더 많은 제품을 db에서 가져옴
        //onLoadMoreProducts 함수에서 page가 증가하게 되므로 useEffect 실행됨
        //useEffect에서 다시 interception observer가 trigger를 감시하도록 지시.
        const observer = new IntersectionObserver(
            async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                const element = entries[0];
                if (element.isIntersecting && scrollTrigger.current) {
                    observer.unobserve(scrollTrigger.current);
                    setIsLoading(true);
                    const newProducts = await getMoreProducts(page + 1);
                    if (newProducts.length !== 0) {
                        // 아직 표시할 제품이 남아 있을 경우 (db에 유저가 확인하지 못한 제품 데이터 존재)
                        setPage(prev => prev + 1);
                        setProducts(prev => [...prev, ...newProducts]);
                    } else {
                        //더 이상 표시할 제품이 없을 경우 (db 데이터 다 불러옴)
                        setIsLastPage(true);
                    }
                    setIsLoading(false);
                }
                console.log(entries[0].isIntersecting);
            },
            {
                threshold: 1.0,
                rootMargin: '0px 0px -100px 0px',
            }
        );
        if (scrollTrigger.current) {
            observer.observe(scrollTrigger.current);
        }
        return () => {
            //clean up function
            //유저가 해당 페이지를 떠날 때 즉, trigger가 제거될 떄 (trigger가 Unmount 될 때) 실행되는 함수.
            observer.disconnect();
        };
    }, [page]); //page가 변경되면 함수가 실행됨.

    // const onLoadMoreProducts = async () => {
    //     // db에서 products 더 불러오는 함수
    //     setIsLoading(true);
    //     const newProducts = await getMoreProducts(page + 1);
    //     if (newProducts.length !== 0) {
    //         // 아직 표시할 제품이 남아 있을 경우 (db에 유저가 확인하지 못한 제품 데이터 존재)
    //         setPage(prev => prev + 1);
    //         setProducts(prev => [...prev, ...newProducts]);
    //     } else {
    //         //더 이상 표시할 제품이 없을 경우 (db 데이터 다 불러옴)
    //         setIsLastPage(true);
    //     }

    //     setIsLoading(false);
    // };
    return (
        <div className="flex flex-col p-5 gap-5">
            {products.map(product => {
                return <ProductList key={product.id} {...product} />;
            })}
            <span
                ref={scrollTrigger}
                style={{
                    marginTop: `${page + 1 * 900}vh`,
                }}
                className={
                    'text-sm font-semibold w-fit mx-auto rounded-lg bg-orange-500 px-3 py-1.5 hover:opacity-90 active:scale-95 mb-96'
                }
            >
                {isLastPage ? '모든 제품을 가져왔습니다.' : isLoading ? '가져오는 중' : '더 가져오기'}
            </span>
        </div>
    );
}
