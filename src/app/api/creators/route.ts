import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request){
    try{
        const creators = await prisma.creator.findMany({
            cacheStrategy:{
                ttl: 3600,
                swr: 500,
            }
        });
        console.log(creators)
        return NextResponse.json({success: true, creators:creators})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
