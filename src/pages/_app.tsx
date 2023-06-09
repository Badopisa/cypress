import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from '../theme';
import Fonts from '../fonts';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistedStore, store } from '@/store';

import { colors } from '@/theme/foundations/colors';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextNprogress
                color={colors.primary}
                startPosition={0.3}
                stopDelayMs={200}
                showOnShallow={true}
                height={8}
            />
            <Provider store={store}>
                <PersistGate persistor={persistedStore} loading={null}>
                    <ChakraProvider resetCSS theme={chakraTheme}>
                        <Fonts />
                        <Component {...pageProps} />
                    </ChakraProvider>
                </PersistGate>
            </Provider>
        </>
    );
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
