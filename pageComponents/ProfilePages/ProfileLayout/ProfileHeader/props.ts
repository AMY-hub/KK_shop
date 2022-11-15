import { HTMLAttributes } from 'react';

export interface ProfileHeaderProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    lastName: string | null;
    bonusCard: string;
}