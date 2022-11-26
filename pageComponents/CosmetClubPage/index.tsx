import Image from 'next/image';
import { BreadCrumbs, Container, Title } from '../../components';
import clubImg from '../../assets/images/club_c.jpg';

import styles from './style.module.scss';


export const CosmetClubPage = (): JSX.Element => {
    return (
        <Container>
            <BreadCrumbs />
            <div className={styles.club}>
                <div className={styles.clubImg}>
                    <Image
                        src={clubImg}
                        layout='intrinsic'
                        alt='Клуб косметологов'
                        placeholder='blur'
                    />
                </div>
                <div className={styles.clubInfo}>
                    <Title tag='h1'>Клуб косметологов</Title>
                    <h2>Как вступить в клуб косметологов?</h2>
                    <p className={styles.clubInfoAccentText}>
                        Вступить в клуб косметологов могут только специалисты индустрии красоты. Участникам клуба доступны специальные цены и профобъёмы на продукцию. Вступление в клуб остается на усмотрение администрации.</p>
                    <h2>Для регистрации косметологов необходимо</h2>
                    <div className={styles.clubInfoReg}>
                        <div>
                            <h3>Московская область и др</h3>
                            <p>Приехать к нам в офис по адресу: г. Москва, ул. Шаболовка, д. 34, стр. 7</p>
                            <p>Предъявить документ о профессиональном образовании и паспорт</p>
                        </div>
                        <div>
                            <h3>Регионам</h3>
                            <p>Прислать сканы документа о профессиональном образовании и паспорт на электронную почту sale@kkshop.ru</p>
                        </div>
                    </div>
                    <h2>Для вступления в клуб косметологов после предоставления документов вам необходимо</h2>
                    <p>Пройти регистрацию на нашем сайте.</p>
                    <p>После регистрации Вам будет дана возможность совершать покупки в нашем интернет-магазине по специальным ценам с выбором профобъёмов на продукцию.
                    </p>
                </div>
            </div>
        </Container>
    );
};
