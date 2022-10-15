import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonCustomProps = {
    children?: ReactNode,
    styleType?: 'primary' | 'plain' | 'ghost',
    size?: 'l' | 'm' | 's',
    wide?: boolean
};

export type AsButton = ButtonCustomProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonCustomProps> & {
    like?: 'button',
    withLoading?: boolean,
    loading?: boolean
};

export type AsLink = ButtonCustomProps & LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonCustomProps> & React.RefAttributes<HTMLAnchorElement> & {
    like: 'Link',
    isActive?: boolean
};

export type AsAnchor = ButtonCustomProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonCustomProps> & {
    like: 'a'
};

export type ButtonProps = AsButton | AsAnchor | AsLink;