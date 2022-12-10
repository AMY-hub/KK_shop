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
        categoryId,
        subCategoryId
    } = productData;

    return (
        <Container>
            <BreadCrumbs
                categoryId={String(categoryId)}
                subCategoryId={String(subCategoryId)}
                productName={productData.name} />
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
                            {popular.map(product => (
                                <ProductCard
                                    className={styles.popularCard}
                                    productId={product.id}
                                    name={product.name}
                                    name_rus={product.name_rus}
                                    img={product.img}
                                    price={product.price}
                                    discount={product.brand.special_sale?.discount}
                                    key={product.id} />
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
                            {similar.map(product => (
                                <ProductCard
                                    className={styles.similarCard}
                                    productId={product.id}
                                    name={product.name}
                                    name_rus={product.name_rus}
                                    img={product.img}
                                    price={product.price}
                                    discount={product.brand.special_sale?.discount}
                                    key={product.id} />
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


