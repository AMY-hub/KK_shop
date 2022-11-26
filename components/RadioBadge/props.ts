import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface RadioBadgeProps {
    error?: FieldError,
    name: string,
    value: string;
    onChange: (...event: any[]) => void;
    options: {
        value: string,
        labelTitle?: string,
        labelFooter?: string,
        labelBody: ReactNode
    }[];
}