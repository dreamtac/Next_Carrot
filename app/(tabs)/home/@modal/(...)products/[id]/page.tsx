// 'use client';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { getProduct } from './actions';

export default async function ProductsModal({ params }: { params: { id: string } }) {
    const product = await getProduct(Number(params.id));
    const onCloseClick = () => {};
    return (
        <div className="absolute flex justify-center items-center w-full h-full bg-black left-0 top-0 z-50 bg-opacity-60">
            <button onClick={onCloseClick} className="absolute top-10 right-10 text-nuetral-200">
                <XMarkIcon className="size-10" />
            </button>
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="aspect-square text-neutral-200 bg-neutral-700 rounded-md flex justify-center items-center">
                    <PhotoIcon className="h-28"></PhotoIcon>
                </div>
            </div>
        </div>
    );
}
