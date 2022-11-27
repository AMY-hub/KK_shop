import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type IconCustomProps = {
    children: ReactNode,
    styleType?: 'dark' | 'light',
};

export type AsButton = IconCustomProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof IconCustomProps> & {
    like?: 'button',
};

export type AsLink = IconCustomProps & LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof IconCustomProps> & React.RefAttributes<HTMLAnchorElement> & {
    like: 'Link',
    isActive?: boolean
};

export type IconButtonProps = AsButton | AsLink;