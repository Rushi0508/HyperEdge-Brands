"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import NotFound from '@/app/not-found'
import {format} from 'date-fns'
import { Button } from '@/components/ui/button'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

function page({params}: {params: {id: string}}) {
    const [dataLoading, setDataLoading] = useState(true)
    const [campaign, setCampaign] = useState<any>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    function timeAgo(date:any) {
        const now:any = new Date();
        const timestamp:any = new Date(date);
        const seconds = Math.floor((now - timestamp) / 1000);
      
        let interval = Math.floor(seconds / 31536000);
      
        if (interval > 1) {
          return `${interval} years ago`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return `${interval} months ago`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return `${interval} days ago`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return `${interval} hours ago`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return `${interval} minutes ago`;
        }
        return `${Math.floor(seconds)} seconds ago`;
    }

    const handleDelete = async()=>{
        setIsLoading(true)
        const {data} = await axios.delete(`/api/campaign/${campaign.id}?q=${campaign.id}`)
        if(data.hasOwnProperty('success')){
            toast.success('Campaign deleted')
            router.push('/')
        }else{
            return toast.error('Something went wrong.')
        }
        setIsLoading(false)
    }
    const fetchCampaign = async()=>{
        const {data} = await axios.post(`/api/campaign/${params.id}`, {id: params.id});
        if(data.hasOwnProperty('success') && data.campaign){
            setCampaign(data.campaign)
            setDataLoading(false)
        }else{
            setCampaign("")
        }
    }
    useEffect(()=>{
        fetchCampaign()
    }, [])
    if(campaign == "") return <NotFound/>
    else if(dataLoading) return <Loading/>
  return (
    <div className='px-10 flex'>
        <div className='w-4/6 border-r-[1px] border-gray-300 pr-4'>
            <div className='py-4 px-2'>
                <p className='text-2xl tracking-wide font-semibold'>{campaign?.name}</p>
                <p className='text-sm text-gray-500 mt-1'>Posted {timeAgo(campaign.createdAt)}</p>
            </div>
            <hr />
            <p className='py-6 tracking-wide px-2'>{campaign?.description}</p><hr />
            <div className='py-6 px-2'>
                <div className='flex gap-8 items-center'>
                    <div className='flex flex-col items-start gap-1'>
                        <p className='font-semibold'>Start Date:</p><span>{campaign && format(campaign?.startDate, 'PPP')}</span>
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <p className='font-semibold'>End Date:</p><span>{campaign && format(campaign?.endDate, 'PPP')}</span>
                    </div>
                </div>
            </div><hr />
            <div className='py-6 px-2 flex flex-col gap-2'>
                <p>Fees Range</p>
                <div className='flex gap-2 text-lg'>
                    <p className='font-semibold'>${campaign?.feesFrom} - ${campaign?.feesTo}</p> / <p className='font-semibold'>{campaign?.type.slice(4)}</p>
                </div>
            </div><hr />
            <div className='py-4 px-2 flex gap-8 items-center'>
                <div className='flex items-baseline gap-2'>
                    <p>Current Status:</p>
                    <p className='text-lg font-semibold'>{campaign?.status}</p>
                </div>
                <div className='flex items-baseline gap-2'>
                    <p className='tracking-wide'>Visibility: </p>
                    <p className='text-lg font-semibold'>{campaign?.visibility}</p>
                </div>
            </div>
        </div>
        <div className='w-2/6 px-8'>
            <div className='py-4 flex gap-4'>
                <div className='flex'>
                    <Link onClick={()=>localStorage.setItem('campaign', JSON.stringify(campaign))} href={`/campaign/${campaign.id}/update`} >
                        <Button variant={`ghost`} className='flex gap-2'>
                            <AiOutlineEdit className='w-5 h-5'/>
                            Edit
                        </Button>
                    </Link>
                </div>
                <AlertDialog open={openDeleteDialog}>
                    <AlertDialogTrigger>
                        <div className='flex'>
                            <Button onClick={()=>setOpenDeleteDialog(true)} className='flex gap-2'>
                                <AiOutlineDelete className='w-5 h-5'/>
                                Delete
                            </Button>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will delete the campaign along with all the collaborations associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={()=>setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className='py-4'>
                <p className='text-lg tracking-wider font-semibold'>Collaborators</p>
                <div className='flex flex-col gap-1 mt-2'>
                    {
                        campaign?.collaborators?.length ?
                        (campaign?.collaborators).map((creator:any)=>(
                            <div key={creator.id} className='bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link className='hover:underline' href={`/creator/${creator.id}`}>{creator.fullName}</Link>
                                    </div>
                                </div>
                                <IoIosRemoveCircleOutline className='cursor-pointer text-red-500 w-6 h-6'/>
                            </div>
                        ))
                        :
                        <p className='text-gray-400 tracking-wider'>No collaborators</p>
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default page