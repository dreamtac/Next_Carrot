import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';

interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
    '/': true,
    '/login': true,
    '/sms': true,
    '/create-account': true,
    '/github/start': true,
    '/github/complete': true,
};

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const pathname = request.nextUrl.pathname;
    const exists = publicOnlyUrls[pathname];
    if (!session.id) {
        //로그인이 되어있지 않은 상태.
        if (!exists) {
            console.log(`${pathname}은 로그인이 필요한 페이지입니다.`);
            return NextResponse.redirect(`${request.nextUrl.origin}/login`);
        }
    } else {
        //로그인이 되어있는 상태.
        if (exists) {
            return NextResponse.redirect(`${request.nextUrl.origin}/products`);
        }
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
