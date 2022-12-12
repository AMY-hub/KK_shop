import cn from 'classnames';
import { ProductCard, SpecialCard, Title } from '..';
import IconLeft from '../../assets/images/icons/arr_left.svg';
import IconRight from '../../assets/images/icons/arr_right.svg';
import { ProductsSliderProps } from './props';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './style.module.scss';

export const ProductsSlider = ({ products, title, sliderId, size = 'm' }: ProductsSliderProps): JSX.Element => {

    const slides = products.map(product => {

        return (
            <SwiperSlide
                className={cn(styles.sliderSlide, {
                    [styles.sliderSlide_l]: size === 'l'
                })}
                key={product.id}>
                {size === 'l' ?
                    <SpecialCard
                        productId={product.id}
                        name={product.name}
                        nameRus={product.name_rus}
                        price={product.price}
                        sale={product.brand.special_sale}
                        type='square'
                        img={product.img}
                        size='m'
                    />
                    :
                    <ProductCard
                        productId={product.id}
                        name={product.name}
                        name_rus={product.name_rus}
                        img={product.img}
                        price={product.price}
                        discount={product.brand.special_sale?.discount} />
                }
            </SwiperSlide>
        );
    });

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
                modules={[Navigation, A11y]}
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

