import { HTMLAttributes } from 'react';

export interface AddressPickerProps extends Omit<HTMLAttributes<HTMLDivElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
    uid: string;
    onSelect?: () => void;
    defaultQuery?: string;
    city: string;
    onChange: (...event: any[]) => void;
}