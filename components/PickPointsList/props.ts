import { HTMLAttributes } from 'react';
import { Address } from '../../interfaces';

export interface PickPointsListProps extends HTMLAttributes<HTMLDivElement> {
    addresses: Address[];
    selectFn: (val: string) => void;
}