import { HTMLAttributes } from 'react';

export interface AddressPickerProps extends HTMLAttributes<HTMLDivElement> {
    uid: string;
    onSelect?: () => void;
    defaultQuery?: string;
    city: string;
    onChange: (...event: any[]) => void;
}