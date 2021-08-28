import App, { AppProps, AppContext } from 'next/app';
import cookies from 'next-cookies';
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { ctx } = appContext;

  const { accessToken } = cookies(ctx);

  if (accessToken && ctx.res) {
    ctx.res.writeHead(301, {
      Location: `/`,
    });

    ctx.res.end();
  }

  return { ...appProps, accessToken };
};
