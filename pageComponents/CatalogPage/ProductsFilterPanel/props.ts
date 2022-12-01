import { HTMLAttributes } from 'react';
import { Brand } from '../../../interfaces';

export interface FilterProps extends HTMLAttributes<HTMLDivElement> {
    brandList: Brand[];
}