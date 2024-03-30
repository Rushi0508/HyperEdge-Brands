import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import Stripe from "stripe";
import getCurrentUser from "@/app/actions/getCurrentUser";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);

export async function POST(req: Request) {
  const body = await req.json();
  const brand = await getCurrentUser();
  const { paymentMethodId, amount, creatorId, campaignId } = body;

  try {
    // Fetch creator account
    const creator = await prisma.creator.findUnique({
      where: {
        id: creatorId,
      },
    });
    if (creator) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method: paymentMethodId,
        transfer_data: {
          destination: creator.stripeAccountId!,
        },
        confirm: true,
        automatic_payment_methods: {
          allow_redirects: "never",
          enabled: true,
        },
      });
      if (paymentIntent) {
        const payment = await prisma.payment.create({
          data: {
            creatorId: creator.id!,
            brandId: brand?.id!,
            paymentId: paymentIntent.id,
            amount: amount,
          },
        });
        if (payment) {
          const collab = await prisma.collaboration.findFirst({
            where: {
              campaignId: campaignId!,
              creatorId: creatorId!,
              brandId: brand?.id!,
            },
          });
          if (collab) {
            await prisma.collaboration.update({
              where: {
                id: collab.id,
              },
              data: {
                paymentId: payment.id,
              },
            });
            return NextResponse.json({ success: true });
          }
        }
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while processing the payment.",
    });
  }
}
