// Generate Stipe Session with OrderId

import { getOrder } from "@/server/actions/orders.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import { createStripeSession } from "./core";

interface IParams {
    params: {
        id: string;
    };
}

export const POST = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const id = params.id;
        const order = await getOrder(id);
        const session = await createStripeSession(order);
        return NextResponse.json(session, { status: 200 });
    }
);
