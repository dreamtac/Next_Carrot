'use client';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
    content: string;
}

export default function Button({ content }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            className="custom-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {pending ? '로딩 중...' : content}
        </button>
    );
}
