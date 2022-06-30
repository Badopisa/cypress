import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from '../theme';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '@/store';

import { colors } from '@/theme/foundations/colors';

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
                <ChakraProvider resetCSS theme={chakraTheme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </Provider>
        </>
    );
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
