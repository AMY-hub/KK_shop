import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    catalogOpen: boolean;
    setCatalogOpen: Dispatch<SetStateAction<boolean>>;
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}