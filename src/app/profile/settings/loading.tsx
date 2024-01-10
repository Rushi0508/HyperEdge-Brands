import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center">
      <div className="space-y-5 w-full">
        <Skeleton color='red' className="h-12 w-full rounded-md" />
        <Skeleton className="h-8 w-full" />
        <div className='flex gap-2'>
          <Skeleton className="h-8 w-[80%]" />
          <Skeleton className="h-8 w-[80%]" />
        </div>
        <div className='flex gap-2'>
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  )
}

export default Loading