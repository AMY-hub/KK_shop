import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { MultiValue } from 'react-select';
import { Brand, Option } from '../../interfaces';

export interface FilterProps extends HTMLAttributes<HTMLDivElement> {
    brandList: Brand[];
    sorting: Option | null;
    setSorting: Dispatch<SetStateAction<Option | null>>;
    price: Option | null;
    setPrice: Dispatch<SetStateAction<Option | null>>;
    brands: Option[];
    setBrands: (opt: MultiValue<Option>) => void;
}