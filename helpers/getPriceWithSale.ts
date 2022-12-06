export const getPriceWithSale = (price: number, discount?: number): number => {
    const salePrice = discount ? Math.round(price * (1 - discount / 100)) : price;

    return salePrice;
};