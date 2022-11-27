import { HTMLAttributes } from 'react';

export interface AlertMessageProps extends HTMLAttributes<HTMLDivElement> {
    message: string,
    title?: string,
    type: 'warning' | 'success',
    onClose?: () => void
}