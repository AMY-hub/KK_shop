import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import aboutImg from '../../assets/images/about_img_c.jpg';
import { MainInfoSlider } from './MainInfoSlider';
import {
    Container,
    InfoBadge,
    SubscriptionForm,
    Title,
    ProductsSlider
} from '../../components';
import { MainPageProps } from './props';

import styles from './style.module.scss';

export const MainPage = ({ newest, sale, popular }: MainPageProps): JSX.Element => {
    return (
        <>
            <section className={styles.infoSlider}>
                <MainInfoSlider />
            </section>
            <Container>
                <section className={styles.about}>
                    <Image
                        src={aboutImg}
                        alt='о корейской косметике'
                        layout='intrinsic'
                        objectFit='cover'
                    />
                    <div className={styles.aboutInfo}>
                        <Title tag='h2'>
                            Ведущий эксперт на российском рынке профессиональной косметики из Кореи—ККshop™
                        </Title>
                        <p>
                            Мы делаем мир профессиональной корейской косметики доступным для каждого косметолога в России, предоставляя возможность работать с лучшими достижениями корейских учёных и специалистов в области сохранения здоровья и ухода за кожей.
                        </p>
                        <Link href='/cosmetologists'>
                            <a className={cn(styles.aboutLink, 'icon-arr_right')}
                            >Подробнее</a>
                        </Link>
                    </div>
                </section>
                <section className={styles.advantages}>
                    <InfoBadge
                        size='l'
                        styleType='plain'
                    >Безупречный состав и эффективность
                    </InfoBadge>
                    <InfoBadge
                        size='l'
                        styleType='plain'
                    >Натуральность и экологичность
                    </InfoBadge>
                    <InfoBadge
                        size='l'
                        styleType='plain'
                    >Наличный и безналичный расчет
                    </InfoBadge>
                    <InfoBadge
                        size='l'
                        styleType='plain'
                    >Доставка по всей России
                    </InfoBadge>
                </section>
                <section className={styles.products}>
                    <ProductsSlider
                        sliderId={1}
                        products={newest}
                        title='Новинки' />
                    {sale &&
                        <ProductsSlider
                            sliderId={2}
                            products={sale}
                            title='Акционные товары'
                            size='l' />
                    }
                    <ProductsSlider
                        sliderId={3}
                        products={popular}
                        title='Рекомендуемые товары' />
                </section>
                <SubscriptionForm />
            </Container>
        </>
    );
};
