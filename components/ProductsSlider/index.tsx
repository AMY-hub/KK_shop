// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import cn from 'classnames';
import { ProductCard, SpecialCard, Title } from '..';
import IconLeft from '../../assets/images/icons/arr_left.svg';
import IconRight from '../../assets/images/icons/arr_right.svg';
import { ProductsSliderProps } from './props';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './style.module.scss';
import Link from 'next/link';

export const ProductsSlider = ({ products, title, sliderId, size = 'm' }: ProductsSliderProps): JSX.Element => {

    const slides = products.map(product => {

        const { category, sub_category, id } = product;

        const href = sub_category ?
            `/products/${category.route}/${sub_category.route}/${id}`
            :
            `/products/${category.route}/${id}`;

        return (
            <SwiperSlide
                className={cn(styles.sliderSlide, {
                    [styles.sliderSlide_l]: size === 'l'
                })}
                key={product.id}>
                {size === 'l' ?
                    <Link href={href} passHref>
                        <SpecialCard
                            name={product.name}
                            nameRus={product.name_rus}
                            price={product.price}
                            type='square'
                            img={product.img}
                            size='m'
                        />
                    </Link>
                    :
                    <Link href={href} passHref>
                        <ProductCard productData={product} />
                    </Link>
                }
            </SwiperSlide>
        );
    });

    // const mBreakpoints = {
    //     320: {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //     },
    //     640: {
    //         slidesPerView: 'auto'
    //     }
    // };

    // const lBreakpoints = {
    //     320: {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //     },
    //     890: {
    //         slidesPerView: 'auto'
    //     }
    // };

    return (
        <div>
            <div className={styles.sliderNav}>
                {title &&
                    <Title tag='h2'>{title}</Title>
                }
                <div>
                    <button className={cn(`prev_${sliderId}`, styles.sliderNavBtn_prev)}>
                        <IconLeft />
                    </button>
                    <button className={cn(`next_${sliderId}`, styles.sliderNavBtn_next)}>
                        <IconRight />
                    </button>
                </div>
            </div>
            <Swiper
                className={styles.sliderWrapper}
                modules={[Navigation]}
                navigation={{
                    prevEl: `.prev_${sliderId}`,
                    nextEl: `.next_${sliderId}`,
                }}
                loop={true}
                slidesPerView='auto'
                spaceBetween={35}
                centeredSlides
                centeredSlidesBounds
            >
                {slides}
            </Swiper>
        </div>

    );
};

