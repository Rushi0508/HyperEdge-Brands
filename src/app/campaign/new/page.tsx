"use client"
import { DatePicker } from '@/app/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select as Sel, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import Select from 'react-select'
import { getAllCategories } from '@/app/actions/getAllCategories';

function page() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState("")
  const [pub, setPublic] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [categoryOptions, setCategoryOptions] = useState<any>(null)
  let [category, setCategory] = useState<any>([])

  const onSubmit = async (body: any) => {
    if (!startDate || !endDate || !type) {
      return toast.error('Fill out all details')
    }
    if ((startDate > endDate) || (startDate < Date.now()) || (endDate < Date.now())) {
      return toast.error('Select valid date range')
    }
    let feesFrom = body.feesFrom;
    let feesTo = body.feesTo;
    if (isNaN(feesFrom) || isNaN(feesTo)) {
      return toast.error('Enter valid fees')
    }
    if (parseInt(feesFrom) > parseInt(feesTo)) {
      return toast.error('Enter valid fees range')
    }
    body.type = type;
    body.startDate = startDate;
    body.endDate = endDate;
    body.status = "PLANNED";
    body.visibility = pub ? "PUBLIC" : "PRIVATE"
    if (category) category = category?.map((obj: any) => obj.label)
    body.targetCategory = category
    console.log(body)
    try {
      setIsLoading(true)
      const { data } = await axios.post('/api/campaign', body);
      if (data.hasOwnProperty('success')) {
        toast.success("Campaign Created")
        router.push(`/campaign/${data.campaign.id}`)
      }
      else {
        return toast.error("Something went wrong. Try Again")
      }
    } catch (error) {
      return toast.error("Something went wrong. Try Again")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryChange = async (selectedOptions: any) => {
    setCategory(selectedOptions)
  }

  useEffect(() => {
    const fetchData = async () => {
      setCategoryOptions(await getAllCategories())
    }
    fetchData()
  }, [])

  return (
    <div>
      <Card aria-disabled={isLoading} className='w-4/6 m-auto'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input disabled={isLoading} id='name' {...register('name', {
                required: true
              })} />
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
              })} />
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
                <DatePicker disabled={isLoading} date={startDate} setDate={setStartDate} />
              </div>
              <div className='w-full'>
                <Label>End Date</Label><br />
                <DatePicker disabled={isLoading} date={endDate} setDate={setEndDate} />
              </div>
            </div>
            <div>
              <Label htmlFor='category'>Target Category</Label>
              <Select value={category} isDisabled={isLoading} options={categoryOptions} isLoading={categoryOptions ? false : true} onChange={handleCategoryChange} isMulti isSearchable />
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
                <Sel disabled={isLoading} onValueChange={(e) => setType(e)}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={`${type ? type : "Sel type"}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PER_POST">PER POST</SelectItem>
                    <SelectItem value="PER_VIDEO">PER VIDEO</SelectItem>
                    <SelectItem value="PER_DAY">PER DAY</SelectItem>
                    <SelectItem value="PER_HOUR">PER HOUR</SelectItem>
                  </SelectContent>
                </Sel>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Label>Public:</Label>
              <Switch disabled={isLoading} onClick={() => setPublic(!pub)} checked={pub} />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex gap-2 justify-end'>
          <Button disabled={isLoading} variant={'outline'} onClick={() => router.push('/')}>Cancel</Button>
          <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page