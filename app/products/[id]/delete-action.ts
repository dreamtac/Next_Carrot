'use server';

import db from '@/lib/db';

type Props = {
    productid: number;
};

export default async function deleteProduct({ productid }: Props) {
    const product = await db.product.findUnique({
        where: {
            id: productid,
        },
        select: {
            userId: true,
        },
    });

    if (!product) {
        //제품이 db에 존재하지 않을 때
        return false;
    }

    await db.product.delete({
        where: {
            id: productid,
        },
    });

    return true;
}
