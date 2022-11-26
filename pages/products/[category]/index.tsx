import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BRAND, CATALOG, PRODUCTS } from '../../../api/APIendpoints';
import { API } from '../../../api/axiosConfig';
import { Preloader } from '../../../components';
import { Brand, Category, ProductPreview, ProductsResponse } from '../../../interfaces';
import { CatalogPage } from '../../../pageComponents/CatalogPage';

interface PageProps {
    products: ProductPreview[];
    count: number;
    brands: Brand[];
}

function CategoryCatalog({ products, count, brands }: PageProps): JSX.Element {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Preloader />
        );
    }

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

    const { data: { brands } } = await API.get<{ brands: Brand[] }>(BRAND);
    const { data: { categories } } = await API.get<{ categories: Category[] }>(CATALOG);
    const category = categories.find(el => params.category === el.route);
    const { data } = await API.get<ProductsResponse>(PRODUCTS + `?categoryId=${category?.id}`);

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
    const { data } = await API.get<{ categories: Category[] }>(CATALOG);
    const paths = data.categories.map(el => ({ params: { category: el.route } }));

    return {
        paths,
        fallback: true
    };
};

export default CategoryCatalog;