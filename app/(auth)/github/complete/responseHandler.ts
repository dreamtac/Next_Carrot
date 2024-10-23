import db from '@/lib/db';
import { sessionLogin } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function handleUserLoginOrSignup(userProfileData: any, userEmail: string | undefined) {
    // GitHub에서 받은 사용자 프로필 데이터를 이용하여 로그인 또는 회원가입 처리
    const { id, login, avatar_url } = userProfileData;
    const githubId = id.toString();

    // 데이터베이스에서 GitHub ID로 사용자 검색
    const user = await db.user.findUnique({
        where: { github_id: githubId },
        select: { id: true },
    });

    if (user) {
        // 사용자가 이미 존재하면 로그인 처리
        await sessionLogin(user.id);
        return redirect('/profile');
    } else {
        // 사용자가 존재하지 않으면 새로운 사용자 생성
        const usernameExists = await db.user.findUnique({
            where: { username: login },
            select: { id: true },
        });

        const emailExists = await db.user.findUnique({
            where: { email: userEmail },
            select: { id: true },
        });

        if (emailExists) {
            // 이메일이 이미 존재하면 이메일을 null로 설정
            userEmail = undefined;
        }

        // 새로운 사용자 이름 설정 (중복 여부에 따라 변경)
        const newUsername = usernameExists ? `${login}_{GH}` : login;

        // 새로운 사용자 데이터베이스에 생성
        const newUser = await db.user.create({
            data: {
                github_id: githubId,
                username: newUsername,
                avatar: avatar_url,
                email: userEmail,
            },
            select: { id: true },
        });

        // 새로 생성된 사용자로 로그인 처리
        await sessionLogin(newUser.id);
        return redirect('/profile');
    }
}
