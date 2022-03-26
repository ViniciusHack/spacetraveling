import { AppProps } from 'next/app';
import Header from '../components/Header';
import common from '../styles/common.module.scss';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={common.container}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
