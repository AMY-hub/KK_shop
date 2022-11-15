import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MultiValue } from 'react-select';
import Link from 'next/link';
import { Option } from '../../interfaces';
import { CatalogPageProps } from './props';
import { BreadCrumbs, Container, ProductCard, SpecialCard, Title } from '../../components';
import { ProductsFilterPanel } from './ProductsFilterPanel';
import { sortProducts } from './sortProducts';
import { filterByPrice } from './filterByPrice';
import { filterByBrand } from './filterByBrand';

import styles from './style.module.scss';

export const CatalogPage = ({ products, count, brandList }: CatalogPageProps): JSX.Element => {

    const router = useRouter();
    const [productsToShow, setProductsToShow] = useState(products);
    const [sorting, setSorting] = useState<Option | null>(null);
    const [price, setPrice] = useState<Option | null>(null);
    const [brands, setBrands] = useState<Option[]>(getBrandFromQuery);

    useEffect(() => {
        let newProductsToShow = products;
        if (brands.length > 0) {
            newProductsToShow = filterByBrand(newProductsToShow, brands);
        }
        if (price) {
            newProductsToShow = filterByPrice(newProductsToShow, price.value);
        }
        if (sorting) {
            newProductsToShow = sortProducts(newProductsToShow, sorting.value);
        }
        setProductsToShow(newProductsToShow);
    }, [sorting, price, brands, products]);


    function getBrandFromQuery(): Option[] {
        if (router.query.brand) {
            console.log(router.query.brand);

            const brandOptions: Option[] = brandList
                .filter(el => el.route === router.query.brand)
                .map(el => ({ label: el.name, value: el.route }));

            return brandOptions;
        }
        return [];
    }

    function changeBrands(opt: MultiValue<Option>) {
        setBrands([...opt]);
    }

    return (
        <Container>
            <BreadCrumbs />
            <ProductsFilterPanel
                brandList={brandList}
                sorting={sorting}
                setSorting={setSorting}
                price={price}
                setPrice={setPrice}
                brands={brands}
                setBrands={changeBrands}
            />
            <div className={styles.cards}>
                {productsToShow.length ?
                    productsToShow.map((el, idx) => {

                        const href = el.sub_category ?
                            `/products/${el.category.route}/${el.sub_category.route}/${el.id}`
                            :
                            `/products/${el.category.route}/${el.id}`;

                        if ((idx + 1) % 5 === 0
                            && products.length > 8) {
                            return (
                                <Link href={href} passHref key={el.id} >
                                    <SpecialCard
                                        className={styles.cardsBig}
                                        type='square'
                                        price={el.price}
                                        name={el.name}
                                        nameRus={el.name_rus}
                                        img={el.img}
                                        sale={el.brand.special_sale}
                                        key={el.id}
                                    />
                                </Link>
                            );
                        }
                        return (
                            <Link href={href} passHref key={el.id} >
                                <ProductCard productData={el} />
                            </Link>
                        );
                    })

                    :
                    <Title tag='h2' className={styles.cardsNotFound}>
                        Не найдено товаров по вашему запросу
                    </Title>
                }
            </div>
        </Container>
    );
};


