import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import type { FindAllItemsQuery } from '../graphql/generated/graphql'
import { FC } from 'react'

type Props = {
  title: string
  viewAll: string
  data?: FindAllItemsQuery
}

export const SwipeList: FC<Props> = ({ title, viewAll, data }) => {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between px-3">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Link href={`${viewAll}`}>
          <a className=" text-gray-400">View All</a>
        </Link>
      </div>
      <div className="overflow-scroll px-3">
        <div className="flex w-max space-x-4">
          {data?.items.map((item) => (
            <div key={item.id} className="mb-5">
              {/* <Link href={`${item.id}`}> */}
              {/* <a> */}
              <div className="relative mb-2 w-[80vw]">
                <Image
                  className="object-cover"
                  width={80}
                  height={50}
                  src={`/${item.imageUrl}`}
                  alt="image"
                  layout="responsive"
                />
                <p className=" absolute top-2 left-2 inline-block rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                  {item.status}
                </p>
              </div>

              <div className="w-[calc(100%_-_80px)]">
                <p className="truncate">{item.name}</p>
                <p className="text-sm font-light">
                  {`${formatDistanceToNow(new Date(item.endDate))} left`}
                </p>
              </div>
              {/* </a> */}
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
