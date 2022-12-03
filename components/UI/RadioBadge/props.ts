import { ReactNode } from 'react';

export interface RadioBadgeProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    className?: string;
    options: {
        value: string,
        labelTitle?: string,
        labelFooter?: string,
        labelBody: ReactNode
    }[];
}

import { Control, FieldValues, Path } from 'react-hook-form';