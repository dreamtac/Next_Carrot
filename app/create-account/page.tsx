import FormBtn from '@/components/form_btn';
import FormInput from '@/components/form_input';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function create_account() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">아래 입력칸에 이름을 입력해주세요!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput required type="text" placeholder="이름" errors={['이름을 정확히 입력해주세요.']} />
                <FormInput required type="email" placeholder="이메일" errors={['이메일을 정확히 입력해주세요.']} />
                <FormInput required type="password" placeholder="비밀번호" errors={[]} />
                <FormInput required type="password" placeholder="비밀번호 확인" errors={[]} />
                <FormBtn content="회원가입" loading={true} />
            </form>
            <div className="w-full h-px bg-neutral-500" />
            <div>
                <Link href="/sms" className="custom-btn flex h-10 items-center justify-center gap-3">
                    <span>
                        <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                    </span>
                    <span>휴대폰으로 가입하기</span>
                </Link>
            </div>
        </div>
    );
}
