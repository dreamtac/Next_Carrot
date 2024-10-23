import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getUserEmails, getUserProfile } from './requestHandler';
import { handleUserLoginOrSignup } from './responseHandler';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code'); // github에서 보낸 code

    if (!code) {
        //code가 없을 떄
        return new NextResponse(null, { status: 400 });
    }

    const { error, access_token } = await getAccessToken(code);

    if (error) {
        return new NextResponse(null, { status: 400 });
    }

    //받은 access_token으로 유저 정보 가져옴
    let userEmail: string | null = await getUserEmails(access_token!); //github로 부터 받은 email
    const userProfileData = await getUserProfile(access_token!); //github로 부터 받은 id, login(username), avatar_url

    await handleUserLoginOrSignup(userProfileData, userEmail); //로그인 or 회원가입
}
