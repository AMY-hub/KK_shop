import { ProductPageProps } from './props';
import {
    AdvantagesBlock,
    BreadCrumbs,
    Container,
    ProductCard,
    ProductsSlider,
    Title
} from '../../components';
import { ProductInfoTab } from './ProductInfoTab';
import { ProductFullCard } from './ProductFullCard';

import styles from './style.module.scss';

export const ProductPage = ({ productData, similar, popular }: ProductPageProps): JSX.Element => {
    const {
        name,
        art,
        volume,
        weight,
        info,
        brand,
        country,
    } = productData;

    return (
        <Container>
            <BreadCrumbs productName={productData.name} />
            <section className={styles.product}>
                <ProductFullCard
                    productData={productData}
                />
                <AdvantagesBlock className={styles.productAdv} />
                <ProductInfoTab
                    name={name}
                    art={art}
                    weight={weight}
                    volume={volume}
                    country={country}
                    brand={brand}
                    info={info}
                />
            </section>
            {popular &&
                <section className={styles.popular}>
                    <Title tag='h2'>Вас могут заинтересовать</Title>
                    {popular.length < 3 ?
                        <div className={styles.similarProducts}>
                            {popular.map(prod => (
                                <ProductCard
                                    className={styles.popularCard}
                                    productData={prod}
                                    key={prod.id} />
                            ))}
                        </div>
                        :
                        <ProductsSlider
                            products={popular}
                            sliderId='sim' />
                    }
                </section>
            }
            {similar && similar.length !== 0 &&
                <section className={styles.similar}>
                    <Title tag='h2'>Похожие товары</Title>
                    {similar.length < 3 ?
                        <div className={styles.similarProducts}>
                            {similar.map(prod => (
                                <ProductCard
                                    className={styles.similarCard}
                                    productData={prod}
                                    key={prod.id} />
                            ))}
                        </div>
                        :
                        <ProductsSlider
                            products={similar}
                            sliderId='sim' />
                    }
                </section>
            }
        </Container>
    );
};


