'use client';
import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';
import SocialLogin from '@/components/social-login';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { handleForm } from './action';

export default function LogIn() {
    const [state, action] = useFormState(handleForm, null);
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
                <FormInput name="inputEmail" required type="email" placeholder="이메일" />
                <FormInput name="inputPassword" required type="password" placeholder="비밀번호" />
                <FormBtn content="로그인" />
            </form>
            <SocialLogin />
        </div>
    );
}
