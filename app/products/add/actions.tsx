'use server';

import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productSchema = z.object({
    photo: z.string({ required_error: '최소 1장의 제품 사진이 필요합니다.' }),
    title: z.string({ required_error: '제목을 입력해주세요.' }),
    description: z.string({ required_error: '제품을 설명해주세요.' }),
    price: z.coerce.number({ required_error: '제품의 가격을 입력해주세요.' }),
});

export async function uploadProduct(_: any, formdata: FormData) {
    const data = {
        photo: formdata.get('photo'),
        title: formdata.get('title'),
        price: formdata.get('price'),
        description: formdata.get('description'),
    };
    // 아래 코드는 유저가 업로드한 이미지를 우리 서버에 저장시키는 코드임.
    // if (data.photo instanceof File) {
    //     const photoData = await data.photo.arrayBuffer();

    //     await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    //     data.photo = `/${data.photo.name}`; //zod에서 photo가 string으로 지정되어 있으므로 photo를 파일의 위치를 가르키도록 수정.
    // }

    const zodResult = productSchema.safeParse(data);
    console.log('zod success: ', zodResult.success);
    if (!zodResult.success) {
        return zodResult.error.flatten();
    } else {
        const session = await getSession();
        const product = await db.product.create({
            data: {
                description: zodResult.data.description,
                title: zodResult.data.title,
                price: zodResult.data.price,
                photo: zodResult.data.photo,
                user: {
                    connect: {
                        id: session.id,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        return redirect(`/products/${product.id}`);
    }
}

export async function getUploadUrl() {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT}/images/v2/direct_upload`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.CF_TOKEN}`,
            },
        }
    );

    const data = await response.json();
    return data;
}

// curl --request POST \
//   --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \
//   --header 'Authorization: Bearer <API_TOKEN>' \
//   --header 'Content-Type: multipart/form-data' \
//   --form file=@./<YOUR_IMAGE.IMG></YOUR_IMAGE.IMG>
