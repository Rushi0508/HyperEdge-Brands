import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <>
      <div className="flex items-center space-x-4 my-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <div className="flex items-center space-x-4 my-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <div className="flex items-center space-x-4 my-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <div className="flex items-center space-x-4 my-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </>
  )
}

export default Loading