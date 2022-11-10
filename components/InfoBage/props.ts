import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface InfoBadgeProps extends Omit<DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement>, 'size'> {
    children: ReactNode,
    size?: 's' | 'm' | 'l',
    styleType?: 'accent' | 'plain' | 'gray',
    isClickable?: boolean
}