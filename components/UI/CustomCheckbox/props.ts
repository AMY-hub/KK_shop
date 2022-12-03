import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface CustomCheckboxProps<T extends FieldValues> {
    label: ReactNode;
    control: Control<T>;
    name: Path<T>;
    value: string;
    required?: boolean;
    className?: string;
}