import { Control } from 'react-hook-form';
import { OrderFormFields } from '..';
import { Address } from '../../../interfaces';

export interface AddressTabProps {
    addresses: Address[];
    control: Control<OrderFormFields>;
    pickFn: (pick: string) => void;
    onSelectFn: () => void;
}