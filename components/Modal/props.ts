import { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title?: string;
    shown: boolean;
    onClose: () => void;
}