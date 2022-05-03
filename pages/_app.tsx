import { AppProps } from 'next/dist/shared/lib/router/router';
import { ReactNode } from 'react';
import DynamicTina  from '../.tina/components/TinaDynamicProvider'

const App = ({ Component, pageProps }: AppProps & { Component: any }) => {
  return (
    <DynamicTina>
        <Component {...pageProps} />
    </DynamicTina>
  );
};

export default App;
