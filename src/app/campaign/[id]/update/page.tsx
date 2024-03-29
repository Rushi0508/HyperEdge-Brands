"use client"
import { DatePicker } from '@/app/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

function page() {
  const {
    register,setValue, handleSubmit, formState: {errors}
  } = useForm();

  const router = useRouter()

  const [campaign, setCampaign] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState("")
  const [pub, setPublic] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const onSubmit = async(body:any)=>{
    if(!startDate || !endDate || !type){
      return toast.error('Fill out all details')
    }
    if((startDate > endDate) || (startDate < Date.now()) || (endDate < Date.now())){
      return toast.error('Select valid date range')
    }
    let feesFrom = body.feesFrom;
    let feesTo = body.feesTo;
    if(isNaN(feesFrom) || isNaN(feesTo)){
      return toast.error('Enter valid fees')
    }
    if(parseInt(feesFrom) > parseInt(feesTo)){
      return toast.error('Enter valid fees range')
    }
    body.type = type;
    body.startDate = startDate;
    body.endDate = endDate;
    body.status = "PLANNED";
    body.visibility = pub?"PUBLIC":"PRIVATE"
    try{
      setIsLoading(true)
      const {data} = await axios.put(`/api/campaign/${campaign.id}?q=${campaign.id}`, body);
      if(data.hasOwnProperty('success')){
        toast.success("Campaign Updated")
        localStorage.removeItem('campaign')
        router.push(`/campaign/${data.campaign.id}`)
      }
      else{
        return toast.error("Something went wrong. Try Again")
      }
    }catch(error){
      return toast.error("Something went wrong. Try Again")
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    async function getCampaign(){
        const campaign:any = await JSON.parse(localStorage.getItem('campaign')!)
        setCampaign(campaign)
        setValue('name', campaign?.name)
        setValue('description', campaign?.description)
        setStartDate(campaign.startDate)
        setEndDate(campaign.endDate)
        setType(campaign.type)
        setValue('feesFrom', campaign.feesFrom)
        setValue('feesTo', campaign.feesTo)
        campaign.visibility === 'PUBLIC'? setPublic(true): setPublic(false)
    }
    getCampaign()
  }, [])

  return (
    <div>
      <Card aria-disabled={isLoading} className='w-4/6 m-auto'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>Update Campaign Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input disabled={isLoading} id='name' {...register('name', {
                required:true
              })}/>
              {errors.name && errors.name.type === "required" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">Name is required.</p>
              )}
            </div>
            <div>
              <Label htmlFor='des'>Description</Label>
              <Textarea disabled={isLoading} id='des' {...register('description', {
                required: true,
                minLength: 100,
                maxLength: 1000
              })}/>
              {errors.description && errors.description.type === "required" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">Description is required.</p>
              )}
              {errors.description && errors.description.type === "minLength" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">Min. length should be 100 characters.</p>
              )}
              {errors.description && errors.description.type === "maxLength" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">Max. length should be 1000 characters.</p>
              )}
            </div>
            <div className='flex gap-2'>
              <div className='w-full'>
                <Label>Start Date</Label><br />
                <DatePicker disabled={isLoading} date={startDate} setDate={setStartDate}/>
              </div>
              <div className='w-full'>
                <Label>End Date</Label><br />
                <DatePicker disabled={isLoading} date={endDate} setDate={setEndDate}/>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='w-1/2'>
                <Label htmlFor='fees'>Fees Range ($)</Label>
                <div className='flex items-center gap-2'>
                  <Input disabled={isLoading} id='fees' {...register('feesFrom', {
                    required: true,
                  })} /> 
                  - 
                  <Input disabled={isLoading} {...register('feesTo', {
                    required: true,
                  })} /> 
                </div>
              </div>
              <div className='w-1/2'>
                <Label>Payment Type</Label>
                <Select disabled={isLoading} onValueChange={(e)=>setType(e)}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={`${type? type:"Select type" }`}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PER_POST">PER POST</SelectItem>
                        <SelectItem value="PER_VIDEO">PER VIDEO</SelectItem>
                        <SelectItem value="PER_DAY">PER DAY</SelectItem>
                        <SelectItem value="PER_HOUR">PER HOUR</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Label>Public:</Label> 
              <Switch disabled={isLoading} onClick={()=>setPublic(!pub)} checked={pub}/>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex gap-2 justify-end'>
          <Button disabled={isLoading} variant={'outline'} onClick={()=>router.back()}>Cancel</Button>
          <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page