'use server';

import { z } from 'zod';

const usernameSchema = z.string().min(5).max(15);

export async function createAcoount(prevState: any, formData: FormData) {
    console.log(prevState);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    };

    usernameSchema.parse(data.username);

    console.log(data);
    return true;
}
