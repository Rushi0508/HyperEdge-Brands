"use server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
async function page() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="border-2 border-black p-5 flex justify-between">
        <div className="flex gap-4 items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-3xl">{user?.fullName}</p>
          </div>
        </div>
        <div>
          <Link href={'/profile/settings'}>
            <Button className="flex items-center gap-2"><Pencil1Icon className="px-0 w-5 h-5"/>Edit Profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default page;
