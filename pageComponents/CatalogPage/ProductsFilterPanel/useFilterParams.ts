/* eslint-disable prefer-const */
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Option } from '../../../interfaces';
import { MultiValue, SingleValue } from 'react-select';

interface FilterOptions {
    brandsOptions: Option[];
    priceOptions: Option[];
    sortingOptions: Option[];
}

interface FilterReturn {
    sorting: Option | null;
    price: Option | null;
    brands: Option[];
    handleSorting: (opt: SingleValue<Option>) => void;
    handlePrice: (opt: SingleValue<Option>) => void;
    handleBrand: (opt: MultiValue<Option>) => void;
}

type UseFilterParams = (opt: FilterOptions) => FilterReturn;

export const useFilterParams: UseFilterParams = ({ brandsOptions, priceOptions, sortingOptions }) => {

    const router = useRouter();
    const [sorting, setSorting] = useState<Option | null>(getSortFromQuery);
    const [price, setPrice] = useState<Option | null>(getPriceFromQuery);
    const [brands, setBrands] = useState<Option[]>(getBrandFromQuery);

    function getBrandFromQuery(): Option[] {
        if (router.query.brandId) {
            return brandsOptions.filter(opt => router.query.brandId?.includes(opt.value));
        }
        return [];
    }

    function getPriceFromQuery(): Option | null {
        const priceParam = router.query.maxPrice;
        if (priceParam && typeof priceParam === 'string') {
            const option = priceOptions
                .find(el => el.value.includes(priceParam));
            return option ?? null;
        }
        return null;
    }

    function getSortFromQuery(): Option | null {
        const sortParam = router.query.sort;
        const sortOrder = router.query.order;
        if (sortParam && typeof sortParam === 'string') {
            const option = sortingOptions
                .find(el => {
                    const [param, order] = el.value.split('-');
                    return param === sortParam && order === sortOrder;
                });
            return option ?? null;
        }
        return null;
    }

    const handleSorting = (opt: SingleValue<Option>) => {
        setSorting(opt);
        let { sort, order, ...query } = router.query;
        if (opt) {
            [sort, order] = opt.value.split('-');
        }
        router.push({
            pathname: router.pathname,
            query: opt ? { ...query, sort, order } : query
        });
    };

    const handlePrice = (opt: SingleValue<Option>) => {
        setPrice(opt);
        let { minPrice, maxPrice, ...query } = router.query;
        if (opt) {
            [minPrice, maxPrice] = opt.value.split('-');
        }
        router.push({
            pathname: router.pathname,
            query: opt ? { ...query, page: 1, minPrice, maxPrice }
                : query
        });
    };

    const handleBrand = (opt: MultiValue<Option>) => {
        setBrands([...opt]);
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: 1,
                brandId: opt.map(el => el.value),
            }
        });
    };

    return {
        sorting,
        handleSorting,
        price,
        handlePrice,
        brands,
        handleBrand
    };
};