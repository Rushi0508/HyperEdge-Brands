import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import {MdOutlineVerifiedUser} from 'react-icons/md'
import {GoKebabHorizontal} from 'react-icons/go'
import Link from 'next/link'

function CreatorBox({creator}:any) {
  return (
    <>
        <div className='flex justify-between items-center border-b-[1px] px-4 py-4 rounded-lg hover:bg-gray-50'>
            <div className='flex items-center gap-20'>
                <div>
                    <Avatar className="w-14 h-14">
                        <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>   
                    <p className='text-lg font-semibold flex items-center gap-1'>{creator.fullName} {creator.emailVerified && <MdOutlineVerifiedUser/>}</p>
                    <p className='text-sm'>{creator.title}</p>
                </div>
            </div>
            <div>
                {
                    creator?.categories?.map((c:any,i:any)=>(
                        <Badge key={i} variant={'outline'}>{c}</Badge>
                    ))
                }
            </div>
            <div>
                {creator.charges && <p>$ {creator.charges}/{(creator.unit)?.slice(4)}</p>}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <GoKebabHorizontal className='cursor-pointer' size={22}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={`/creator/${creator.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Invite</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </>
  )
}

export default CreatorBox