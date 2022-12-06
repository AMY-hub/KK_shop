import { HTMLAttributes } from 'react';
import { Certificate } from '../../../interfaces';

export interface BasketCertificateProps extends HTMLAttributes<HTMLDivElement> {
    certificateData: Certificate;
    amount: number;
}