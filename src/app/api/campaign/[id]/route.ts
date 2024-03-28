import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { parse } from "url";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: body.id,
        brandId: user?.id,
      },
      include: {
        collaborators: {
          select: {
            fullName: true,
            id: true,
            avatar: true,
          },
        },
        Collaboration: true,
      },
    });
    return NextResponse.json({ success: true, campaign: campaign });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    var { query } = parse(req.url || "", true);
    const { q }: any = query;
    const campaign = await prisma.campaign.update({
      where: {
        id: q,
      },
      data: body,
    });
    return NextResponse.json({ success: true, campaign: campaign });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}

export async function DELETE(req: Request) {
  try {
    var { query } = parse(req.url || "", true);
    const { q }: any = query;
    await prisma.collaboration.deleteMany({
      where: {
        campaignId: q,
      },
    });
    await prisma.campaign.delete({
      where: {
        id: q,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
