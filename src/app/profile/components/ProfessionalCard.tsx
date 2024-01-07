"use client"
import { getAllCategories } from '@/app/actions/getAllCategories'
import { getAllLanguages } from '@/app/actions/getAllLanguages'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

type optionProps = {
    value: number | string,
    label: string,
    subLabels?: string[]
}

function ProfessionalCard({setVisible}:any) {
    const [category, setCategory] = useState<optionProps[]>();
    const [subCategory, setSubCategory] = useState<optionProps[]>();
    const [languages, setLanguages] = useState<optionProps[]>()
    const [subCategoryOptions, setSubCategoryOptions] = useState<optionProps[]>()
    const [languageOptions, setLanguageOptions] = useState<optionProps[]>()
    const [categoryOptions, setCategoryOptions] = useState<optionProps[]>()
    const fetchData = async()=>{
        setCategoryOptions(await getAllCategories())
        setLanguageOptions(await getAllLanguages())
    }
    useEffect(()=>{
        fetchData();
        console.log(categoryOptions)
    }, [])
    const fetchSubCategory = async ()=>{
        const subCat = await category?.map((item:any)=>item.subLabels).flat();
        setSubCategoryOptions(subCat?.map((item:any,i:any)=>({
            value: i,
            label: item
        })))
    }
    const handleCategoryChange = async (selectedOptions:any)=>{
        setCategory(selectedOptions)
    }
    const handleSubCategoryChange = async (selectedOptions:any)=>{
        setSubCategory(selectedOptions)
    }
  return (
    <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Professional Information</CardTitle>
                <CardDescription>Fill out your work information</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <div className=''>
                    <div className='w-full'>
                    <Label htmlFor='title'>Title <span className='text-gray-500'>(Enter a single sentence description of your professional skills/experience)</span></Label>
                    <Input/>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='w-full'>
                    <Label htmlFor='category'>Content Category</Label>
                    <Select options={categoryOptions} isLoading={categoryOptions? false:true} onChange={handleCategoryChange} isMulti isSearchable/>
                    </div>
                </div>
                <div>
                    <div className='w-full'>
                    <Label htmlFor='category'>Sub Category</Label>
                    <Select onMenuOpen={fetchSubCategory} options={subCategoryOptions} onChange={handleSubCategoryChange} isMulti isSearchable/>
                    </div>
                </div>
                <div>
                    <div className='w-full'>
                    <Label htmlFor='languages'>Languages Spoken</Label>
                    <Select options={languageOptions} onChange={(lang:any)=>setLanguages(lang)} isLoading={languageOptions? false:true} isMulti/>
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

export default ProfessionalCard