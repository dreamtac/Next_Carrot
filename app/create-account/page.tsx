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
                <div className="flex flex-col gap-2">
                    <input
                        className="bg-transparent rounded-md w-full h-10 focus:outline-none 
                        ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-gray-400 peer"
                        type="text"
                        placeholder="이름"
                        required
                    />
                    <span className="text-red-500 font-medium hidden peer-invalid:block">
                        이름을 다시 입력해주세요.
                    </span>
                </div>
                <button className="custom-btn h-10">회원가입</button>
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
