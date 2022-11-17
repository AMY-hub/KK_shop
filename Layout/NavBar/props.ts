import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { Category } from '../../interfaces';

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    catalogOpen: boolean;
    setCatalogOpen: Dispatch<SetStateAction<boolean>>;
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
    catalog: Category[];
}