import type { NextPage } from 'next'
import { Suspense } from 'react'
import { useQuery } from 'urql'
import {
  FindAllItemsQuery,
  FindAllItemsDocument,
} from '../graphql/generated/graphql'
import { Layout } from '../components/Layout'

import { SwipeList } from '../components/SwipeList'

const Home: NextPage = () => {
  const [result] = useQuery<FindAllItemsQuery>({
    query: FindAllItemsDocument,
  })
  const { data } = result

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <SwipeList title="もうすぐ終わる" viewAll="/" data={data} />
        <SwipeList title="Keyboards" viewAll="/" data={data} />
        <SwipeList title="Keycaps" viewAll="/" data={data} />
        <SwipeList title="Switches" viewAll="/" data={data} />
      </Suspense>
    </Layout>
  )
}

export default Home
