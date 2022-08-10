import type { NextPage } from 'next'
import { Suspense } from 'react'
import { useQuery } from 'urql'
import { Layout } from '../components/Layout'

import { Loading } from '../components/Loading'
import {
  ItemsByCategoryQuery,
  ItemsByCategoryDocument,
} from '../graphql/generated/graphql'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

const CategoryPage: NextPage = () => {
  const router = useRouter()
  const { category } = router.query

  let categoryUpperCase
  if (typeof category === 'string') {
    categoryUpperCase = category.toUpperCase()
  }

  const [result] = useQuery<ItemsByCategoryQuery>({
    query: ItemsByCategoryDocument,
    variables: { category: categoryUpperCase },
  })

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <div className="mb-4 flex items-center justify-between px-3">
          <h2 className="text-2xl font-bold capitalize">{category}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 px-2">
          {result.data?.itemsByCategory.map((item) => (
            <div key={item.id} className="mb-5">
              <Link href={`/item/${item.id}`}>
                <a className="block">
                  <div className="relative mb-2">
                    <Image
                      width={80}
                      height={50}
                      src={`/${item.imageUrl}`}
                      alt="image"
                      objectFit="cover"
                      layout="responsive"
                    />
                    <p className="absolute top-2 left-2 inline-block rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                      {item.status}
                    </p>
                  </div>

                  <div>
                    <p className="truncate">{item.name}</p>
                    <p className="text-sm font-light text-gray-300">
                      {`${formatDistanceToNow(new Date(item.endDate))} left`}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </Suspense>
  )
}

export default CategoryPage
