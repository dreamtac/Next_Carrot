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
import { z } from 'zod';

// const usernameSchema = z.string().min(5).max(15);

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
            .refine(checkUsername, '부적절한 문자가 포함되어 있습니다.'),
        email: z.string({ required_error: ERROR_REQUIRED }).email('이메일 양식을 입력해주세요.'),
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

    const result = formSchema.safeParse(data);
    // console.log(result.error?.flatten());

    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
