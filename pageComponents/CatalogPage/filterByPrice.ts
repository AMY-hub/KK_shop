import { ProductPreview } from '../../interfaces';

export const filterByPrice = (products: ProductPreview[], interval: string): ProductPreview[] => {
    const [start, end] = interval.split('-');
    return products
        .filter(p => p.price > Number(start) && p.price < Number(end));
};