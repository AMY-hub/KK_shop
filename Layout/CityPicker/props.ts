import { HTMLAttributes } from 'react';

export interface CityPickerProps extends HTMLAttributes<HTMLDivElement> {
    uid: string;
    onSelect?: () => void;
    defaultCity: string;
}