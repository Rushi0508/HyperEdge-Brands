import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser();
        const {campaignId, creatorId} = body;

        const collaboration:any = await prisma.collaboration.findFirst({
            where: {
                creatorId: creatorId,
                brandId: user?.id,
                campaignId: campaignId
            }
        })
        await prisma.campaign.update({
            where: {
                id: campaignId
            },
            data:{
               collaborators: {
                    disconnect: {
                        id: creatorId
                    }
               }
            }
        })
        await prisma.collaboration.delete({
            where:{
                id: collaboration?.id
            }
        })
        return NextResponse.json({success: true})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}