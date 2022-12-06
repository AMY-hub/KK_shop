import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PRODUCTS } from '../../api/APIendpoints';
import { API } from '../../api/axiosConfig';
import { Preloader } from '../../components';
import { ProductDetails, ProductPreview, ProductsResponse } from '../../interfaces';
import { ProductPage } from '../../pageComponents/ProductPage';

interface PageProps {
    product: ProductDetails;
    similar: ProductPreview[];
    popular: ProductPreview[];
}

function Product({ product, similar, popular }: PageProps): JSX.Element {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Preloader />
        );
    }

    return (
        <>
            <Head>
                <title>{product.name}</title>
                <meta name='description' content={`${product.name} ${product.name_rus} купить в онлайн магазине KKshop с доставкой Москва и регионы РФ`} />
                <meta property='og:title' content={product.name} />
                <meta property='og:description' content={product.name_rus} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + product.img} />
                <meta property='og:image:width' content='650' />
                <meta property='og:image:height' content='650' />
            </Head>
            <ProductPage
                productData={product}
                similar={similar}
                popular={popular}
            />
        </>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {

    if (!params) {
        return {
            notFound: true
        };
    }

    let similar = [],
        popular = [];

    const { data: { product } } = await API.get<{ product: ProductDetails }>(PRODUCTS + `/${params.productId}`);

    const { data: { products } } = await API.get<ProductsResponse>(PRODUCTS + `?sort=orderQuantity&order=DESC&limit=6`);
    popular = products.rows.filter(el => el.id !== product.id);

    if (product.subCategoryId) {
        const { data: { products } } = await API.get<ProductsResponse>(PRODUCTS + `?subCategoryId=${product.subCategoryId}&limit=8`);
        similar = products.rows.filter(el => el.id !== product.id);
    } else {
        const { data: { products } } = await API.get<ProductsResponse>(PRODUCTS + `?categoryId=${product.categoryId}&limit=8`);
        similar = products.rows.filter(el => el.id !== product.id);
    }

    return {
        props: {
            product,
            similar,
            popular,
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: { products } } = await API.get<ProductsResponse>(PRODUCTS + '?limit=100');
    const paths = products.rows.map(el => ({
        params: {
            productId: `${el.id}`
        }
    }));

    return {
        paths,
        fallback: true
    };
};

export default Product;