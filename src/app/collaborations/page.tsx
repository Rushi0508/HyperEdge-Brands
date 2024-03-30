'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { timeAgo } from '../actions/timeAgo'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Loading from './loading'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Rating } from 'react-simple-star-rating'
import toast from 'react-hot-toast'
import { ReloadIcon } from '@radix-ui/react-icons'
function page() {
    const [collaborations, setCollaborations] = useState<any>(null)
    const [dialog, setDialog] = useState(false)
    const [ratingInfo, setRatingInfo] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const fetchCollaborations = async () => {
        const { data } = await axios.get('/api/collaborator');
        setCollaborations(data.collaborations)
    }
    const handleRating = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/rating', ratingInfo);
            if (data.hasOwnProperty('success')) {
                toast.success('Rating submitted successfully')
                setDialog(false)
                fetchCollaborations();
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
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
                                            <CardDescription className='flex items-center justify-between'>
                                                <span>{timeAgo(collaboration.createdAt)}</span>
                                                {collaboration.paymentId && <span>PAYMENT✅</span>}
                                            </CardDescription>
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
                                                {
                                                    collaboration.rating ?
                                                        <div className='text-gray-500 text-center text-sm'>
                                                            You have rated <span className='bg-black text-white rounded-sm py-[0.8] px-1'>{collaboration.rating}⭐</span>
                                                        </div> :
                                                        <div onClick={() => {
                                                            setDialog(true)
                                                            setRatingInfo(collaboration)
                                                        }} className='text-gray-500 text-center text-sm hover:underline cursor-pointer'>
                                                            Rate your experience
                                                        </div>
                                                }
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
            <Dialog open={dialog} onOpenChange={() => setDialog(false)} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='tracking-wide'>Give Ratings to {ratingInfo?.creator.fullName}</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col h-auto'>
                        <Rating
                            SVGclassName='inline-block'
                            onClick={(rate) => setRatingInfo({ ...ratingInfo, rating: rate })}
                        />
                    </div>
                    <DialogFooter>
                        <Button size={"sm"} onClick={handleRating}>
                            {
                                loading && <ReloadIcon className='animate-spin mr-1' />
                            }
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default page