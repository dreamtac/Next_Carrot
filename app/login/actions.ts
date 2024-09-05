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

const formSchema = z.object({
    email: z.string({ required_error: ERROR_REQUIRED }).email(),
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
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
