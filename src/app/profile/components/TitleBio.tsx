import React from 'react'

function TitleBio({user}:any) {
  return (
    <>
      <div>
          <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{user?.name}</p>
      </div>
      <p className='mt-2'>{user?.description}</p>
      </div>
    </>
  )
}

export default TitleBio