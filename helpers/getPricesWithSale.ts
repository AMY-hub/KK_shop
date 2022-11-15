export const getPricesWithSale = (price: number, discount?: number): [number, number] => {
    const highPrice = Math.round(price * 1.2);
    const salePrice = discount ? Math.round(price * (1 - discount / 100)) : price;

    return [salePrice, highPrice];
};