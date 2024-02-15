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
    const fetchCollaborations = async()=>{
        const {data} = await axios.get('/api/collaborator');
        setCollaborations(data.collaborations)
    }
    useEffect(()=>{
        fetchCollaborations()
    }, [])
    if(!collaborations) return <Loading/>
  return (
    <div className='grid grid-cols-4 gap-4'>
        {
            collaborations?.map((collaboration:any)=>(
                <>
                <Card key={collaboration.id} className=''>
                    <CardHeader>
                        <CardTitle>{collaboration.campaign.name}</CardTitle>
                        <CardDescription>{timeAgo(collaboration.createdAt)}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center'>
                        <div>
                            <Image  alt='profile' width={150} height={150} className="rounded-full" src={collaboration.creator.avatar} />
                        </div>
                        <div>
                            <p className='mt-2 font-semibold text-center tracking-wider'>{collaboration.creator.fullName}</p>
                            <div className="flex">
                                <Button variant={'link'} className='px-2'>View Profile</Button>
                                <Button variant={'link'} className='px-2' asChild>
                                    <Link href={`/campaign/${collaboration.campaignId}`}>View Campaign</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </>
            ))
        }
    </div>
  )
}

export default page