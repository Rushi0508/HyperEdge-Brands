'use client'
import { useSearchParams, notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios";

function page() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    const id = searchParams.get('id')
    const role = searchParams.get('role')
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("Verifying")

    const verifyUser = async()=>{
        setIsButtonLoading(true)
        const {data} = await axios.get(`/api/verify-email?token=${token}&id=${id}&role=${role}`);
        if(data.hasOwnProperty('error') || data.hasOwnProperty('message')){
            setMessage("Something went wrong. Make sure that the verification URL is correct or you are already verified.")
        }
        else if(data.hasOwnProperty('expired')){
            setMessage("Link is expired. New verification link is sent to your email address.")
        }
        else{
           setMessage("Verification successful. Please wait...")
           setButtonText("Redirecting")
           setTimeout(()=>{
            router.push('/login')
           }, 3000)
           return
        }
        setIsButtonLoading(false)
    }

    useEffect(()=>{
        setIsLoading(true)
        if(!token || !role || !id){
            notFound()
        }else{
            console.log("hello")
            verifyUser()
        }
    }, [])
  return (
    <>
        {
            isLoading?
            <div className="flex flex-col items-center justify-center mt-10">
                {isButtonLoading? <button className="flex items-center border-2 py-2 px-5 gap-2 rounded-md">
                    <div className="animate-spin inline-block w-5 h-5 xl:w-6 xl:h-6 border-[3px] border-current border-t-transparent text-cyan-700 rounded-full dark:text-white" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span>{buttonText}</span>
                </button> : null }
                <p className="text-sm sm:text-lg 2xl:text-xl mt-4 px-6 tracking-wide">{message}</p>
            </div>: 
            null
        }
    </>

  )
}

export default page
