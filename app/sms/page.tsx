import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';

export default function SMSLogin() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS 로그인</h1>
                <h2 className="text-xl">인증번호를 받으실 번호를 입력해주세요.</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput required type="number" placeholder="전화번호" errors={['숫자만 입력해주세요.']} />
                <FormInput
                    required
                    type="number"
                    placeholder="인증번호"
                    errors={['문자로 받으신 인증번호를 정확히 입력해주세요.']}
                />
                <FormBtn content="인증번호 받기" loading={false} />
            </form>
        </div>
    );
}
