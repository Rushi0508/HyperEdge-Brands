"use client";
import Link from "next/link";
import React from "react";
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
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white">
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
                  <Link href={"/payments"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Payments
                    </NavigationMenuLink>
                  </Link>
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
            <div>
              <IoIosLogOut onClick={async () => { await signOut({ redirect: false }); router.push('/login') }} className="cursor-pointer w-7 h-7" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
