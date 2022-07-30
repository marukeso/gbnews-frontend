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
        <div className="mb-6">
          <SwipeList title="End soon" viewAll="/" data={data} />
        </div>
        <div className="mb-6">
          <SwipeList title="Keyboards" viewAll="/" data={data} />
        </div>
        <div className="mb-6">
          <SwipeList title="Keycaps" viewAll="/" data={data} />
        </div>
        <div className="mb-6">
          <SwipeList title="Switches" viewAll="/" data={data} />
        </div>
      </Suspense>
    </Layout>
  )
}

export default Home
