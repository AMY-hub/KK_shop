import { Brand, ProductPreview } from '../../interfaces';

export interface CatalogPageProps {
    products: ProductPreview[];
    pages: number;
    brandList: Brand[];
}