import { HTMLAttributes, ReactNode } from 'react';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    inititialOpen?: boolean;
    header: ReactNode;
}