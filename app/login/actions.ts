'use server';
import {
    ERROR_PASSWORD_REGEX,
    ERROR_PASSWORD_TOO_BIG,
    ERROR_PASSWORD_TOO_SHORT,
    ERROR_REQUIRED,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
} from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkEmailExits = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });
    if (user) return true;
    return false;
};

const formSchema = z.object({
    email: z.string({ required_error: ERROR_REQUIRED }).email().refine(checkEmailExits, '이메일이 존재하지 않습니다.'),
    password: z
        .string({ required_error: ERROR_REQUIRED })
        .min(PASSWORD_MIN_LENGTH, ERROR_PASSWORD_TOO_SHORT)
        .max(PASSWORD_MAX_LENGTH, ERROR_PASSWORD_TOO_BIG)
        .regex(PASSWORD_REGEX, ERROR_PASSWORD_REGEX),
});

export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    const result = await formSchema.spa(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        //유효성 검사 성공, 로그인 시도
        // 1. 폼 데이터의 이메일과 일치하는 db 이메일 찾기 (코드 상단 checkEmailExists 함수)
        // 2. db에 이메일이 존재한다면, 비밀번호 체크
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                password: true,
                id: true,
            },
        });
        const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
        if (ok) {
            //비밀번호 일치
            const session = await getSession();
            session.id = user!.id;
            redirect('/profile');
        } else {
            //비밀번호 불일치
            return {
                fieldErrors: {
                    email: [],
                    password: ['비밀번호가 일치하지 않습니다.'],
                },
            };
        }
        // 3. 모든게 일치한다면, 로그인
        // 4. redirect ('/profile')
    }
}
