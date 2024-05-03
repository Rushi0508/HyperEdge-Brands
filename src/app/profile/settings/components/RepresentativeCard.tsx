"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'


function RepresentativeCard({ setVisible, user, setProgress }: any) {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register, setValue, handleSubmit, formState: { errors }
    } = useForm();

    useEffect(() => {
        if (user) {
            setValue('personName', user.personName)
            setValue('email', user.email)
            setValue('personRole', user.personRole)
            setValue('phoneNumber', user.phoneNumber)
        }
    }, [])

    const onSubmit = async (body: any) => {
        setIsLoading(true)
        console.log(body)
        try {
            const { data } = await axios.post('/api/profile', body);
            if (data.hasOwnProperty('errors')) {
                toast.error("Data not stored. Try again")
            }
            if (data.hasOwnProperty('success')) {
                toast.success("Data Saved")
                setProgress(calculateProfileCompletion(data.user))
            }
        } catch (error) {
            return toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Representative Information</CardTitle>
                <CardDescription>Fill out the representative information</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                    <div className='w-full'>
                        <Label htmlFor='personName'>Repr. Name</Label>
                        <Input disabled={isLoading} id='personName' {...register('personName', {
                            required: true
                        })} />
                        {errors.personName && errors.personName.type === "required" && (
                            <p className="mt-1 mb-0 text-red-600 text-sm">Name is required.</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <Label htmlFor='email'>Repr. Email</Label>
                        <Input disabled={true} id='title' {...register('email', {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        })} />
                        {errors.email && errors.email.type === "required" && (
                            <p className="mt-1 mb-0 text-red-600 text-sm">Email is required.</p>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <p className="mt-1 mb-0 text-red-600 text-sm">Email is invalid</p>
                        )}
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='w-full'>
                        <Label htmlFor='role'>Repr. Role</Label>
                        <Input disabled={isLoading} id='role' {...register('personRole')} />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor='email'>Repr. Contact</Label>
                        <Input disabled={isLoading} id='phone' {...register('phoneNumber', {
                            minLength: 10, maxLength: 10
                        })} />
                        {errors.phoneNumber && (errors.phoneNumber.type === "minLength" || "maxLength") && (
                            <p className="mt-1 mb-0 text-red-600 text-sm">Contact No. is not valid.</p>
                        )}
                    </div>
                </div>

                <div className='flex gap-1 justify-end'>
                    <Button onClick={() => setVisible("1")} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5' /></Button>
                    <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                    <Button disabled={isLoading} onClick={() => setVisible("2")} variant={'link'}>Next</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default RepresentativeCard