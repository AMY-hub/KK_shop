import { UserData } from '../../../interfaces';

export interface ProfileLayoutProps {
    title: string;
    user: UserData;
    children: JSX.Element;
}