import { useAppContext, useBasketContext } from '../context/AppContext';
import { Address } from '../interfaces';

type UseDelivery = (addresses: Address[]) => {
    deliveryPrice: number;
    courierPrice: number;
    pickPrice: number;
    pick: Address[] | null;
};

export const useDelivery: UseDelivery = (addresses) => {
    const city = useAppContext().city;
    const basketPrice = useBasketContext().finalPrice;

    const shopInCity = addresses.find(a => a.city.includes(city));
    const courierPrice = shopInCity ? 100 : 400;
    const pickPoints = addresses.filter(address => address.city === city);

    return {
        courierPrice,
        deliveryPrice: basketPrice > 5000 ? 0 : courierPrice,
        pickPrice: 0,
        pick: pickPoints.length === 0 ? null : pickPoints
    };
};