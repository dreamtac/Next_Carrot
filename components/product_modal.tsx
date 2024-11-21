'use client';

import { formatToWon } from '@/lib/utils';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
    product:
        | ({
              user: {
                  username: string;
                  avatar: string | null;
              };
          } & {
              id: number;
              title: string;
              price: number;
              description: string;
              photo: string;
              created_at: Date;
              updated_at: Date;
              userId: number;
          })
        | null;
};

export default function ProductModal({ product }: Props) {
    const router = useRouter();
    const onCloseClick = () => {
        router.back();
    };
    const onModalClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };
    return (
        <div
            className="absolute flex justify-center items-center w-full h-full bg-black left-0 top-0 z-50 bg-opacity-60"
            onClick={onCloseClick}
        >
            <div
                className="relative max-w-screen-sm h-1/2 flex flex-col justify-center w-full bg-gray-600 p-2"
                onClick={onModalClick}
            >
                <button
                    onClick={onCloseClick}
                    className="absolute top-2 right-2 text-neutral-300  hover:text-white rounded-full z-50 p-2"
                >
                    <XMarkIcon className="size-12" />
                </button>
                <div className="relative aspect-square text-neutral-200 bg-neutral-700 rounded-md flex justify-center items-center overflow-hidden">
                    {product ? (
                        <Image
                            src={`${product.photo}/public`}
                            alt={product.id.toString()}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <PhotoIcon className="h-28"></PhotoIcon>
                    )}
                </div>
                <div className="flex items-center p-3 gap-4">
                    <div className="relative size-11 overflow-hidden rounded-full">
                        <Image src={`${product?.user.avatar}`} alt={`${product?.user.avatar}/avatar`} fill></Image>
                    </div>
                    <span>{product?.user.username}</span>
                </div>
                <div className="border-b border-neutral-500" />
                <div className="p-4">
                    <h1 className="text-2xl font-semibold">{product ? product.title : `정보를 가져올 수 없습니다.`}</h1>
                    <span>{product ? product.description : '정보를 가져올 수 없습니다.'}</span>
                </div>
                {product ? (
                    <div className="flex p-5">
                        <h1 className="text-xl font-semibold text-red-500">{formatToWon(product.price)}</h1>
                        <span className="text-xl font-semibold px-1">원</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
