"use client"
import React, { useState } from 'react'
import ProfessionalCard from '../components/ProfessionalCard'
import PersonalCard from '../components/PersonalCard'

function page() {
    const [visible, setVisible] = useState("1");   
  return (
    <>
        {
            visible == "1" && <PersonalCard setVisible={setVisible}/>
        }
        {
            visible == "2" && <ProfessionalCard setVisible={setVisible}/>
        }
    </>
  )
}

export default page