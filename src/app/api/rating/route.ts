import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let ratingInfo = body;
    const collaboration = await prisma.collaboration.update({
      where: {
        id: ratingInfo.id,
      },
      data: {
        rating: ratingInfo.rating,
      },
    });
    // Find all collaborations of creator and calculate average rating
    const creatorId = collaboration.creatorId;
    const collaborations = await prisma.collaboration.findMany({
      where: {
        creatorId,
      },
    });
    let ratings = 0;
    collaborations.forEach((collab) => {
      collab.rating ? (ratings += collab.rating) : null;
    });
    ratings = ratings / collaborations.length;
    // Update the user with the new rating
    const updatedCreator = await prisma.creator.update({
      where: {
        id: creatorId,
      },
      data: {
        ratings,
      },
    });
    if (updatedCreator) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
