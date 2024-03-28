import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

function ChatHeader({ chat }: any) {
    return (
        <>
            <div className='bg-white px-4 w-full items-center border-b-[1px] flex gap-4 sticky top-[65px] h-16'>
                <Avatar>
                    <AvatarImage src={chat.creator.avatar} className='overflow-visible object-cover' />
                    <AvatarFallback>{chat.creator.fullName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className='text-sm'>{chat.creator.fullName}</p>
                </div>
            </div>
        </>
    )
}

export default ChatHeader
