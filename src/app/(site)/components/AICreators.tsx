import React from 'react'

function AICreators({ creators }: any) {
    return (
        <div className='my-4'>
            <p className='animate-bounce text-center mt-4 text-green-600'>AI Recommendation is coming soon. Here is demo data of model trained on top creators.</p>
            {
                creators.map((c: any) => (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{c?.influencer}</h2>
                        <p className="text-gray-600 mb-2">Country: {c?.Country}</p>
                        <p className="text-gray-600 mb-2">Engagement Avg: {c?.EngAvg}</p>
                        <p className="text-gray-600 mb-2">Estimated Pay: {c?.Est_Pay}</p>
                        <p className="text-gray-600 mb-2">Followers: {c?.Followers}</p>
                        <div className="flex justify-between">
                            <p className="text-gray-600 mb-2">Category: {c?.catagory}</p>
                            {c?.catagoryExtra && <p className="text-gray-600 mb-2">Extra Category: {c?.catagoryExtra}</p>}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AICreators
