'use client';

import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';
import SocialLogin from '@/components/social-login';

export default function LogIn() {
    const onClick = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: 'dreamtac',
                password: '1541',
            }),
        });
        console.log(await response.json());
    };
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">아래 입력칸에 이메일과 비밀번호를 입력해주세요.</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput required type="email" placeholder="이메일" errors={['이메일을 정확히 입력해주세요.']} />
                <FormInput required type="password" placeholder="비밀번호" errors={[]} />
            </form>
            <span onClick={onClick}>
                <FormBtn content="로그인" loading={false} />
            </span>
            <SocialLogin />
        </div>
    );
}
