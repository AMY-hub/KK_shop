import { HTMLAttributes } from 'react';

export interface RegistrationFormProps extends HTMLAttributes<HTMLFormElement> {
    onAuth: () => void;
}