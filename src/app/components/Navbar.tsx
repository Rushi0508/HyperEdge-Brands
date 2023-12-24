"use client"
import Link from 'next/link'
import React from 'react'
import { logo } from '@/assets'
import Image from 'next/image'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { BellIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className='container flex h-16 max-w-screen-2xl items-center'>
            <div className='mr-4 hidden md:flex'>
                <Link className='mr-6 flex items-center space-x-2' href="/">
                    <Image
                    className='h-8 w-36'
                        src={logo}
                        alt='Logo'
                    />
                </Link>
                <nav className='flex items-center text-sm whitespace-nowrap'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Find Brands</NavigationMenuTrigger>
                                <NavigationMenuContent className='flex flex-col'>
                                    <NavigationMenuLink className='px-4 m-2'>Find Brands</NavigationMenuLink>
                                    <NavigationMenuLink className='px-4 m-2'>Proposals</NavigationMenuLink>
                                    <NavigationMenuLink className='px-4 m-2'>Profile</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>My Work</NavigationMenuTrigger>
                                <NavigationMenuContent className='flex flex-col'>
                                    <NavigationMenuLink className='px-4 m-2'>My Work</NavigationMenuLink>
                                    <NavigationMenuLink className='px-4 m-2'>All Campaigns</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
                                <NavigationMenuContent className='flex flex-col'>
                                    <NavigationMenuLink className='px-4 m-2'>Overview</NavigationMenuLink>
                                    <NavigationMenuLink className='px-4 m-2'>My Stats</NavigationMenuLink>
                                    <NavigationMenuLink className='px-4 m-2'>Transaction History</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href={'/messages'} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Messages</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    

                </nav>
            </div>
            <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
                <nav className='flex items-center gap-6'>
                    <Link className='transition-colors hover:text-foreground/80 text-foreground relative' href={'/'}>
                        <BellIcon className='w-7 h-7'/>
                        <span className='w-3 h-3 border-white border-2 bg-red-500 rounded-full absolute top-0 right-1'></span>
                    </Link>
                    <Link className='transition-colors hover:text-foreground/80 text-foreground' href={'/'}>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>
                </nav>

            </div>
        </div>

    </header>
  )
}

export default Navbar