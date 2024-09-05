'use server';

import { ERROR_REQUIRED } from '@/lib/constants';
import { z } from 'zod';

const formSchema = z.object({
    number: z.number({ invalid_type_error: '숫자만 입력해주세요.', required_error: ERROR_REQUIRED }),
    token: z.number({ required_error: ERROR_REQUIRED }),
});

export async function smsLogin(prevState: any, formData: FormData) {
    const data = {
        number: formData.get('number'),
        token: formData.get('token'),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
        console.log(result.error.flatten());
    }
}
