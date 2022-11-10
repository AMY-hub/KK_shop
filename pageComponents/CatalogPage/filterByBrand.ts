import { ProductPreview, Option } from '../../interfaces';

export const filterByBrand = (products: ProductPreview[], brands: Option[]): ProductPreview[] => {
    return products.filter(product => {
        return brands.find(brand => brand.label === product.brand.name);
    });
};