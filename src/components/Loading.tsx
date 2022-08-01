import { Loader } from '@mantine/core'
import { FC } from 'react'

export const Loading: FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader color="white" size="md" />
    </div>
  )
}
