import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { parse } from "url";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser();
        body.brandId = user?.id;
        const newCampaign = await prisma?.campaign.create({
            data: body
        })
        if (newCampaign) {
            await prisma.brand.update({
                where: { id: user?.id },
                data: { campaignIds: { push: newCampaign.id } },
            });
        }
        return NextResponse.json({success: true, campaign:newCampaign})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}

export async function GET(req: Request){
    try{
        var { query } = parse(req.url || '', true);
        const {status}:any= query
        const user = await getCurrentUser();
        const campaigns = await prisma?.campaign.findMany({
            where: {
                brandId: user?.id,
                status: status
            }
        })
        return NextResponse.json({success: true, campaigns:campaigns})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}