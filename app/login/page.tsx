import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';
import SocialLogin from '@/components/social-login';

export default function LogIn() {
    const onSubmit = async (data: FormData) => {
        'use server'; //이 함수는 서버에서만 실행됨.
        console.log('서버에서 onSubmit 함수 실행중...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('이메일: ', data.get('inputEmail'));
        console.log('비밀번호: ', data.get('inputPassword'));
    };
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">아래 입력칸에 이메일과 비밀번호를 입력해주세요.</h2>
            </div>
            <form action={onSubmit} className="flex flex-col gap-3">
                <FormInput
                    name="inputEmail"
                    required
                    type="email"
                    placeholder="이메일"
                    errors={['이메일을 정확히 입력해주세요.']}
                />
                <FormInput name="inputPassword" required type="password" placeholder="비밀번호" errors={[]} />
                <FormBtn content="로그인" />
            </form>
            <SocialLogin />
        </div>
    );
}
