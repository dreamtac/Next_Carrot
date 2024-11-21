import ProductModal from '@/components/product_modal';
import { getProduct } from './server';

export default async function ProductsModal({ params }: { params: { id: string } }) {
    const product = await getProduct(Number(params.id));
    return <ProductModal product={product} />;
}
