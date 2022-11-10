import { AppProps } from 'next/app';

import '../styles/vars.scss';
import '../styles/globals.scss';
import '../assets/iconFonts/style.css';

import { ContextProvider } from '../context/AppContext';
import { Layout } from '../Layout';
import { observer } from 'mobx-react-lite';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>

  );
}

export default observer(MyApp);
