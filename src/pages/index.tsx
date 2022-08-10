import type { NextPage } from 'next'
import { Suspense } from 'react'
import { useQuery } from 'urql'
import { Layout } from '../components/Layout'

import { SwipeList } from '../components/SwipeList'
import { Loading } from '../components/Loading'
import {
  ItemsByCategoryQuery,
  ItemsByCategoryDocument,
} from '../graphql/generated/graphql'

const Home: NextPage = () => {
  const [keycapResult] = useQuery<ItemsByCategoryQuery>({
    query: ItemsByCategoryDocument,
    variables: { category: 'KEYCAPS' },
  })
  const [keyboardResult] = useQuery<ItemsByCategoryQuery>({
    query: ItemsByCategoryDocument,
    variables: { category: 'KEYBOARDS' },
  })
  const [switchResult] = useQuery<ItemsByCategoryQuery>({
    query: ItemsByCategoryDocument,
    variables: { category: 'SWITCHES' },
  })

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <div className="mb-6">
          <SwipeList
            title="Keycaps"
            viewAll="/keycaps"
            data={keycapResult.data?.itemsByCategory}
          />
        </div>
        <div className="mb-6">
          <SwipeList
            title="Keyboards"
            viewAll="/keyboards"
            data={keyboardResult.data?.itemsByCategory}
          />
        </div>
        <div className="mb-6">
          <SwipeList
            title="Switches"
            viewAll="/switches"
            data={switchResult.data?.itemsByCategory}
          />
        </div>
      </Layout>
    </Suspense>
  )
}

export default Home
