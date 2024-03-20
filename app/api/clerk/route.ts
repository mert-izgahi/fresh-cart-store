import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { IUser } from "@/server/models/User.model";
import { createUser } from "@/server/actions/users.actions";
const webhookSecret = process.env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
    const payloadString = await request.text();
    const headerPayload = headers();

    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
    };
    const wh = new Webhook(webhookSecret);
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
export async function POST(request: Request) {
    const payload = await validateRequest(request);
    const eventType = payload.type;
    console.log("eventType", eventType);

    switch (eventType) {
        case "user.created": {
            const eventData = payload.data;
            const fullName = `${eventData?.first_name} ${eventData.last_name}`;
            const clerkId = eventData.id;
            const email = eventData.email_addresses[0].email_address;

            const newUser = {
                fullName,
                email,
                clerkId,
                shippingAddress: [],
                role: "user",
                status: "active",
            } as IUser;

            await createUser(newUser);
        }

        default:
            return Response.json({ message: "Received" });
    }
}
