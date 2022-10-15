import cn from 'classnames';
import MirIcon from '../../assets/images/icons/mir.svg';
import GPayIcon from '../../assets/images/icons/g_pay.svg';
import VisaIcon from '../../assets/images/icons/visa.svg';
import WebMIcon from '../../assets/images/icons/webmoney.svg';
import MCIcon from '../../assets/images/icons/master_card.svg';
import YandexIcon from '../../assets/images/icons/yandex.svg';
import { PaymentLogosProps } from './PaymentLogos.props';

import styles from './style.module.scss';

export const PaymentLogos = ({ className, ...props }: PaymentLogosProps): JSX.Element => {
    return (
        <div className={cn(styles.payments, className)} {...props}>
            <MirIcon />
            <GPayIcon />
            <VisaIcon />
            <WebMIcon />
            <MCIcon />
            <YandexIcon />
        </div>
    );
};
