import App, { AppContext, AppProps } from 'next/app';
import Cookies from 'js-cookie';
import { ContextProvider } from '../context/AppContext';
import { Layout } from '../Layout';
import { observer } from 'mobx-react-lite';
import { Category } from '../interfaces';
import locationService from '../services/locationService';
import { API } from '../api/axiosConfig';
import { CATALOG } from '../api/APIendpoints';
import { parseCookies } from '../helpers/parseCookies';

import '../styles/vars.scss';
import '../styles/globals.scss';
import '../assets/iconFonts/style.css';

function MyApp({ Component, pageProps, catalog, city }: AppProps & Props): JSX.Element {
  return (
    <ContextProvider
      hydrationData={{ appData: { city, catalog } }}>
      <Layout catalog={catalog}>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const req = context.ctx.req;
  let city = '';

  const cityCookie = req ?
    decodeURI(parseCookies(req.headers?.cookie || '').preferCity || '')
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

export default observer(MyApp);

interface Props {
  catalog: Category[];
  city: string;
}