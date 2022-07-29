import type { NextPage } from 'next'
import { Suspense } from 'react'
import { useQuery } from 'urql'
import {
  FindAllItemsQuery,
  FindAllItemsDocument,
} from '../graphql/generated/graphql'
import { format } from 'date-fns'
import { Layout } from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  const [result] = useQuery<FindAllItemsQuery>({
    query: FindAllItemsDocument,
  })
  const { data } = result

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <div>
          {data?.items.map((item) => (
            <Link href={`${item.id}`} key={item.id}>
              <a className="mb-5 flex">
                <div className="relative w-[80px]">
                  <Image
                    className="aspect-square rounded-lg"
                    width={80}
                    height={80}
                    src="/test-image.png"
                    alt="image"
                  />
                </div>

                <div className="w-[calc(100%_-_80px)] pl-4">
                  <p className="inline-block rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                    {item.status}
                  </p>
                  <h1 className="truncate text-lg font-bold">{item.name}</h1>
                  <p className="text-sm text-gray-600">
                    {format(new Date(item.startDate), 'yyyy年MM月dd日')}〜
                    {format(new Date(item.endDate), 'yyyy年MM月dd日')}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Suspense>
    </Layout>
  )
}

export default Home
