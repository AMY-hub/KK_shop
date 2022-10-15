import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface TitleProps extends DetailedHTMLProps<HTMLProps<HTMLParagraphElement>, HTMLParagraphElement> {
    tag: 'h1' | 'h2' | 'h3';
    children: ReactNode;
}