import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pencil1Icon, ReloadIcon, SewingPinIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Header({user,setUser}:any) {
  const [uploading, setUploading] = useState(false)
  const handleImageUpload = async(e:any)=>{
    try{
      setUploading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
      formData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);
    
      const {data} = await axios.post(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
        formData,
        {
          headers: {
             'Content-Type': 'multipart/form-data'
          }
        }
      );
      if(data){
        const resp = await axios.post('/api/profile', {logo: data.secure_url});
        setUser(resp.data.user)
      }
    }catch(error){
      toast.error('Something went wrong');
    }
    finally{
      setUploading(false)
    }
  }
  return (
    <div className='border-b-[1px] border-gray-300 p-5 flex justify-between'>
      <div className="flex gap-4 items-center">
          <div className='relative'>
            <Avatar className="w-20 h-20">
            <AvatarImage src={user?.logo} className='object-cover overflow-visible'/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <label className='cursor-pointer bg-red-500 text-white rounded-full p-0.5 absolute right-1 bottom-1' htmlFor='logo'>
              {
                uploading?
                <ReloadIcon className='h-4 w-4 animate-spin'/>: <Pencil1Icon className="px-0 w-4 h-4"/>
              }
            </label>
            <input disabled={uploading} hidden id='logo' onChange={handleImageUpload} type='file' accept='image/jpg, image/png, image/jpeg'/>
          </div>
          <div>
            <p className="font-semibold text-3xl">{user?.name}</p>
            <span className="flex items-center mt-1 text-gray-500"><SewingPinIcon className='w-5 h-5'/>{user?.state}, {user?.country}</span>
          </div>
      </div>
      <div>
          <Link href={'/profile/settings'}>
            <Button className="flex items-center gap-2"><Pencil1Icon className="px-0 w-5 h-5"/>Edit Profile</Button>
          </Link>
      </div>
    </div>
  )
}

export default Header