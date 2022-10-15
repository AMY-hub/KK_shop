import { AppProps } from 'next/app';

import '../styles/vars.scss';
import '../styles/globals.scss';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MyApp;
