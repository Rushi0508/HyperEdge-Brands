import { Progress } from '@/components/ui/progress'
import React, { ReactNode } from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Progress value={50} />
    <div className='w-[80%] mx-auto mt-8'>{children}</div>
    </>
  )
}

export default layout