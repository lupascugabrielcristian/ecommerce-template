import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app'
import queryClient from '../lib/query';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Component {...pageProps} />
  </QueryClientProvider>
}
