import { ProductDetails, ProductPreview } from '../../interfaces';

export interface ProductPageProps {
    productData: ProductDetails;
    similar: ProductPreview[] | null;
    popular: ProductPreview[] | null;
}