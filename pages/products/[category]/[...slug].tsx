import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BRAND, CATALOG, PRODUCTS } from '../../../api/APIendpoints';
import { Brand, Category, ProductDetails, ProductPreview, ProductsResponse } from '../../../interfaces';
import { CatalogPage } from '../../../pageComponents/CatalogPage';
import { ProductPage } from '../../../pageComponents/ProductPage';

function Catalog({ products, count, details, similar, popular, brands }: PageProps): JSX.Element {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <h1>Loading...</h1>
        );
    }

    if (details) {
        return (
            <>
                <Head>
                    <title>{details.name}</title>
                </Head>
                <ProductPage
                    productData={details}
                    similar={similar}
                    popular={popular}
                />
            </>
        );
    }

    return (
        <>
            <Head>
                <title>ProductsCatalog</title>
            </Head>
            {products &&
                <CatalogPage
                    products={products}
                    count={count}
                    brandList={brands || []}
                />}
        </>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {

    if (!params || !params.slug) {
        return {
            notFound: true
        };
    }

    const { data: { categories } } = await axios.get<{ categories: Category[] }>(CATALOG);

    const category = categories.find(el => params.category === el.route);

    let details = null;
    let similar = null;
    let popular = null;
    let products = null;
    let count = 0;
    let brands = null;

    let productId;
    let subcategory;

    if (params.slug.length > 1) {
        productId = parseInt(params.slug[1]);
    } else {
        productId = parseInt(params.slug[0]);
        const subcategoryRoute = params.slug[0];
        subcategory = category?.subcategories
            .find(el => el.route === subcategoryRoute);
    }

    if (isNaN(productId) && !subcategory) {
        return {
            notFound: true
        };
    }

    if (subcategory) {
        const productsRes = await axios.get<ProductsResponse>(PRODUCTS + `?categoryId=${category?.id}&subCategoryId=${subcategory.id}`);
        products = productsRes.data.products.rows;
        count = productsRes.data.products.count;

        const brandsRes = await axios.get<{ brands: Brand[] }>(BRAND);
        brands = brandsRes.data.brands;
    }

    if (productId) {
        const { data } = await axios.get<{ product: ProductDetails }>(PRODUCTS + `/${productId}`);
        details = data.product;

        const { data: { products } } = await axios.get<ProductsResponse>(PRODUCTS + `?sort=orderQuantity&order=DESC&limit=6`);
        popular = products.rows.filter(el => el.id !== data.product.id);

        if (data.product.subCategoryId) {
            const { data: { products } } = await axios.get<ProductsResponse>(PRODUCTS + `?subCategoryId=${data.product.subCategoryId}&limit=8`);
            similar = products.rows.filter(el => el.id !== data.product.id);
        } else {
            const { data: { products } } = await axios.get<ProductsResponse>(PRODUCTS + `?categoryId=${data.product.categoryId}&limit=8`);
            similar = products.rows.filter(el => el.id !== data.product.id);
        }
    }

    return {
        props: {
            details,
            similar,
            popular,
            products,
            count,
            brands
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = [];

    const { data: { categories } } = await axios.get<{ categories: Category[] }>(CATALOG);

    const { data: { products } } = await axios.get<ProductsResponse>(PRODUCTS);

    for (const category of categories) {
        if (!category.subcategories.length) {
            continue;
        }
        paths.concat(category.subcategories
            .map(el => `${category.route}/${el.route}`));
    }

    products.rows.forEach(product => {
        const path = product.sub_category ?
            `${product.category.route}/${product.sub_category.route}/${product.id}`
            : `${product.category.route}/${product.id}`;

        paths.concat(path);
    });

    return {
        paths,
        fallback: true
    };
};

interface PageProps {
    products: ProductPreview[] | null;
    details: ProductDetails | null;
    similar: ProductPreview[] | null;
    popular: ProductPreview[] | null;
    count: number;
    brands: Brand[] | null;
}

export default Catalog;