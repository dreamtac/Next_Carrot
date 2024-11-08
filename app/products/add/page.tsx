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
import { getUploadUrl, uploadProduct } from './actions';

export default function AddProduct() {
    const [uploadUrl, setUploadUrl] = useState('');
    const [preview, setPreview] = useState('');
    const [imageId, setImageId] = useState('');
    const interceptAction = async (_: any, formData: FormData) => {
        // upload image to cloudflare
        const photoFile = formData.get('photo');
        if (!photoFile) {
            return;
        }
        const cloudflareForm = new FormData();
        cloudflareForm.append('file', photoFile);
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: cloudflareForm,
        });
        if (response.status !== 200) {
            return;
        }
        const cloudflareImageUrl = `https://imagedelivery.net/kS4q9qFNzpbBU4Qo2LIh7A/${imageId}`;
        formData.set('photo', cloudflareImageUrl); //폼 데이터의 photo 를 file -> 클라우드플레어 url로 교체 (file -> string)
        return uploadProduct(_, formData);
    };
    const [state, action] = useFormState(interceptAction, null);
    const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        const { result, success } = await getUploadUrl(); //이미지 업로드 url 가져오기 (CloudFlare)
        if (success) {
            const { id, uploadURL } = result;
            setImageId(id);
            setUploadUrl(uploadURL);
        }
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
