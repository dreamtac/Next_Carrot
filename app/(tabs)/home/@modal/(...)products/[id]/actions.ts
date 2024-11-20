'use server';

import db from '@/lib/db';

export async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id,
        },
    });

    if (!product) {
        return null;
    }
    return product;
}
