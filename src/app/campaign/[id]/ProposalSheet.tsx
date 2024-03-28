import { timeAgo } from "@/app/actions/timeAgo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from "date-fns"
import Link from "next/link"
import { BsCalendarDate } from 'react-icons/bs'
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "./loading"
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast"
import { ReloadIcon } from "@radix-ui/react-icons"

function ProposalSheet({ campaign, setCampaign, setSheetOpen, sheetOpen }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true);
    const [proposals, setProposals] = useState<any>(null)

    const fetchProposals = async () => {
        try {
            const { data } = await axios.post('/api/get-proposals', { campaignId: campaign?.id });
            if (data.hasOwnProperty('proposals')) {
                setProposals(data.proposals);
            } else {
                toast.error('Something went wrong')
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setPageLoading(false)
        }

    }

    const handleProposal = async (status: string, id: string) => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/handle-proposal', {
                proposalId: id,
                status: status
            })
            if (data.hasOwnProperty('success')) {
                toast.success("Proposal " + status);
                fetchProposals()
            } else {
                toast.error("Something went wrong");
            }
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProposals()
    }, [])
    return (
        <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(false)}>
            <SheetContent side={"left"} className="sm:max-w-[1000px] overflow-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Proposals</SheetTitle>
                    <SheetDescription className="text-base"> <span className="font-bold text-black">Campaign: </span>{(campaign?.name)}</SheetDescription>
                </SheetHeader>
                <div className='mt-5'>
                    {
                        pageLoading ? <Loading /> :
                            proposals && proposals.length > 0 ?
                                <Accordion type='single' collapsible className='w-full'>
                                    {
                                        proposals.map((proposal: any, index: any) => (
                                            <>
                                                <AccordionItem value={proposal.id} className='px-4 rounded-md hover:bg-gray-100'>
                                                    <AccordionTrigger className='flex items-center'>
                                                        <div className='flex items-center gap-8'>
                                                            <div className="flex items-center gap-4">
                                                                <Avatar>
                                                                    <AvatarImage className="object-cover overflow-visible" src={proposal.creator.avatar} />
                                                                    <AvatarFallback>{proposal.creator.fullName.substring(0, 1)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <Link href={`/creator/${proposal.creator.id}`} className='text-lg'>{proposal.creator.fullName}</Link>
                                                                    <p className="text-xs text-gray-500">Posted {timeAgo(proposal.createdAt)}</p>
                                                                </div>
                                                            </div>
                                                            <span className={`${proposal.status == "PENDING" ? "bg-yellow-200" : proposal.status == "ACCEPTED" ? "bg-green-200" : "bg-red-200"} py-1 px-3 rounded-md flex gap-1 items-center text-xs`}>
                                                                {proposal.status === "PENDING" && <FaClockRotateLeft size={12} />}
                                                                {proposal.status === "ACCEPTED" && <MdDownloadDone size={12} />}
                                                                {proposal.status === "DECLINED" && <MdOutlineCancel size={12} />}
                                                                {proposal.status}
                                                            </span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className='text-base'>
                                                        <p className='mb-2'><span className='font-semibold'>Proposed Rate:</span> $ {proposal.proposedRate}</p>
                                                        {proposal.message}
                                                        {
                                                            proposal.status == "PENDING" ?
                                                                <div className='grid grid-cols-6 gap-4 mt-4'>
                                                                    <button disabled={isLoading} onClick={() => handleProposal("ACCEPTED", proposal.id)} className="cursor-pointer flex justify-center items-center gap-1 focus:bg-green-500 focus:text-white outline-none bg-transparent text-sm hover:bg-green-500 text-green-700  hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
                                                                        Accept
                                                                    </button>
                                                                    <button disabled={isLoading} onClick={() => handleProposal("DECLINED", proposal.id)} className="cursor-pointer flex justify-center items-center gap-1 focus:bg-red-500 focus:text-white outline-none bg-transparent text-sm hover:bg-red-500 text-red-700  hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
                                                                        Decline
                                                                    </button>
                                                                </div>
                                                                :
                                                                <p className={`${proposal.status == "ACCEPTED" ? "bg-green-500" : "bg-red-500"} px-4 py-2 mt-4 rounded-md text-white`}>You have {proposal.status} this proposal</p>
                                                        }
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </>
                                        ))
                                    }
                                </Accordion>
                                :
                                <p className='text-center text-base text-gray-600 tracking-wider'>
                                    No Proposals found.
                                </p>
                    }
                </div>
            </SheetContent>
        </Sheet >
    )
}

export default ProposalSheet