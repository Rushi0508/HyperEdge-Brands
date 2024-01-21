import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Pencil1Icon, SewingPinIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Header({user}:any) {
  return (
    <div className='border-b-[1px] border-gray-300 p-5 flex justify-between'>
    <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
        <p className="font-semibold text-3xl">{user?.name}</p>
        <span className="flex items-center mt-1 text-gray-500"><SewingPinIcon className='w-5 h-5'/>{user?.state}, {user?.country}</span>
        </div>
    </div>
    <div>
        <Link href={'/profile/settings'}>
          <Button className="flex items-center gap-2"><Pencil1Icon className="px-0 w-5 h-5"/>Edit Profile</Button>
        </Link>
    </div>
    </div>
  )
}

export default Header