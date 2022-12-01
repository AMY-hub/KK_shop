import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CatalogPageProps } from './props';
import { BreadCrumbs, Container, Grid, MProductCard, Pagination, Title } from '../../components';
import { ProductsFilterPanel } from './ProductsFilterPanel';

import styles from './style.module.scss';

export const CatalogPage = ({ products, pages, brandList }: CatalogPageProps): JSX.Element => {
    const router = useRouter();
    const page = parseInt(String(router.query.page)) || 1;
    const categoryId = router.query.categoryId;
    const subCategoryId = router.query.subCategoryId;

    const animationConfig = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const cards = products.map(el => (
        <Link href={`/products/${el.id}`} passHref key={el.id} >
            <MProductCard
                {...animationConfig}
                productData={el}
            />
        </Link>
    ));

    return (
        <Container>
            <BreadCrumbs
                categoryId={Array.isArray(categoryId) ?
                    categoryId[0] : categoryId}
                subCategoryId={Array.isArray(subCategoryId) ?
                    subCategoryId[0] : subCategoryId} />
            <ProductsFilterPanel
                brandList={brandList}
            />
            <motion.div className={styles.cards}>
                {cards.length === 0 ?
                    <Title tag='h2' className={styles.cardsNotFound}>
                        Не найдено товаров по вашему запросу
                    </Title>
                    :
                    <Grid>
                        {cards}
                    </Grid>
                }
            </motion.div>
            <Pagination pagesCount={pages} currentPage={page} />
        </Container>
    );
};


