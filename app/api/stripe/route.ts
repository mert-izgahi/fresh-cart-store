import { getOrder } from "@/server/actions/orders.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = asyncWrapper(async (req: NextRequest) => {
    const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
    const body = await req.text();

    const signature = req.headers.get("stripe-signature") as string;

    if (!body || !signature) {
        return NextResponse.json(
            { error: "Missing body or signature" },
            { status: 400 }
        );
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            STRIPE_WEBHOOK_SECRET
        );

        if (event.type === "checkout.session.completed") {
            console.log("Checkout session completed", event.data.object.id);
            const session = event.data.object;
            const sessionCreatedAt = new Date(event.created * 1000);
            if (!session) {
                return NextResponse.json(
                    { error: "Missing session" },
                    { status: 400 }
                );
            }
            const orderId = session?.client_reference_id;
            const payment_intent = session?.payment_intent as string;
            const paymentStatus = session?.status as string;
            const paymentId = session?.id as string;

            const order = await getOrder(orderId);

            if (order) {
                order.payment_intent = payment_intent;
                order.paymentResult = {
                    id: paymentId,
                    status: paymentStatus,
                    update_time: sessionCreatedAt.toString(),
                    email_address: session?.customer_email,
                };

                await order.save();
            }
        } else if (event.type === "payment_intent.succeeded") {
            console.log("Payment intent succeeded", event.data.object.id);

            // if (orderId && payment_intent && paymentStatus && paymentId) {
            //     const order = await getOrder(orderId);
            //     if (order) {
            //         order.paymentResult = payment_intent;
            //         order.paymentResult = {
            //             id: paymentId,
            //             status: paymentStatus,
            //             update_time: sessionCreatedAt.toString(),
            //             email_address: session?.customer_email,
            //         };
            //         await order.save();
            //     }
            // }
        } else if (event.type === "payment_intent.payment_failed") {
            console.log("Payment intent failed", event.data.object.id);
        } else if (event.type === "payment_intent.canceled") {
            console.log("Payment intent canceled", event.data.object.id);
        } else if (event.type === "payment_intent.created") {
            console.log("Payment intent created", event.data.object.id);
        }
    } catch (err: any) {
        console.log(`❌  Error message: ${err.message}`);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    return NextResponse.json(event);
});
