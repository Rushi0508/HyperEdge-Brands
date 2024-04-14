import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST() {
  try {
    const user = await getCurrentUser();
    const chats = await prisma.chat.findMany({
      where: {
        brandId: user?.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, chats: chats });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
