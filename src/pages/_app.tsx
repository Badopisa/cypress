import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '../theme'
import Layout from '@/components/Layout'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={chakraTheme}>
       <Layout>
        <Component {...pageProps} />
       </Layout>
    </ChakraProvider>
  )
}

export default MyApp
