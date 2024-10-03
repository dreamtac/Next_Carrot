import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContents {
    id?: number;
}

export default async function getSession() {
    return await getIronSession<SessionContents>(cookies(), {
        //Iron Session이 쿠키를 가져옴, 만약 쿠키가 존재하지 않는다면 생성.
        cookieName: 'Carrot-Cookie', //쿠키의 이름은 Carrot-Cookie
        password: process.env.COOKIE_PASSWORD!, //쿠키 암호화에 사용할 비밀번호. (해싱은 단방향이므로 사용못함 쿠키는 다시 해석해야 하므로 양방향 암호화가 필요)
    });
}
