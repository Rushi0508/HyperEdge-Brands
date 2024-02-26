import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser();
        const campaignIds = body.campaignIds;

        campaignIds.forEach(async(campaignId:any,index:any) => {
            try{
                const findCollaboration = await prisma.collaboration.findFirst({
                    where: {
                        creatorId: body.creatorId,
                        brandId: user?.id,
                        campaignId: campaignId
                    }
                })
                if(findCollaboration) {
                    return NextResponse.json({message: "Creator already added in the campaign"});
                }
                const collaboration = await prisma.collaboration.create({
                    // @ts-ignore
                    data: {
                        brandId: user?.id,
                        creatorId: body.creatorId,
                        status: 'PENDING',
                        campaignId: campaignId
                    }
                })
                await prisma.campaign.update({
                    where: {
                        id: campaignId
                    },
                    data: {
                        collaboratorIds:{
                            push: body.creatorId
                        }
                    }
                })
                await prisma.creator.update({
                    where:{
                        id: body.creatorId
                    },
                    data: {
                        campaignInviteIds: {
                            push: campaignId
                        } 
                    }
                })
            }catch(error){
                console.log(error)
                return NextResponse.json({errors: error})
            }
        });
        return NextResponse.json({success: true})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}