interface FormBtnProps {
    content: string;
    loading: boolean;
}

export default function FormBtn({ content, loading }: FormBtnProps) {
    return (
        <button
            disabled={loading}
            className="custom-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {loading ? 'Loading...' : content}
        </button>
    );
}
