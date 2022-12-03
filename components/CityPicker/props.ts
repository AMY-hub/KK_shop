import { HTMLAttributes } from 'react';

export interface CityPickerProps extends HTMLAttributes<HTMLDivElement> {
    onSelect?: () => void;
    defaultCity: string;
}