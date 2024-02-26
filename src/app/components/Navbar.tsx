"use client";
import Link from "next/link";
import React, { useState } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BellIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

function Navbar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image className="h-8 w-36" src={logo} alt="Logo" />
          </Link>
          <nav className="flex items-center text-sm whitespace-nowrap">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Find Creators</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex p-1 flex-col">
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      <Link href={'/'}>Find Creators</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      <Link href={'/profile'}>Profile</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Campaigns</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-1">
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      <Link href={'/campaign'}>Campaigns</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      <Link href={'/campaign/new'}>Create Campaign</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      <Link href={'/collaborations'}>Collaborations</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-1">
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      Overview
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      My Stats
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer py-2 pl-5 pr-10 rounded-lg hover:bg-slate-100" asChild>
                      Transaction History
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={"/messages"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Messages
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-6">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground relative"
              href={"/"}
            >
              <BellIcon className="w-7 h-7" />
              <span className="w-3 h-3 border-white border-2 bg-red-500 rounded-full absolute top-0 right-1"></span>
            </Link>
            <div
              className="relative transition-colors hover:text-foreground/80 text-foreground cursor-pointer"
              onClick={() => setProfileMenu(!profileMenu)}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div
                className={`${profileMenu ? "visible" : "hidden"
                  } pl-5 pr-10 absolute right-0 top-10 border-2 border-gray-200 bg-white rounded-md`}
              >
                <ul className="whitespace-nowrap text-left ">
                  <Link href={"/profile"}>
                    <li className="mt-3 hover:text-purple-500">Profile</li>
                  </Link>
                  <li onClick={async () => { await signOut({ redirect: false }); router.push('/login') }} className="my-3 hover:text-purple-500">Logout</li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
