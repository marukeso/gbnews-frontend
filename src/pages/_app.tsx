import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  Provider,
} from 'urql'

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  suspense: true,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
