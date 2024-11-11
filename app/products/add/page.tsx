'use client';

// title       String
// price       Float
// description String
// photo       String

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUploadUrl, uploadProduct } from './actions';
import { productSchema, ProductType } from './schema';

export default function AddProduct() {
    const [uploadUrl, setUploadUrl] = useState('');
    const [preview, setPreview] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<ProductType>({
        resolver: zodResolver(productSchema),
    });
    const onSubmit = handleSubmit(async (data: ProductType) => {
        // upload image to cloudflare
        if (!file) {
            return;
        }
        const cloudflareForm = new FormData();
        cloudflareForm.append('file', file);
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: cloudflareForm,
        });
        if (response.status !== 200) {
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        formData.append('photo', data.photo);
        // formData.set('photo', cloudflareImageUrl); //폼 데이터의 photo 를 file -> 클라우드플레어 url로 교체 (file -> string)
        const errors = await uploadProduct(formData);
        if (errors) {
            // setError()
        }
    });

    const onValid = async () => {
        await onSubmit();
    };

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
        setFile(file);
        const imageURL = URL.createObjectURL(file); //URL을 생성하는 api
        setPreview(imageURL);
        const { result, success } = await getUploadUrl(); //이미지 업로드 url 가져오기 (CloudFlare)
        if (success) {
            const { id, uploadURL } = result;
            setUploadUrl(uploadURL);
            setValue('photo', `https://imagedelivery.net/kS4q9qFNzpbBU4Qo2LIh7A/${id}`);
        }
    };
    return (
        <div>
            <form action={onValid} className="flex flex-col gap-5 p-5">
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
                                {errors.photo?.message}
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
                <Input
                    {...register('title')}
                    placeholder="제목"
                    type="text"
                    required
                    errors={[errors.title?.message ?? '']}
                />
                <Input
                    {...register('price')}
                    placeholder="가격"
                    type="number"
                    required
                    errors={[errors.price?.message ?? '']}
                />
                <Input
                    {...register('description')}
                    placeholder="제품 설명"
                    type="text"
                    required
                    errors={[errors.description?.message ?? '']}
                />
                <Button content="작성 완료" />
            </form>
        </div>
    );
}
