import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { GoKebabHorizontal } from 'react-icons/go'
import Link from 'next/link'
import { Dialog } from '@radix-ui/react-dialog'
import InviteModel from './InviteModel'

function CreatorBox({ creator }: any) {
    const [openInvite, setOpenInvite] = useState(false)
    return (
        <>
            <div className='flex items-center border-b-[1px] px-4 py-4 rounded-lg hover:bg-gray-50 gap-2'>
                <div className='w-[35%] flex items-center gap-10'>
                    <div>
                        <Avatar className="w-14 h-14">
                            <AvatarImage className='object-cover overflow-visible' src={creator?.avatar} />
                            <AvatarFallback>{creator.fullName?.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p className='text-lg font-semibold flex items-center gap-1'>
                            {creator.fullName} {creator.emailVerified && <MdOutlineVerifiedUser />}
                            <span className='text-sm bg-black text-white rounded-sm px-1 py-[0.8]'>{creator.ratings ? creator?.ratings?.toFixed(1) : 0}⭐ </span>
                        </p>
                        <p className='text-sm'>{creator.title}</p>
                    </div>
                </div>
                <div className='w-[35%] flex flex-wrap gap-1'>
                    {
                        creator?.categories?.map((c: any, i: any) => (
                            <>
                                <Badge key={i} variant={'outline'}>{c}</Badge>
                            </>
                        ))
                    }
                </div>
                <div className='w-[25%]'>
                    {creator.charges && <p>$ {creator.charges}/{(creator.unit)?.slice(4)}</p>}
                </div>
                <div className='w-[5%]'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <GoKebabHorizontal className='cursor-pointer' size={22} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href={`/creator/${creator.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenInvite(true)}>
                                Invite
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Dialog open={openInvite} onOpenChange={() => setOpenInvite(!openInvite)}>
                    <InviteModel setOpenInvite={setOpenInvite} creatorId={creator.id} />
                </Dialog>
            </div>
        </>
    )
}

export default CreatorBox