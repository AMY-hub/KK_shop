import { HTMLAttributes } from 'react';

export interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
    message: string;
}