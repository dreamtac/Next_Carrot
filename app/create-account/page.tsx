'use client';
import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { createAcoount } from './actions';

export default function CreateAccount() {
    const [state, action] = useFormState(createAcoount, null);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">아래 입력칸에 이름을 입력해주세요!</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <FormInput name="username" required type="text" placeholder="이름" />
                <FormInput name="email" required type="email" placeholder="이메일" />
                <FormInput name="password" required type="password" placeholder="비밀번호" />
                <FormInput name="confirm_password" required type="password" placeholder="비밀번호 확인" />
                <FormBtn content="회원가입" />
            </form>
            <SocialLogin />
        </div>
    );
}
