import { format } from 'date-fns'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { Layout } from '../../components/Layout'
import {
  FindByIdQuery,
  FindByIdDocument,
} from '../../graphql/generated/graphql'
import { Loading } from '../../components/Loading'

const ItemDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [result] = useQuery<FindByIdQuery>({
    query: FindByIdDocument,
    variables: { id },
  })
  const { data } = result

  if (!data?.findById) {
    return <Loading />
  }

  return (
    <Layout title={data.findById.name}>
      <div>
        <a className="mx-3 mb-5 inline-block" onClick={() => router.back()}>
          Back
        </a>

        <h1 className="mb-6 px-3 text-2xl">{data.findById.name}</h1>
        <Image
          width={80}
          height={50}
          layout="responsive"
          objectFit="cover"
          src={`/${data.findById.imageUrl}`}
          alt={data.findById.name}
        />
        <div className="mt-6 px-3">
          <p>{data.findById.status}</p>
          <p>
            {format(new Date(data.findById.startDate), 'yyyy/MM/dd')}〜
            {format(new Date(data.findById.endDate), 'yyyy/MM/dd')}
          </p>
          <p>Vendors:</p>
        </div>
      </div>
    </Layout>
  )
}

export default ItemDetail
