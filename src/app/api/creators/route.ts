import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { parse } from "url";

export async function POST(req: Request){
    try{
        const creators = await prisma.creator.findMany();
        return NextResponse.json({success: true, creators:creators})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
