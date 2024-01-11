import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className='w-[80%] mx-auto'>{children}</div>
    </>
  )
}

export default layout