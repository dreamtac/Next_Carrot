import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

const getUser = async () => {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if (user) return user;
        else notFound();
    } else {
        notFound();
    }
};

export default async function Profile() {
    const loginUser = await getUser();
    // const loginSession = await getSession();
    // const loginUser = await db.user.findUnique({
    //     where: {
    //         id: loginSession.id,
    //     },
    // });
    console.log(loginUser);

    const logout = async () => {
        'use server';
        const session = await getSession();
        session.destroy();
        redirect('/');
    };

    return (
        <div className="flex flex-col gap-4 p-5">
            <span className="text-3xl font-thin">
                안녕하세요,
                <span className="text-2lg font-bold"> {loginUser!.username}</span>
            </span>
            <span>id: {loginUser!.username}</span>
            <span>이메일: {loginUser!.email}</span>
            {loginUser!.phone ? <span>전화번호: {loginUser!.phone}</span> : <span>전화번호: 없음</span>}
            {/* <span>계정 생성일: {}</span> */}
            <form action={logout}>
                <button className="bg-red-300 text-center rounded-sm max-w-fit px-2 cursor-pointer">로그아웃</button>
            </form>
        </div>
    );
}
