import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { parse } from "url";

export async function POST(req: Request){
    try{
        var { query } = parse(req.url || '', true);
        const {section} = query;
        const body = await req.json();
        const user = await getCurrentUser();
        const updatedUser = await prisma?.creator.update({
            where: {
                id: user?.id
            },
            data: body
        })
        return NextResponse.json({success: true})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}