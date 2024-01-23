import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser();
        body.brandId = user?.id;
        const newCampaign = await prisma?.campaign.create({
            data: body
        })
        return NextResponse.json({success: true, campaign:newCampaign})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
