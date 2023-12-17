import { NextResponse } from 'next/server';
import { parse } from 'url'; // Import the 'parse' function from the 'url' module
import prisma from '@/app/libs/prismadb';
import nodemailer from 'nodemailer'

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
        // Send New Verification Link via email
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const userVerification = await prisma.userVerification.create({
            data: {
                userId: id,
                role: role=="0"? "Creator" : "Brand",
                link: link,
                expiresAt: expiresAt
            }
        })
        const user = await prisma.creator.findUnique({
            where: {
                id: id
            }
        })

        // mail configrations
        let config = {
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        }

        let transporter = nodemailer.createTransport(config);
        const mailoptions = {
            from: '"HyperEdge" <hyperedge@gmail.com>',
            to: user?.email,
            subject: "Verify your Email",
            html: `
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:2px auto;width:90%;padding:0px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HyperEdge</a>
                    </div>
                    <p style="font-size:1.2em">Hi, <i><b>${user?.fullName}</b></i></p>
                    <p style="font-size:1.1em">Thank you for registering with HyperEdge. To ensure the security of your account, we kindly ask you to verify your email address by clicking the button below. After verification, you can proceed to complete your profile and begin your journey on HyperEdge.</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 20px;color: #fff;border-radius: 4px;">
                    <a href='${link}' style="color: white; text-decoration: none"> Verify Here </a>
                    </h2>
                    <p style="font-size:1em">Please note that the verification link will expire within 24 hours.</p>
                    <p style="font-size:1em;">Regards,<br />HyperEdge</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>HyperEdge Inc</p>
                        <p>India</p>
                    </div>
                    </div>
                </div>
            `
        }
        await transporter.sendMail(mailoptions);
        return NextResponse.json({expired: true})
    }
  }catch(error){
    console.log(error)
    return NextResponse.json({
        error: error
    })
  }
}
