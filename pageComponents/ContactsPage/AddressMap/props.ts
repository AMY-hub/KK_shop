import { HTMLAttributes } from 'react';

export interface AddressMapProps extends HTMLAttributes<HTMLDivElement> {
    state: {
        center: [number, number];
        zoom: number;
    }
    placeMarks?: JSX.Element[];
}