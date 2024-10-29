'use client';

import { useRouter } from 'next/navigation';
import deleteProduct from './delete-action';

type Props = {
    productid: number;
};

export default function DeleteBtn({ productid }: Props) {
    const router = useRouter();
    const onClickEvent = async () => {
        const result = await deleteProduct({ productid: productid });
        if (!result) {
            alert('삭제할 제품이 존재하지 않습니다.');
        } else {
            alert('삭제되었습니다.');
            router.replace('/products');
        }
    };
    return (
        <button onClick={onClickEvent} className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            상품삭제
        </button>
    );
}
