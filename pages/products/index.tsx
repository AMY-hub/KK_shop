import { GetStaticProps } from 'next';
import Head from 'next/head';
import { BRAND, PRODUCTS } from '../../api/APIendpoints';
import { API } from '../../api/axiosConfig';
import { Brand, ProductPreview, ProductsResponse } from '../../interfaces';
import { CatalogPage } from '../../pageComponents/CatalogPage';

function ProductsCatalog({ count, products, brands }: PageProps): JSX.Element {

    return (
        <div>
            <Head>
                <title>ProductsCatalog</title>
            </Head>
            <CatalogPage
                count={count}
                products={products}
                brandList={brands} />
        </div>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await API.get<ProductsResponse>(PRODUCTS);
    const { data: { brands } } = await API.get<{ brands: Brand[] }>(BRAND);

    return {
        props: {
            count: data.products.count,
            products: data.products.rows,
            brands
        },
        revalidate: 60
    };
};

interface PageProps {
    products: ProductPreview[];
    count: number;
    brands: Brand[];
}

export default ProductsCatalog;