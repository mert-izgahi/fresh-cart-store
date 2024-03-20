import { getOrder, updateOrder } from "@/server/actions/orders.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export const GET = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const order = await getOrder(params.id);
        return NextResponse.json(order, { status: 200 });
    }
);

export const PATCH = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const body = await req.json();
        const order = await updateOrder(params.id, body);
        return NextResponse.json(order, { status: 200 });
    }
);
