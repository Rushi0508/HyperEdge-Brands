import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const payments = await prisma.payment.findMany({
      where: {
        brandId: user?.id,
      },
      include: {
        creator: {
          select: {
            fullName: true,
            avatar: true,
          },
        },
        collaboration: {
          include: {
            campaign: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({ success: true, payments: payments });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
