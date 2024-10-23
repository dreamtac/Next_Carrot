import { NextResponse } from 'next/server';

export function GET() {
    // console.log('GET!!!');
    const baseURL = 'https://github.com/login/oauth/authorize';
    const params = {
        client_id: process.env.GITHUB_CLIENT_ID!,
        scope: 'read:user,user:email',
    };
    const formattedParams = new URLSearchParams(params).toString();
    const finalUrl = `${baseURL}?${formattedParams}`;
    return NextResponse.redirect(finalUrl);
}
