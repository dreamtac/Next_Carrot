import { z } from 'zod';

export const productSchema = z.object({
    photo: z.string({ required_error: '최소 1장의 제품 사진이 필요합니다.' }),
    title: z.string({ required_error: '제목을 입력해주세요.' }),
    description: z.string({ required_error: '제품을 설명해주세요.' }),
    price: z.coerce.number({ required_error: '제품의 가격을 입력해주세요.' }),
});

export type ProductType = z.infer<typeof productSchema>;
