'use client';

// title       String
// price       Float
// description String
// photo       String

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { uploadProduct } from './actions';

export default function AddProduct() {
    const [state, action] = useFormState(uploadProduct, null);
    const [preview, setPreview] = useState('');
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //업로드한 이미지 미리보기
        const {
            target: { files },
        } = event;
        if (!files) {
            return;
        }
        const file = files[0];
        if (!file.type.startsWith('image/')) {
            //이미지 파일만 업로드 가능
            alert('이미지 파일만 업로드 할 수 있습니다.');
            return;
        }
        if (file.size > 10 * 1024 * 512) {
            //이미지는 5MB를 넘을 수 없음
            alert('이미지 용량은 5MB를 넘을 수 없습니다.');
            return;
        }
        const imageURL = URL.createObjectURL(file); //URL을 생성하는 api
        setPreview(imageURL);
    };
    return (
        <div>
            <form action={action} className="flex flex-col gap-5 p-5">
                <label
                    style={{ backgroundImage: `url(${preview})` }}
                    htmlFor="photo"
                    className="border-2 aspect-square flex flex-col items-center justify-center
                     text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
                      bg-center bg-cover"
                >
                    {preview === '' ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                                {state?.fieldErrors.photo}
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    className="hidden"
                    accept="image/*"
                />
                <Input name="title" placeholder="제목" type="text" required errors={state?.fieldErrors.title} />
                <Input name="price" placeholder="가격" type="number" required errors={state?.fieldErrors.price} />
                <Input
                    name="description"
                    placeholder="제품 설명"
                    type="text"
                    required
                    errors={state?.fieldErrors.description}
                />
                <Button content="작성 완료" />
            </form>
        </div>
    );
}
