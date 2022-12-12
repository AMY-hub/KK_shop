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
  const title = 'Интернет-магазин корейской косметики KKshop — купить косметику из Кореи в Москве, Санкт-Петербурге и регионах РФ';
  const description = 'Оригинальная корейская косметика по низким ценам в интернет-магазине KKshop. Косметика из Южной Кореи от официальных поставщиков. Купить корейскую косметику онлайн с доставкой.';
  console.log(process.env.NODE_ENV);

  return (
    <>
      <Head>
        <title>ККshop - Корейская Косметика</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_image.jpg'} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
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

  const { data: dataPopular } = await API.get<ProductsResponse>(PRODUCTS + '?sort=orderQuantity&order=DESC&limit=6');

  const { data: { sales } } = await API.get<{ sales: Sale[] }>(SALE);

  const saleBrandQuery = sales[0].brands.map(brand => `brandId=${brand.id}`);

  let dataSaleResult = null;
  if (saleBrandQuery.length) {
    const { data: dataSale } = await API.get<ProductsResponse>(PRODUCTS + `?limit=6&${saleBrandQuery.join('&')}`);
    dataSaleResult = dataSale.products.rows;
  }

  return {
    props: {
      newest: dataNew.products.rows,
      sale: dataSaleResult,
      popular: dataPopular.products.rows,
    }
  };
};

export default Home;
