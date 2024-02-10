import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function InviteModel({creatorId,setOpenInvite}:any) {
    const [campaigns, setCampaigns] = useState<any>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [selectedCampaigns, setSelectedCampaigns] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        async function fetchCampaigns(){
            try{
                const {data} = await axios.get('/api/campaign');
                if(data.hasOwnProperty('success')){
                    setCampaigns(data.campaigns);
                }else{
                    toast.error("Cannot fetch campaigns")
                }
            }catch(e){
                toast.error("Cannot fetch campaigns")
            }finally{
                setDataLoading(false)
            }
        }
        fetchCampaigns()
    }, [])

    const handleCheckChange = (e:any,cid:any)=>{
        setSelectedCampaigns((prev:any)=>{
            if(e) return [...prev,cid]
            else{
                return prev.filter((item:any) => item !== cid);
            }
        })
    }

    const handleInvite = async()=>{
        try{
            setIsLoading(true);
            if(selectedCampaigns.length===0){
                return toast.error("Select campaign to invite")
            }
            const {data} = await axios.post('/api/invite', {
                creatorId: creatorId,campaignIds: selectedCampaigns
            })
            if(data.hasOwnProperty('success')){
                toast.success("Creator invited")
            }else{
                toast.error("Cannot invite")
            }
            setOpenInvite(false)
        }catch(e){
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Select Campaigns</DialogTitle>
            <DialogDescription>
                Choose from below campaigns to invite creator to that campaign
            </DialogDescription>
        </DialogHeader>
        {
            dataLoading? <p>Loading</p> : 
            <div>
                {
                    campaigns?.map((c:any,i:any)=>(
                        <div key={i} className="flex items-center justify-between">
                            <p className="font-semibold">{c.name}</p>
                            <Checkbox disabled={isLoading} onCheckedChange={(e)=>handleCheckChange(e,c.id)}/>
                        </div>
                    ))
                }
            </div>
        }
            
        <DialogFooter>
            <Button type="submit" onClick={handleInvite}>
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                Invite
            </Button>
        </DialogFooter>
    </DialogContent>
  )
}
