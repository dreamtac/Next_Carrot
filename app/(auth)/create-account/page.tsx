'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/lib/constants';
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
                <Input
                    name="username"
                    required
                    type="text"
                    placeholder="ID"
                    minLength={2}
                    maxLength={15}
                    errors={state?.fieldErrors.username}
                />
                <Input name="email" required type="email" placeholder="이메일" errors={state?.fieldErrors.email} />
                <Input
                    name="password"
                    required
                    type="password"
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="비밀번호"
                    errors={state?.fieldErrors.password}
                />
                <Input
                    name="confirm_password"
                    required
                    type="password"
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="비밀번호 확인"
                    errors={state?.fieldErrors.confirm_password}
                />
                <Button content="회원가입" />
            </form>
            <SocialLogin />
        </div>
    );
}
