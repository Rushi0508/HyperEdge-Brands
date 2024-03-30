import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chatId } = body;
    if (chatId) {
      const chat = await prisma.chat.findFirst({
        where: {
          id: chatId,
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
      return NextResponse.json({ success: true, chat: chat });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
