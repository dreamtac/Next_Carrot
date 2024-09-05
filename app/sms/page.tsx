'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

export default function SMSLogin() {
    const [state, action] = useFormState(smsLogin, null);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS 로그인</h1>
                <h2 className="text-xl">인증번호를 받으실 번호를 입력해주세요.</h2>
            </div>
            <form className="flex flex-col gap-3" action={action}>
                <Input name="number" required type="number" placeholder="전화번호" />
                <Input name="token" required type="number" placeholder="인증번호" />
                <Button content="인증번호 받기" />
            </form>
        </div>
    );
}
