import { ProductPreview } from '../../interfaces';

export const sortProducts = (products: ProductPreview[], sort: string): ProductPreview[] => {
    switch (sort) {
        case 'price-ASC':
            return products.sort((a, b) => a.price - b.price);
        case 'price-DESC':
            return products.sort((a, b) => b.price - a.price);
        case 'popular':
            return products.sort((a, b) => a.orderQuantity - b.orderQuantity);
        case 'newest':
            return products.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            });
        default:
            return products;
    }
};