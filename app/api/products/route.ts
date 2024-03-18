import {
    createProduct,
    getAllProducts,
} from "@/server/actions/products.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
    const products = await getAllProducts();
    return NextResponse.json(products, { status: 200 });
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 200 });
});
