"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import NotFound from '@/app/not-found'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'
import { timeAgo } from '@/app/actions/timeAgo'
import { MdOutlineCategory } from 'react-icons/md'
import ProposalSheet from './ProposalSheet'
import PaymentModal from './PaymentModal'

function page({ params }: { params: { id: string } }) {
    const [dataLoading, setDataLoading] = useState(true)
    const [paymentModal, setPaymentModal] = useState(false);
    const [creatorId, setCreatorId] = useState<any>(null);
    const [campaign, setCampaign] = useState<any>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [creatorData, setCreatorData] = useState<any>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsLoading(true)
        const { data } = await axios.delete(`/api/campaign/${campaign.id}?q=${campaign.id}`)
        if (data.hasOwnProperty('success')) {
            toast.success('Campaign deleted')
            router.push('/campaign')
        } else {
            return toast.error('Something went wrong.')
        }
        setIsLoading(false)
    }

    const handleRemove = async (creatorId: any) => {
        const parent = document.getElementsByClassName(`${creatorId}`)
        console.log(parent)
        const reload = parent[0]?.getElementsByClassName('reload-icon')
        const remove = parent[0]?.getElementsByClassName('remove-icon')
        console.log(reload)
        if (reload) reload[0]?.classList.remove('hidden')
        if (remove) remove[0]?.classList.add('hidden')

        const { data } = await axios.post('/api/collaborator', { campaignId: params.id, creatorId: creatorId })
        if (data.hasOwnProperty('success')) {
            fetchCampaign();
            toast.success('Creator removed successfully')
        }
    }

    const fetchCampaign = async () => {
        const { data } = await axios.post(`/api/campaign/${params.id}`, { id: params.id });
        if (data.hasOwnProperty('success') && data.campaign) {
            setCampaign(data.campaign)
            const resultArray = []
            for (const collaboration of data.campaign.Collaboration) {
                const collaborator = data.campaign.collaborators?.find((c: any) => c.id === collaboration.creatorId);
                if (collaborator) {
                    const result = {
                        creatorId: collaboration.creatorId,
                        fullName: collaborator.fullName,
                        avatar: collaborator.avatar,
                        status: collaboration.status,
                        payment: collaboration.paymentId ? true : false
                    };
                    resultArray.push(result)
                }
            }
            setCreatorData(resultArray)
            setDataLoading(false)
        } else {
            setCampaign("")
        }
    }
    useEffect(() => {
        fetchCampaign()
    }, [])
    if (campaign == "") return <NotFound />
    else if (dataLoading) return <Loading />
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
                <div className="px-2 py-6 flex flex-col gap-2">
                    <span>Target Categories:</span>
                    <div className='flex gap-2'>
                        {
                            campaign?.targetCategory.length > 0 ?
                                campaign?.targetCategory.map((c: string) => (
                                    <span className="text-black text-sm bg-gray-100 rounded-full px-3 py-1">{c}</span>
                                )) :
                                <span>All</span>
                        }
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
                        <Link onClick={() => localStorage.setItem('campaign', JSON.stringify(campaign))} href={`/campaign/${campaign.id}/update`} >
                            <Button variant={`ghost`} className='flex gap-2'>
                                <AiOutlineEdit className='w-5 h-5' />
                                Edit
                            </Button>
                        </Link>
                    </div>
                    <AlertDialog open={openDeleteDialog}>
                        <AlertDialogTrigger>
                            <div className='flex'>
                                <Button onClick={() => setOpenDeleteDialog(true)} className='flex gap-2'>
                                    <AiOutlineDelete className='w-5 h-5' />
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
                                <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
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
                            creatorData?.length ?
                                (creatorData).map((creator: any) => (
                                    <div key={creator.creatorId} className={`${creator.creatorId} border-b-[1px] hover:bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-between`}>
                                        <div className='flex items-center gap-4'>
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage className='object-cover overflow-visible' src={creator?.avatar} />
                                                <AvatarFallback>{creator.fullName.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link className='hover:underline' href={`/creator/${creator.creatorId}`}>{creator.fullName}</Link>
                                                <p className='text-xs text-gray-500 italic'>({creator.status})
                                                    {creator.payment ?
                                                        <span className='mx-1 text-black'>Payment ✅</span>
                                                        :
                                                        creator.status === "APPROVED" && <span onClick={() => {
                                                            setPaymentModal(true);
                                                            setCreatorId(creator.creatorId);
                                                        }} className='cursor-pointer mx-1 text-yellow-600 hover:underline' >Make payment</span>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <ReloadIcon className="hidden reload-icon mr-2 h-4 w-4 animate-spin" />
                                        <IoIosRemoveCircleOutline onClick={() => handleRemove(creator.creatorId)} className='remove-icon cursor-pointer text-red-500 w-6 h-6' />
                                    </div>
                                ))
                                :
                                <p className='text-gray-400 tracking-wider'>No collaborators</p>
                        }

                    </div>
                </div>
                <div>
                    <Button onClick={() => setSheetOpen(true)} size={"sm"}>View Proposals</Button>
                </div>
            </div>
            <PaymentModal fetchCampaign={fetchCampaign} campaignId={campaign.id} creatorId={creatorId} setPaymentModal={setPaymentModal} paymentModal={paymentModal} />
            <ProposalSheet campaign={campaign} setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />
        </div>
    )
}

export default page