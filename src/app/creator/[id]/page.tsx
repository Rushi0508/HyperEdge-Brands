"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NotFound from '@/app/not-found'
import toast from 'react-hot-toast'
import Loading from './loading'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TitleBio from './components/TitleBio'
import Collaborations from './components/Collaborations'

function page({params}: {params: {id: string}}) {
    const [dataLoading, setDataLoading] = useState(true)
    const [creator, setCreator] = useState<any>(null)

    const fetchCreator = async()=>{
        try{
            const {data} = await axios.post(`/api/creators/${params.id}`, {id: params.id})
            if(data.hasOwnProperty('success') && data.creator){
                setCreator(data.creator);
            }else{
              setCreator("")
            }
        }catch(error){
            toast.error("Something went wrong");
        }finally{
            setDataLoading(false);
        }
    }

    useEffect(()=>{
        fetchCreator();
    })

    if(creator=="") return <NotFound/>
    else if(dataLoading) return <Loading/>
  return (
    <>
    <div className="border-[1px] border-gray-300 rounded-2xl">
      <Header user={creator}/>
      <div className="flex">
        <div className="w-[30%] border-r-[1px] border-gray-300">
          <Sidebar user={creator}/>
        </div>
        <div className="w-[70%]">
          <div className='py-5 px-10 border-b-[1px] border-gray-300'>
            <TitleBio user={creator}/>
          </div>
          <div className='py-5 px-10 border-b-[1px] border-gray-300'>
            <Collaborations user={creator}/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page