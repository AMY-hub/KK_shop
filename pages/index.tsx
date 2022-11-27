import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PRODUCTS, SALE } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { ProductPreview, ProductsResponse, Sale } from '../interfaces';
import { MainPage } from '../pageComponents/MainPage';

interface PageProps {
  newest: ProductPreview[];
  sale: ProductPreview[] | null;
  popular: ProductPreview[];
}

function Home({ newest, sale, popular }: PageProps): JSX.Element {

  return (
    <>
      <Head>
        <title>ККshop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPage
        newest={newest}
        sale={sale}
        popular={popular} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {

  const { data: dataNew } = await API.get<ProductsResponse>(PRODUCTS + '?sort=createdAt&order=DESC&limit=6');

  const { data: { sales } } = await API.get<{ sales: Sale[] }>(SALE);

  const saleBrandQuery = sales[0].brands.map(brand => `brandId=${brand.id}`);

  let dataSaleResult = null;
  if (saleBrandQuery.length) {
    const { data: dataSale } = await API.get<ProductsResponse>(PRODUCTS + `?${saleBrandQuery.join('&')}&limit=6`);
    dataSaleResult = dataSale.products.rows;
  }

  const { data: dataPopular } = await API.get<ProductsResponse>(PRODUCTS + '?sort=orderQuantity&order=DESC&limit=6');

  return {
    props: {
      newest: dataNew.products.rows,
      sale: dataSaleResult,
      popular: dataPopular.products.rows,
    }
  };
};

export default Home;
