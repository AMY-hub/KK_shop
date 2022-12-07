import { Control } from 'react-hook-form';
import { Address } from '../../../interfaces';
import { OrderFormFields } from '../interfaces';

export interface AddressTabProps {
    addresses: Address[];
    control: Control<OrderFormFields>;
    pickFn: (pick: string) => void;
    onSelectFn: () => void;
}