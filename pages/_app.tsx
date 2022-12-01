import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { ContextProvider } from '../context/AppContext';
import { Layout } from '../Layout';
import { Category } from '../interfaces';
import locationService from '../services/locationService';
import { API } from '../api/axiosConfig';
import { CATALOG } from '../api/APIendpoints';
import { parseCookies } from '../helpers/parseCookies';

import '../styles/vars.scss';
import '../styles/globals.scss';
import '../assets/iconFonts/style.css';

interface Props {
  catalog: Category[];
  city: string;
}

function MyApp({ Component, pageProps, router, catalog, city }: AppProps & Props): JSX.Element {
  const path = router.asPath.slice(1);

  return (
    <>
      <Head>
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + path} />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <ContextProvider
        hydrationData={{
          appData: { city, catalog }
        }}>
        <Layout catalog={catalog}>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const req = context.ctx.req;
  let city = 'Москва';

  const cityCookie = req ?
    decodeURI(parseCookies(req.headers?.cookie || '')
      .preferCity || '').replace(/%2C/g, ', ')
    : Cookies.get('preferCity');

  if (cityCookie) {
    city = cityCookie;
  } else {
    city = await locationService.getCity();
  }

  const ctx = await App.getInitialProps(context);
  const { data } = await API.get<{ categories: Category[] }>(CATALOG);

  return { ...ctx, city, catalog: data.categories };
};

export default MyApp;