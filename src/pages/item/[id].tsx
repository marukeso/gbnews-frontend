import { format } from 'date-fns'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { useQuery } from 'urql'
import { Layout } from '../../components/Layout'
import {
  FindByIdQuery,
  FindByIdDocument,
} from '../../graphql/generated/graphql'

const ItemDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [result] = useQuery<FindByIdQuery>({
    query: FindByIdDocument,
    variables: { id },
  })
  const { data } = result
  // console.log(data?.findById)

  return (
    <Layout title={data?.findById.name}>
      <Suspense fallback={<p>Loading...</p>}>
        <div>
          <Link href="/">
            <a className="mx-3 mb-5 inline-block">Back</a>
          </Link>

          <h1 className="mb-6 px-3 text-2xl">{data?.findById.name}</h1>
          <Image
            width={80}
            height={50}
            layout="responsive"
            objectFit="cover"
            src={`/${data?.findById.imageUrl}`}
            alt={data?.findById.name}
          />
          <div className="mt-6 px-3">
            <p>{data?.findById.status}</p>
            {/* <p>
              {format(new Date(data?.findById.startDate), 'yyyy/MM/dd')}〜
              {format(new Date(data?.findById.endDate), 'yyyy/MM/dd')}
            </p> */}
            <p>Vendors:</p>
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}

export default ItemDetail
