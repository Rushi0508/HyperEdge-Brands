import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

type optionProps = {
    value: number | string,
    label: string,
}

function PersonalCard({setVisible}:any) {
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [countryOptions, setCountryOptions] = useState<optionProps[]>()
    const [stateOptions, setStateOptions] = useState<optionProps[]>()
    const [cityOptions, setCityOptions] = useState<optionProps[]>()

    useEffect(() => {
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
      }, []);  

      useEffect(() => {
        // Fetch states based on the selected country
        if (country) {
            console.log("Fetching States")
          axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
            country: country
          })
            .then(response => {
              const selectedCountryData = response.data.data.states;
              console.log(selectedCountryData)
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
              console.log(cities)
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
            <CardTitle className='text-xl'>Personal Information</CardTitle>
            <CardDescription>Fill out your basic information</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='name'>Name</Label>
                <Input/>
                </div>
                <div className='w-full'>
                <Label htmlFor='email'>Email</Label>
                <Input/>
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='username'>Username</Label>
                <Input/>
                </div>
                <div className='w-full'>
                <Label htmlFor='phone'>Contact No.</Label>
                <Input/>
                </div>
            </div>
            <div>
                <Label htmlFor='bio'>Bio</Label>
                <Textarea/>
            </div>
            <div className='flex gap-3'>
                <div className='w-full'>
                <Label htmlFor='country'>Country</Label>
                <Select options={countryOptions} isLoading={countryOptions? false:true} onChange={(e:any)=>setCountry(e.label)}/>
                </div>
                <div className='w-full'>
                <Label htmlFor='state'>State</Label>
                <Select options={stateOptions} onChange={(e:any)=>setState(e.label)}/>
                </div>
                <div className='w-full'>
                <Label htmlFor='city'>City</Label>
                <Select options={cityOptions} onChange={(e:any)=>setCity(e.label)}/>
                </div>
            </div>
            <div className='flex gap-1 justify-end'>
                <Button>Save</Button>
                <Button onClick={()=> setVisible("2")} variant={'link'}>Next</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default PersonalCard