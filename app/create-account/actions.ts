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
import { z } from 'zod';

// const usernameSchema = z.string().min(5).max(15);

const checkUniqueUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
        },
    });
    // if (!user) {
    //     console.log('유저네임 중복 없음.');
    //     return true;
    // } else {
    //     console.log('유저네임 중복됨!');
    //     return false;
    // }
    return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
    const userEmail = await db.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });
    return !Boolean(userEmail);
};

const checkUsername = (username: string) => {
    return !username.includes('fxxk');
};

const checkPassword = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
    password === confirm_password;

const formSchema = z
    .object({
        username: z
            .string({
                required_error: ERROR_REQUIRED,
                invalid_type_error: '유저네임은 문자만 입력할 수 있습니다.',
            })
            .min(2, '유저 네임은 최소 2자 이상입니다.')
            .max(15, '유저 네임은 최대 15자를 초과할 수 없습니다.')
            .trim()
            .toLowerCase()
            .refine(checkUsername, '부적절한 문자가 포함되어 있습니다.')
            .refine(checkUniqueUsername, '이미 해당 username이 존재합니다.'),
        email: z
            .string({ required_error: ERROR_REQUIRED })
            .email('이메일 양식을 입력해주세요.')
            .refine(checkUniqueEmail, '해당 이메일이 이미 존재합니다.'),
        password: z
            .string({ required_error: ERROR_REQUIRED })
            .min(PASSWORD_MIN_LENGTH, ERROR_PASSWORD_TOO_SHORT)
            .max(PASSWORD_MAX_LENGTH, ERROR_PASSWORD_TOO_BIG)
            .regex(PASSWORD_REGEX, ERROR_PASSWORD_REGEX),
        confirm_password: z
            .string({ required_error: ERROR_REQUIRED })
            .min(PASSWORD_MIN_LENGTH)
            .max(PASSWORD_MAX_LENGTH),
    })
    .refine(checkPassword, { message: '비밀번호가 일치하지 않습니다.', path: ['confirm_password'] });

export async function createAcoount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    };

    const result = await formSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        // username 중복체크
        // email 중복체크
        // 비밀번호 해싱
        // 유저 정보 db저장(가입)
        // 유저 로그인
        // 홈(/home) 리다이렉트
    }
}
