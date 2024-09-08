'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

const initialState = {
    token: false,
    error: undefined,
};

export default function SMSLogin() {
    const [state, action] = useFormState(smsLogin, { token: false });
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS 로그인</h1>
                <h2 className="text-xl">인증번호를 받으실 번호를 입력해주세요.</h2>
            </div>
            <form className="flex flex-col gap-3" action={action}>
                {state.token ? null : (
                    <Input name="number" required type="text" placeholder="전화번호" errors={state.error?.formErrors} />
                )}
                {state.token ? <Input name="token" required type="number" placeholder="인증번호" /> : null}
                <Button content={state.token ? '인증하기' : '인증번호 요청'} />
            </form>
        </div>
    );
}
