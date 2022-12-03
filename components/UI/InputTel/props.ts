import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface InputTelProps<T extends FieldValues> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    code: string;
    control: Control<T>;
    name: Path<T>;
    isWide?: boolean;
}