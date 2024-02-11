import React from 'react'
import Navbar from '../components/Navbar'

function layout({children}: {children: React.ReactNode}) {
  return (
    <>
        <Navbar/>
        <div className='py-8 px-16'>
            {children}
        </div>
    </>
  )
}

export default layout