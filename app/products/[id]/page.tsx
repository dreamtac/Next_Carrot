import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { formatToWon } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import DeleteBtn from './delete_btn';

async function getIsOwner(userId: number) {
    // 현재 로그인된 유저가 업로드한 제품의 소유자인지 체크하는 함수
    const session = await getSession();
    if (session.id === userId) {
        return true;
    }
    return false;
}

async function getProduct(id: number) {
    // URL파라미터로 받은 id를 가지고 db에서 해당 id와 일치하는 제품을 찾는 함수
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

    async function deleteProduct(id: number) {
        'use server';
        await db.product.delete({
            where: {
                id: id,
            },
        });
        redirect('/product');
    }

    return (
        <div>
            <div className="relative aspect-square">
                <Image fill src={`${product.photo}/public`} alt={product.title} className="object-cover" />
            </div>
            <div className="flex p-5 items-center gap-3 border-b border-neutral-600">
                <div className="relative size-10 rounded-full overflow-hidden">
                    {product.user.avatar !== null ? (
                        <Image src={product.user.avatar} alt={product.user.username} fill unoptimized />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 bg-neutral-800 flex justify-between items-center">
                <span className="font-semibold text-lg">{formatToWon(product.price)} 원</span>
                {isOwner ? (
                    <DeleteBtn productid={product.id} />
                ) : (
                    <Link href={''} className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
                        채팅하기
                    </Link>
                )}
            </div>
        </div>
    );
}
