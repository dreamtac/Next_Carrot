import { PhotoIcon } from '@heroicons/react/20/solid';

export default function Loading() {
    return (
        <div className="animate-pulse p-5 flex flex-col gap-5">
            <div className="aspect-square text-neutral-600 border-neutral-700 border-dashed border-4 rounded-md flex justify-center items-center">
                <PhotoIcon className="h-28"></PhotoIcon>
            </div>
            <div className="flex gap-2 items-center">
                <div className="size-14 rounded-full bg-neutral-600" />
                <div className="flex flex-col gap-2">
                    <div className="h-5 w-40 bg-neutral-600 rounded-md" />
                    <div className="h-5 w-20 bg-neutral-600 rounded-md" />
                </div>
            </div>
            <div className="h-5 w-80 bg-neutral-600 rounded-md" />
        </div>
    );
}
