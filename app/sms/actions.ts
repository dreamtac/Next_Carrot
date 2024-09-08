'use server';

import { redirect } from 'next/navigation';
import validator from 'validator';
import { z } from 'zod';

const phoneSchema = z
    .string()
    .trim()
    .refine(number => validator.isMobilePhone(number, 'ko-KR'), '잘못된 전화번호입니다.');

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
    token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
    const phone = formData.get('number');
    const token = formData.get('token');
    if (!prevState.token) {
        //token = false일 때 (전화번호 입력 전일 때)
        const result = phoneSchema.safeParse(phone);
        if (!result.success) {
            console.log(result.error.flatten());
            return {
                //잘못된 전화번호를 넣었을 때
                token: false,
                error: result.error.flatten(),
            };
        } else {
            //적절한 전화번호를 넣었을 때
            return {
                token: true,
            };
        }
    } else {
        //token = true일 때 (전화번호를 입력하고, 인증 문자를 받은 상황)
        const result = tokenSchema.safeParse(token);
        if (!result.success) {
            console.log(result.error.flatten());
            //토큰이 일치하지 않을 때
            return {
                token: true,
                error: result.error.flatten(),
            };
        } else {
            //토큰이 정확히 일치할 때
            redirect('/home');
        }
    }
}
