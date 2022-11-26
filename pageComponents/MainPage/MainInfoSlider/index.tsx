// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper';
import cn from 'classnames';
import { Button } from '../../../components';
import IconLeft from '../../../assets/images/icons/arr_thin_left.svg';
import IconRight from '../../../assets/images/icons/arr_thin_right.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import "swiper/css/effect-fade";

import styles from './style.module.scss';
import { useEffect, useState } from 'react';

export const MainInfoSlider = (): JSX.Element => {

    return (
        <Swiper
            className={styles.sliderWrapper}
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            navigation={{
                prevEl: '.prev',
                nextEl: '.next',
            }}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }}
            effect='fade'
        >
            <SwiperSlide>
                <div className={cn(styles.content, styles.slide1)}>
                    <div className={styles.contentInfo}>
                        <h2 className={styles.contentTitle}>The Saem</h2>
                        <p>Специальные цены только до 30 апреля</p>
                        <Button
                            like='Link'
                            href={'/products?brand=TheSaem'}
                            size='l'
                            className={styles.contentBtn}>
                            Перейти в каталог
                        </Button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={cn(styles.content, styles.slide2)}>
                    <div className={styles.contentInfo}>
                        <h2 className={styles.contentTitle}>Fraijour</h2>
                        <p>Original Herb - новая серия для проблемной кожи</p>
                        <Button
                            like='Link'
                            href={'/products?brand=Fraijour'}
                            size='l'
                            className={styles.contentBtn}>
                            Перейти в каталог
                        </Button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={cn(styles.content, styles.slide3)}>
                    <div className={styles.contentInfo}>
                        <h2 className={styles.contentTitle}>Jan Marini</h2>
                        <p>Специальные цены только до 30 апреля</p>
                        <Button
                            like='Link'
                            href={'/products?brand=JanMarini'}
                            size='l'
                            className={styles.contentBtn}>
                            Перейти в каталог
                        </Button>
                    </div>
                </div>
            </SwiperSlide>
            <button className={cn('prev', styles.sliderPrevBtn)}>
                <IconLeft />
            </button>
            <button className={cn('next', styles.sliderNextBtn)}>
                <IconRight />
            </button>
        </Swiper>
    );
};

