'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from './actions';

export default function LogIn() {
    const [state, action] = useFormState(login, null);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <div className="flex flex-row gap-3 items-center">
                    <div className="btn btn-ghost">
                        <Link className="text-white text-lg" href={'/'}>{`<`}</Link>
                    </div>
                    <h1 className="text-2xl">안녕하세요!</h1>
                </div>
                <h2 className="text-xl">아래 입력칸에 이메일과 비밀번호를 입력해주세요.</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <Input name="email" required type="email" placeholder="이메일" errors={state?.fieldErrors.email} />
                <Input
                    name="password"
                    required
                    type="password"
                    placeholder="비밀번호"
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    errors={state?.fieldErrors.password}
                />
                <Button content="로그인" />
            </form>
            <SocialLogin />
        </div>
    );
}
