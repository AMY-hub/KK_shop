import { HTMLAttributes } from 'react';

export interface LoginFormProps extends HTMLAttributes<HTMLFormElement> {
    onAuth: () => void;
}
