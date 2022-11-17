import cn from 'classnames';
import Link from 'next/link';
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
            <Link href='#'>
                <a>
                    <TelegramIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <OKIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <FacebookIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <WhatsAppIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <ViberIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <InstaIcon />
                </a>
            </Link>
            <Link href='#'>
                <a>
                    <VKIcon />
                </a>
            </Link>
        </div>
    );
};
