import cn from 'classnames';
import TelegramIcon from '../../assets/images/icons/telegramm.svg';
import OKIcon from '../../assets/images/icons/ok.svg';
import FacebookIcon from '../../assets/images/icons/facebook.svg';
import WhatsAppIcon from '../../assets/images/icons/watsapp.svg';
import ViberIcon from '../../assets/images/icons/viber.svg';
import InstaIcon from '../../assets/images/icons/instagramm.svg';
import VKIcon from '../../assets/images/icons/vk.svg';
import { SocialsProps } from './props';

import styles from './style.module.scss';

export const Socials = ({ className, ...props }: SocialsProps): JSX.Element => {
    return (
        <div className={cn(styles.socials, className)} {...props}>
            <a href='#' target='_blank'>
                <TelegramIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Телеграм магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <OKIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Одноклассники магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <FacebookIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Facebook магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <WhatsAppIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    WhatsApp магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <ViberIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Viber магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <InstaIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Instagram магазина
                </span>
            </a>
            <a href='#' target='_blank'>
                <VKIcon aria-hidden={true} />
                <span className={styles.hidden}>
                    Вконтакте магазина
                </span>
            </a>
        </div>
    );
};
