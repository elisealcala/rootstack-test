import { AppProps } from 'next/app';
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
