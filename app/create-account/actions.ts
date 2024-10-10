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

// const usernameSchema = z.string().min(5).max(15);

// const checkUniqueUsername = async (username: string) => {
//     const user = await db.user.findUnique({
//         where: {
//             username: username,
//         },
//         select: {
//             id: true,
//         },
//     });
//     // if (!user) {
//     //     console.log('유저네임 중복 없음.');
//     //     return true;
//     // } else {
//     //     console.log('유저네임 중복됨!');
//     //     return false;
//     // }
//     return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//     const userEmail = await db.user.findUnique({
//         where: {
//             email: email,
//         },
//         select: {
//             id: true,
//         },
//     });
//     return !Boolean(userEmail);
// };

const checkUsername = (username: string) => {
    return !username.includes('fxxk');
};

const checkUsernameSpecialChar = (username: string) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
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
            .refine(checkUsernameSpecialChar, '특수문자는 사용할 수 없습니다.'),
        // .refine(checkUniqueUsername, '이미 해당 username이 존재합니다.'),
        email: z.string({ required_error: ERROR_REQUIRED }).email('이메일 양식을 입력해주세요.'),
        // .refine(checkUniqueEmail, '해당 이메일이 이미 존재합니다.'),
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
    .superRefine(async (data, ctx) => {
        //data 는 위의 object를 가르키고, ctx는 에러 보관함이라 생각하자.
        const user = await db.user.findUnique({
            where: {
                username: data.username,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: 'custom', //커스텀 에러
                message: '이미 존재하는 id 입니다.', //에러 발생시 띄울 에러 메시지
                path: ['username'], //어떤 부분에서 일어나는 에러인지 설정.
                fatal: true, //fatal: true 로 설정하면 이후 refine을 실행하지 않고 여기서 정지.
            });
            return z.NEVER;
        }
    })
    .superRefine(async (data, ctx) => {
        //data 는 위의 object를 가르키고, ctx는 에러 보관함이라 생각하자.
        const user = await db.user.findUnique({
            where: {
                email: data.email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: 'custom', //커스텀 에러
                message: '이미 존재하는 이메일 입니다.', //에러 발생시 띄울 에러 메시지
                path: ['email'], //어떤 부분에서 일어나는 에러인지 설정.
                fatal: true, //fatal: true 로 설정하면 이후 refine을 실행하지 않고 여기서 정지.
            });
            return z.NEVER;
        }
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
        // username 중복체크 (상단 checkUniqueUsername 함수와 zod의 refine을 결합, superRefine으로 변경)
        // email 중복체크 (상단 checkUniqueEmail 함수와 zod의 refine을 결합, superRefine으로 변경)

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        // console.log(hashedPassword);

        // 유저 정보 db저장(가입)
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
            },
        });
        // console.log(user);

        // 유저 로그인 (해당 유저의 브라우저에 쿠키를 보냄)
        const session = await getSession();
        session.id = user.id; //쿠키에 담을 정보 (이 데이터가 암호화됨.)
        await session.save(); //쿠키 저장

        // 홈(/home) 리다이렉트
        redirect('/profile');
    }
}
