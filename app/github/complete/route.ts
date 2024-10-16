import db from '@/lib/db';
import { getSession, sessionLogin } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code'); // github에서 보낸 code

    if (!code) {
        //code가 없을 떄
        return new NextResponse(null, { status: 400 });
    }

    //받은 code로 다시 POST 요청을 보내고, 엑세스 토큰 (access_token)을 받아옴.
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code: code,
    }).toString();

    const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

    const { error, access_token } = await (
        await fetch(accessTokenURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        })
    ).json();

    if (error) {
        return new NextResponse(null, { status: 400 });
    }

    //받은 access_token으로 유저 정보 가져옴
    const userProfileResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-cache',
    });
    const userProfileData = await userProfileResponse.json();
    const { id, login, avatar_url } = userProfileData; //github로 부터 받은 id, login(username), avatar_url

    const user = await db.user.findUnique({
        where: {
            github_id: id.toString(),
        },
        select: {
            id: true,
        },
    });
    if (user) {
        //해당 깃허브 아이디가 이미 존재함 (회원가입 되어 있음)
        const session = await getSession();
        session.id = user.id;
        await session.save();
        return redirect('/profile');
    } else {
        //해당 깃허브 아이디가 없음 (회원가입 필요 (DB정보 입력))
        const newUser = await db.user.create({
            data: {
                github_id: id.toString(),
                username: `${login}_GH`,
                avatar: avatar_url,
            },
            select: {
                id: true,
            },
        });
        await sessionLogin(newUser.id);
        // const session = await getSession();
        // session.id = newUser.id;
        // await session.save();
        return redirect('/profile');
    }
}
