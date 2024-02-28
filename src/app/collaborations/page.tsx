'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { timeAgo } from '../actions/timeAgo'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Loading from './loading'

function page() {
    const [collaborations, setCollaborations] = useState<any>(null)
    const fetchCollaborations = async () => {
        const { data } = await axios.get('/api/collaborator');
        setCollaborations(data.collaborations)
    }
    useEffect(() => {
        fetchCollaborations()
    }, [])
    return (
        <>
            <p className='text-center mb-4 font-bold text-2xl'>Collaborations</p>
            {!collaborations ? <Loading /> :
                <div className='grid grid-cols-4 gap-4'>
                    {
                        collaborations && collaborations.length > 0 ?
                            collaborations?.map((collaboration: any) => (
                                <>
                                    <Card key={collaboration.id}>
                                        <CardHeader>
                                            <CardTitle>{collaboration.campaign.name}</CardTitle>
                                            <CardDescription>{timeAgo(collaboration.createdAt)}</CardDescription>
                                        </CardHeader>
                                        <CardContent className='flex flex-col items-center'>
                                            <div>
                                                <Image alt='profile' width={0} height={0} sizes='100vw' style={{ overflowClipMargin: "unset" }} className="w-[150px] h-[150px] object-cover rounded-full" src={collaboration.creator.avatar} />
                                            </div>
                                            <div>
                                                <p className='mt-2 font-semibold text-center tracking-wider'>{collaboration.creator.fullName}</p>
                                                <div className="flex">
                                                    <Button variant={'link'} className='px-2' asChild>
                                                        <Link href={`/creator/${collaboration.creatorId}`}>View Profile</Link>
                                                    </Button>
                                                    <Button variant={'link'} className='px-2' asChild>
                                                        <Link href={`/campaign/${collaboration.campaignId}`}>View Campaign</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )) :
                            <div>
                                <p className='text-xl text-center tracking-wide'>No collaborations yet</p>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default page