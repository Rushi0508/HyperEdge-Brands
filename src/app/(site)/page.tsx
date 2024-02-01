'use client'
import { useEffect, useState } from 'react';
import CreatorBox from './components/CreatorBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';

function page() {
    const [creators, setCreators] = useState<any>(null);
    const [dataLoading,setDataLoading] = useState(true)
    useEffect(()=>{
      async function fetchCreators(){
        setDataLoading(true)
        try{
          const {data} = await axios.post('/api/creators')
          if(data.hasOwnProperty('success')){
            setCreators(data.creators)
          }else{
            toast.error("Cannot fetch creators")
          }
        }catch(e){
          toast.error("Cannot fetch creators")
        }finally{
          setDataLoading(false)
        }
      }
      fetchCreators()
    }, [])
    if(dataLoading) return <Loading/>
  return (
    <>
        {
          creators?.map((creator:any, index:any)=>(
            <CreatorBox key={index} creator={creator}/>
          ))
        }
    </>
  )
}

export default page