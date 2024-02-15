import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col space-y-3 items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <div className="space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
        </div>
        <div className="flex flex-col space-y-3 items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <div className="space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
        </div>
        <div className="flex flex-col space-y-3 items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <div className="space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
        </div>
    </div>
  )
}

export default Loading