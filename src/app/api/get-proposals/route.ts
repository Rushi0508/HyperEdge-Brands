import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { parse } from "url";
import prisma from '@/app/libs/prismadb'
import getSession from "@/app/actions/getSession";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const proposals = await prisma.proposal.findMany({
            where: {
                campaignId: body.campaignId
            },
            include:{
                creator:{
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true
                    }
                }
            },
            orderBy:{
                createdAt: "desc"
            }
        })
        return NextResponse.json({success: true, proposals:proposals})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
