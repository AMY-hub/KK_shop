import { AppProps } from 'next/app';

import '../styles/vars.scss';
import '../styles/globals.scss';
import '../assets/iconFonts/style.css';

import { ContextProvider } from '../context/AppContext';
import { Layout } from '../Layout';
import { observer } from 'mobx-react-lite';
import { RootHydration } from '../store/rootStore';

function MyApp({ Component, pageProps }: AppProps<{ hydrationData?: RootHydration }>): JSX.Element {
  return (
    <ContextProvider hydrationData={pageProps.hydrationData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>

  );
}

export default observer(MyApp);
