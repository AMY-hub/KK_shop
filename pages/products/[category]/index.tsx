import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { BRAND, CATALOG, PRODUCTS } from '../../../api/APIendpoints';
import { Brand, Category, ProductPreview, ProductsResponse } from '../../../interfaces';
import { CatalogPage } from '../../../pageComponents/CatalogPage';

function CategoryCatalog({ products, count, brands }: PageProps): JSX.Element {

    return (
        <div>
            <Head>
                <title>ProductsCatalog</title>
            </Head>
            <CatalogPage
                products={products}
                count={count}
                brandList={brands}
            />
        </div>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {

    if (!params) {
        return {
            notFound: true
        };
    }

    const { data: { brands } } = await axios.get<{ brands: Brand[] }>(BRAND);

    const { data: { categories } } = await axios.get<{ categories: Category[] }>(CATALOG);
    console.log('PARAMS', params);

    const category = categories.find(el => params.category === el.route);

    const { data } = await axios.get<ProductsResponse>(PRODUCTS + `?categoryId=${category?.id}`);

    return {
        props: {
            count: data.products.count,
            products: data.products.rows,
            brands
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await axios.get<{ categories: Category[] }>(CATALOG);

    const paths = data.categories.map(el => ({ params: { category: el.route } }));

    return {
        paths,
        fallback: true
    };
};

interface PageProps {
    products: ProductPreview[];
    count: number;
    brands: Brand[];
}

export default CategoryCatalog;