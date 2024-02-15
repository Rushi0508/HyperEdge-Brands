import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pencil1Icon, SewingPinIcon } from '@radix-ui/react-icons'
import React from 'react'

function Header({user}:any) {
  return (
    <div className='border-b-[1px] border-gray-300 p-5 flex justify-between'>
    <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
        <p className="font-semibold text-3xl">{user?.fullName}</p>
        <span className="flex items-center mt-1 text-gray-500"><SewingPinIcon className='w-5 h-5'/>{user?.state}, {user?.country}</span>
        </div>
    </div>
    <div>
        <div className='mt-4 flex justify-center items-center gap-2'>
          <p className='text-sm text-gray-500'>Available {
            user?.availability? 
            <span className='bg-green-500 px-2 text-white rounded-full'>YES</span>:
            <span className='bg-red-500 px-2 text-white rounded-full'>NO</span>
          }</p>
        </div>
    </div>
    </div>
  )
}

export default Header