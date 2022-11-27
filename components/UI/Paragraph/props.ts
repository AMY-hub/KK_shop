import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface ParagraphProps extends DetailedHTMLProps<HTMLProps<HTMLParagraphElement>, HTMLParagraphElement> {
    fontSize?: 'm' | 'l';
    children: ReactNode;
}