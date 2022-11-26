import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputTelProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    code: string;
    error?: FieldError;
    onChange?: (...event: any[]) => void;
    isWide?: boolean;
}