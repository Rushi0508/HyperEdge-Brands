"use client"
import React, { useEffect, useState } from 'react'
import ProfessionalCard from '../components/ProfessionalCard'
import PersonalCard from '../components/PersonalCard'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';

function page() {
  const [dataLoading, setDataLoading] = useState(true);
    const [visible, setVisible] = useState("1"); 
    const [user, setUser] = useState(null)
    useEffect(()=>{
      const fetchUser = async()=>{
        const {data} = await axios.get('/api/profile');
        if(data.hasOwnProperty('success') && data.user){
            setUser(data.user)
        }
        else{
          toast.error('Unable to fetech user data')
        }
      }
      fetchUser()
      setDataLoading(false)
    }, [])  

    if(dataLoading) return <Loading/>

  return (
    <>
        {
            visible == "1" && <PersonalCard setVisible={setVisible} user={user}/>
        }
        {
            visible == "2" && <ProfessionalCard setVisible={setVisible} user={user} />
        }
    </>
  )
}

export default page