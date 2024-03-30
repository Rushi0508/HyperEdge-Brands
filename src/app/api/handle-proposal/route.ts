import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { parse } from "url";
import prisma from '@/app/libs/prismadb'
import getSession from "@/app/actions/getSession";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser()
        const proposal = await prisma.proposal.update({
            where: {
                id: body.proposalId
            },
            data: {
                status: body.status
            }
        })
        if(proposal){
            let updateCampaign = await prisma.campaign.update({
                where: {
                    id: proposal.campaignId
                },
                data: {
                    collaboratorIds:{
                        push: proposal.creatorId
                    }
                }
            })
            if(updateCampaign){
                let collaboration = await prisma.collaboration.create({
                    data: {
                        status: body.status==="ACCEPTED"?"APPROVED" : "DECLINED",
                        campaignId: proposal.campaignId,
                        creatorId: proposal.creatorId,
                        brandId: user?.id!
                    }
                })
                return NextResponse.json({success:true})
            }
            throw Error()
        }
        throw Error()
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
