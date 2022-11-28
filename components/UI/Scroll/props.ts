import { HTMLAttributes, ReactNode } from 'react';

export interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    width?: number;
}