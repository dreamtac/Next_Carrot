import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { notFound } from 'next/navigation';

async function getIsOwner(userId: number) {
    // 현재 로그인된 유저가 업로드한 제품의 소유자인지 체크하는 함수
    const session = await getSession();
    if (session.id === userId) {
        console.log('오너임');
        return true;
    }
    console.log('오너 아님');
    return false;
}

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id: id,
        },
        include: {
            // 관계를 가지고 있는 테이블(user)에서 username과 avatar를 가져옴.
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    console.log(product);
    return product;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id); //id는 숫자
    if (isNaN(id)) {
        //id에 숫자가 아닌 문자가 들어오면 NaN
        return notFound();
    }
    const product = await getProduct(id); //db에서 가져온 product
    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId); // product의 userId로 해당 제품의 오너인지 체크
    return <span>Product Detail! id:{id}</span>;
}
