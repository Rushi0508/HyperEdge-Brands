import React from 'react'

function Collaborations({user}:any) {
    return (
        <>
            <div>
                <p className='text-xl font-semibold'>Collaborations</p>
                {user.collaborations? 
                    "Hello": 
                    <p className='text-gray-400'>No Collaborations yet.</p>
                }
            </div>
        </>
    )
}

export default Collaborations