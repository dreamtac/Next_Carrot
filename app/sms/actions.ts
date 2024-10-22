'use server';

import db from '@/lib/db';
import { sessionLogin } from '@/lib/session';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import twilio from 'twilio';
import validator from 'validator';
import { z } from 'zod';

const phoneSchema = z
    .string()
    .trim()
    .refine(number => validator.isMobilePhone(number, 'ko-KR'), '잘못된 전화번호입니다.');

async function tokenExists(token: number) {
    const exists = await db.sMSToken.findUnique({
        where: {
            token: token.toString(),
        },
        select: {
            id: true,
        },
    });
    if (exists) {
        return true;
    } else {
        return false;
    }
}

const tokenSchema = z.coerce.number().min(100000).max(999999).refine(tokenExists, '코드가 일치하지 않습니다.');

interface ActionState {
    token: boolean;
}

async function getToken() {
    const token = crypto.randomInt(100000, 999999).toString();
    const exists = await db.sMSToken.findUnique({
        where: {
            token: token,
        },
        select: {
            id: true,
        },
    });
    if (exists) {
        return getToken();
    } else {
        return token;
    }
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
            // 1. 이전 토큰 삭제하기
            await db.sMSToken.deleteMany({
                where: {
                    user: {
                        phone: result.data,
                    },
                },
            });
            // 2. 새 토큰 생성
            const token = await getToken();
            await db.sMSToken.create({
                data: {
                    token: token,
                    user: {
                        connectOrCreate: {
                            where: {
                                phone: result.data,
                            },
                            create: {
                                username: crypto.randomBytes(10).toString('hex'),
                                phone: result.data,
                            },
                        },
                    },
                },
            });
            const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
            await client.messages.create({
                body: `캐럿마켓 인증 번호는 ${token} 입니다.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: process.env.MY_PHONE_NUMBER!,
            });
            // 3. 유저에게 토큰 전송 (sms)
            return {
                token: true,
            };
        }
    } else {
        //token = true일 때 (전화번호를 입력하고, 인증 문자를 받은 상황)
        const result = await tokenSchema.safeParseAsync(token);
        if (!result.success) {
            console.log(result.error.flatten());
            //토큰이 일치하지 않을 때
            return {
                token: true,
                error: result.error.flatten(),
            };
        } else {
            //토큰이 정확히 일치할 때
            // 해당 토큰의 userId 가져오기
            const token = await db.sMSToken.findUnique({
                where: {
                    token: result.data.toString(),
                },
                select: {
                    id: true,
                    userId: true,
                },
            });

            // 유저 로그인
            if (token) {
                await sessionLogin(token.userId);
                //사용한 토큰 지우기
                await db.sMSToken.delete({
                    where: {
                        id: token.id,
                    },
                });
            }
            redirect('/profile');
        }
    }
}
