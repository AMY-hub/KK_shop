import { HTMLAttributes } from 'react';

export interface AuthTabProps extends HTMLAttributes<HTMLDivElement> {
    onAuth: () => void;
}