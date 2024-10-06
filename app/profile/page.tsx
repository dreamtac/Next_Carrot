import db from '@/lib/db';
import getSession from '@/lib/session';

export default async function Profile() {
    const loginSession = await getSession();

    const loginUser = await db.user.findUnique({
        where: {
            id: loginSession.id,
        },
    });
    console.log(loginUser);
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
        </div>
    );
}
