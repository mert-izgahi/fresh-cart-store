import {
    deleteProduct,
    getProduct,
    updateProduct,
} from "@/server/actions/products.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export const GET = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const product = await getProduct(params.id);
        return NextResponse.json(product, { status: 200 });
    }
);

export const DELETE = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const product = await deleteProduct(params.id);
        return NextResponse.json(product, { status: 200 });
    }
);

export const PATCH = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const body = await req.json();
        const product = await updateProduct(params.id, body);
        return NextResponse.json(product, { status: 200 });
    }
);
