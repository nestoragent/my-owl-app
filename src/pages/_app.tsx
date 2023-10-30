import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>My Owl App</title>
      <meta property='og:description' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
      <meta property='og:localy' content='en_EN'/>
    </Head>
    <Component { ...pageProps } />
  </>;
}
