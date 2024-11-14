'use client';

import {
    ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
    HomeIcon as OutlineHomeIcon,
    VideoCameraIcon as OutlineLiveIcon,
    NewspaperIcon as OutlineNewsPaperIcon,
    UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import {
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
    HomeIcon as SolidHomeIcon,
    VideoCameraIcon as SolidLiveIcon,
    NewspaperIcon as SolidNewsPaperIcon,
    UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm bg-neutral-800 grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
            <Link href="/home" className="flex flex-col items-center gap-px">
                {pathname === '/home' ? <SolidHomeIcon className="w-7 h-7" /> : <OutlineHomeIcon className="w-7 h-7" />}
                <span>홈</span>
            </Link>
            <Link href="/life" className="flex flex-col items-center gap-px">
                {pathname === '/life' ? (
                    <SolidNewsPaperIcon className="w-7 h-7" />
                ) : (
                    <OutlineNewsPaperIcon className="w-7 h-7" />
                )}
                <span>동네생활</span>
            </Link>
            <Link href="/chats" className="flex flex-col items-center gap-px">
                {pathname === '/chats' ? (
                    <SolidChatIcon className="w-7 h-7" />
                ) : (
                    <OutlineChatIcon className="w-7 h-7" />
                )}
                <span>채팅</span>
            </Link>
            <Link href="/live" className="flex flex-col items-center gap-px">
                {pathname === '/live' ? <SolidLiveIcon className="w-7 h-7" /> : <OutlineLiveIcon className="w-7 h-7" />}
                <span>쇼핑</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-px">
                {pathname === '/profile' ? (
                    <SolidUserIcon className="w-7 h-7" />
                ) : (
                    <OutlineUserIcon className="w-7 h-7" />
                )}
                <span>나의 당근</span>
            </Link>
        </div>
    );
}
