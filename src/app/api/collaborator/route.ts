import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// Remove a collaborator from a campaign
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    const { campaignId, creatorId } = body;

    const collaboration: any = await prisma.collaboration.findFirst({
      where: {
        creatorId: creatorId,
        brandId: user?.id,
        campaignId: campaignId,
      },
    });
    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        collaborators: {
          disconnect: {
            id: creatorId,
          },
        },
      },
    });
    await prisma.collaboration.delete({
      where: {
        id: collaboration?.id,
      },
    });
    const creator = await prisma.creator.findUnique({
      where: {
        id: creatorId,
      },
    });
    if (creator && creator.campaignInviteIds.includes(campaignId)) {
      const updatedUser = await prisma.creator.update({
        where: {
          id: creatorId,
        },
        data: {
          campaignInviteIds: {
            set: creator.campaignInviteIds.filter((id) => id !== campaignId),
          },
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}

// Get all collaborations for a brand
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const collaborations = await prisma.collaboration.findMany({
      where: {
        brandId: user?.id,
        status: "APPROVED",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        creator: {
          select: {
            fullName: true,
            avatar: true,
          },
        },
        campaign: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, collaborations: collaborations });
  } catch (error) {
    return NextResponse.json({ errors: error });
  }
}
