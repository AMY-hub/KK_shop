import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { BRAND, PRODUCTS } from '../../api/APIendpoints';
import { API } from '../../api/axiosConfig';
import { Brand, ProductPreview, ProductsResponse } from '../../interfaces';
import { CatalogPage } from '../../pageComponents/CatalogPage';

interface PageProps {
    products: ProductPreview[];
    pages: number;
    brands: Brand[];
}

function ProductsCatalog({ pages, products, brands }: PageProps): JSX.Element {
    const title = 'Интернет-магазин корейской косметики KKshop — купить косметику из Кореи в Москве, Санкт-Петербурге и регионах РФ';
    const description = 'Оригинальная корейская косметика по низким ценам в интернет-магазине KKshop. Косметика из Южной Кореи от официальных поставщиков. Купить корейскую косметику онлайн с доставкой.';

    return (
        <div>
            <Head>
                <title>KKshop - Каталог</title>
                <meta name='description' content={description} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_image.jpg'} />
                <meta property='og:image:width' content='1200' />
                <meta property='og:image:height' content='630' />
            </Head>
            <CatalogPage
                products={products}
                pages={pages}
                brandList={brands}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {

    const limitPerPage = 10;

    const { data: { brands } } = await API.get<{ brands: Brand[] }>(BRAND);

    let queryString = `?limit=${limitPerPage}`;
    for (const key in query) {
        if (!queryString) {
            queryString += `?${key}=${query[key]}`;
        } else {
            queryString += `&${key}=${query[key]}`;
        }
    }

    console.log('QUERY', query);
    console.log('QUERYSTRING', queryString);

    const { data } = await API.get<ProductsResponse>(PRODUCTS + queryString);
    console.log('DATA', data);
    const pages = Math.ceil(data.products.count / limitPerPage);

    return {
        props: {
            pages,
            products: data.products.rows,
            brands
        },
    };
};

export default ProductsCatalog;