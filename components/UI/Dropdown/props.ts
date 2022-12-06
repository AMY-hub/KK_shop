import { HTMLAttributes, ReactNode } from 'react';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    opened?: boolean;
    header: ReactNode;
}