import { OrderCreateResponse } from '../../../interfaces';

export interface SuccessMessageProps {
    order: OrderCreateResponse;
    isAuthorized: boolean;
}