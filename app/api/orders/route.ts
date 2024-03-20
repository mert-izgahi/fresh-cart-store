import { createOrder, getAllOrders } from "@/server/actions/orders.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { generateQueryObj } from "@/server/utils/generateQuery";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    const queryObj = await generateQueryObj(req);
    const orders = await getAllOrders(queryObj);
    return NextResponse.json(orders, { status: 200 });
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();
    const order = await createOrder(body);
    return NextResponse.json(order, { status: 200 });
});
