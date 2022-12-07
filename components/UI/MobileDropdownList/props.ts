import { HTMLAttributes } from 'react';
import { LinkOption } from '../../../interfaces';

export interface DropdownListProps extends HTMLAttributes<HTMLDivElement> {
    options: LinkOption[],
    title: string,
}