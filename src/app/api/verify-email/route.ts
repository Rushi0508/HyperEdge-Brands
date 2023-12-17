import { NextResponse } from 'next/server';
import { parse } from 'url'; // Import the 'parse' function from the 'url' module
import prisma from '@/app/libs/prismadb';

export async function GET(req: Request) {
  try{
    var { query } = parse(req.url || '', true); // Parse the query parameters
    const { token, id, role }:any = query;
    if (token === undefined || id === undefined || role === undefined) {
        return NextResponse.json(
            {message: 'Missing required parameters', success: false} ,
        );
    }
    const verificationRecord = await prisma.userVerification.findFirst({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    if(!verificationRecord){
        return NextResponse.json(
            {message: 'No record found', success: false} ,
        );
    }
    const link = verificationRecord.link
    var {query} = parse(link || '', true) 
    if(query.token!=token || query.id!=id || query.role!=role){
        return NextResponse.json(
            {message: 'Invalid URL', success: false} ,
        );
    }  
    // check expiration
    const currentDate = new Date();
    if(currentDate<verificationRecord.expiresAt){
        // Mark the user verified
        if(role=="0"){
            await prisma.creator.update({
                where: {id: id},
                data:{
                    emailVerified: true,
                }
            })
        }
        if(role=="1"){
            await prisma.brand.update({
                where: {id: id},
                data:{
                    emailVerified: true,
                }
            })
        }
        // Delete all entries of the user
        await prisma.userVerification.deleteMany({
            where: {
                userId: id
            }
        });
        return NextResponse.json({success: true})
    }else{
        return NextResponse.json({expired: true})
    }
  }catch(error){
    console.log(error)
    return NextResponse.json({
        error: error
    })
  }
}
