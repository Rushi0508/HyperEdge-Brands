import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pencil1Icon, SewingPinIcon } from '@radix-ui/react-icons'
import React from 'react'

function Header({ user }: any) {
  return (
    <div className='border-b-[1px] border-gray-300 p-5 flex justify-between'>
      <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage className='object-cover overflow-visible' src={user?.avatar} />
          <AvatarFallback>{user?.fullName.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-3xl flex items-center gap-2">{user?.fullName} <span className='text-sm bg-black text-white rounded-sm py-1 px-2'>{user?.ratings}⭐</span></p>
          <span className="flex items-center mt-1 text-gray-500"><SewingPinIcon className='w-5 h-5' />{user?.state}, {user?.country}</span>
        </div>
      </div>
      <div>
        <div className='mt-4 flex justify-center items-center gap-2'>
          <p className='text-sm text-gray-500'>Available {
            user?.availability ?
              <span className='bg-green-500 px-2 text-white rounded-full'>YES</span> :
              <span className='bg-red-500 px-2 text-white rounded-full'>NO</span>
          }</p>
        </div>
      </div>
    </div>
  )
}

export default Header