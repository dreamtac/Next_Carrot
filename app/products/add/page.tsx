'use client';

// title       String
// price       Float
// description String
// photo       String

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default async function AddProduct() {
    const [preview, setPreview] = useState('');
    const onImageChange = () => {
        //업로드한 이미지 미리보기
    };
    return (
        <div>
            <form action="" className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
                >
                    <PhotoIcon className="w-20" />
                    <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
                </label>
                <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
                <Input name="title" placeholder="제목" type="text" required />
                <Input name="price" placeholder="가격" type="number" required />
                <Input name="description" placeholder="제품 설명" type="text" required />
                <Button content="작성 완료" />
            </form>
        </div>
    );
}
