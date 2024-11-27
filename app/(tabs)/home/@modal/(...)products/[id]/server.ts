'use server';

import db from '@/lib/db';

export async function getProduct(id: number) {
    console.log('DB hit - product all');
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });

    if (!product) {
        return null;
    }
    return product;
}
