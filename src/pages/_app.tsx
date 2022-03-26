import { AppProps } from 'next/app';
import common from '../styles/common.module.scss';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={common.container}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
