import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import Loading from '../loading'
import { useRouter } from 'next/navigation'
import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'

type optionProps = {
    value: number | string,
    label: string,
}

function BrandCard({setVisible,user,setProgress}:any) {
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [countryOptions, setCountryOptions] = useState<optionProps[]>()
    const [stateOptions, setStateOptions] = useState<optionProps[]>()
    const [cityOptions, setCityOptions] = useState<optionProps[]>()
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const {
      register,setValue, handleSubmit, formState: {errors}
    } = useForm();

    const onSubmit = async (body:any)=>{
        setIsLoading(true)
        console.log(body)
        if(country) body.country = country;
        if(state) body.state = state;
        if(city) body.city = city;
        const {data} = await axios.post('/api/profile', body);
        if(data.hasOwnProperty('errors')){
          toast.error("Data not stored. Try again")
        } 
        if(data.hasOwnProperty('success')){
          toast.success("Data Saved")
          setProgress(calculateProfileCompletion(data.user))
        }
        setIsLoading(false)
    }

    useEffect(() => {
        // // Set user data
        if(user){
          setCountry(user.country)
          setState(user.state)
          setCity(user.city)
          setValue('name', user.name)
          setValue('industry', user.industry)
          setValue('description', user.description)
          setValue('website', user.website)
        }
        // Fetch countries from REST Countries API
        axios.get('https://restcountries.com/v2/all')
          .then(response => {
            const countryNames = response.data.map((country:any )=> country.name);
            setCountryOptions(countryNames.map((country:any, index:any)=>({
                value: index,
                label: country
            })))
          })
          .catch(error => {
            console.error('Error fetching countries:', error);
          });
      }, [user]);  

      useEffect(() => {
        // Fetch states based on the selected country
        if (country) {
          axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
            country: country
          })
            .then(response => {
              const selectedCountryData = response.data.data.states;
              const states = selectedCountryData?.map((state:any) => state.name) || [];
              setStateOptions(states.map((state:any, index:any)=>({
                value: index,
                label: state
            })))
            })
            .catch(error => {
              console.error('Error fetching states:', error);
            });
        }
      }, [country]);
    
      useEffect(() => {
        // Fetch cities using a weather API (OpenWeatherMap in this example)
        if (country && state) {
          axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
            country: country,state: state
          })
            .then(response => {
              const cities = response.data.data
              setCityOptions(cities.map((city:any, index:any)=>({
                value: index,
                label: city
            })))
            })
            .catch(error => {
              console.error('Error fetching cities:', error);
            });
        }
      }, [country, state]);

  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-xl'>Brand Information</CardTitle>
            <CardDescription>Fill out the brand information</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='name'>Brand Name</Label>
                <Input disabled={isLoading} id='name' {...register('name', {
                    required: true
                })}/>
                </div>
                <div className='w-full'>
                <Label htmlFor='industry'>Industry(Sector)</Label>
                <Input disabled={isLoading} id="industry" type="text" {...register("industry")}/>
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='website'>Website</Label>
                <Input disabled={isLoading} id='website' {...register('website')} />
                </div>
            </div>
            <div>
                <Label htmlFor='des'>Description</Label>
                <Textarea disabled={isLoading} id='des' {...register('description')} />
            </div>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='country'>Country</Label>
                <Select value={{value: country, label: country}} isDisabled={isLoading} options={countryOptions} isLoading={countryOptions? false:true} onChange={(e:any)=>setCountry(e.label)}/>
                </div>
                <div className='w-full'>
                <Label htmlFor='state'>State</Label>
                <Select value={{value: state, label: state}} isDisabled={isLoading} options={stateOptions} onChange={(e:any)=>setState(e.label)}/>
                </div>
                <div className='w-full'>
                <Label htmlFor='city'>City</Label>
                <Select value={{value: city, label: city}} isDisabled={isLoading} options={cityOptions} onChange={(e:any)=>setCity(e.label)}/>
                </div>
            </div>
            <div className='flex gap-1 justify-end'>
                <Button onClick={()=>router.back()} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5'/></Button>
                  <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                      Save
                  </Button>
                <Button disabled={isLoading} onClick={()=> setVisible(("2"))} variant={'link'}>Next</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default BrandCard