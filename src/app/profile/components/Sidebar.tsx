import { InstagramLogoIcon, PlayIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

function Sidebar({user}:any) {
  return (
    <div className='px-10 py-5'>
        <div>
            <p><span className='font-semibold'>Email:</span> <span className='text-gray-500'>{user?.email}</span></p>
        </div>
        <div className='mt-4'>
            <p><span className='font-semibold'>Repr. Name:</span> <span className='text-gray-500'>{user?.personName}</span></p>
        <div className='mt-4'>
            {/* <p><span className='font-semibold'>City:</span> <span className='text-gray-500'>{user.city}</span></p> */}
        </div>
        </div>
    </div>
  )
}

export default Sidebar