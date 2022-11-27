import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface CustomCheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value'> {
    error?: FieldError,
    wide?: boolean
    label: ReactNode;
    value: boolean;
    onChange: (...event: any[]) => void;
}