import { Brand, ProductPreview } from '../../interfaces';

export interface CatalogPageProps {
    products: ProductPreview[];
    count: number;
    brandList: Brand[];
}