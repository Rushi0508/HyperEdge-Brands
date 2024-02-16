import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { parse } from "url";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const creator = await prisma.creator.findUnique({
            where: {
                id: body.id
            },
            include: {
                collaborations: {
                    include: {
                        brand: {
                            select:{
                                id: true,
                                name: true,
                                logo: true
                            }
                        },
                        campaign: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({success: true, creator: creator})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}