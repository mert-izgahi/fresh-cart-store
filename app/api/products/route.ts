import {
    createProduct,
    getAllProducts,
} from "@/server/actions/products.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { generateQueryObj } from "@/server/utils/generateQuery";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    const { queryObj, page } = await generateQueryObj(req);
    const { products, totalPages } = await getAllProducts(
        queryObj,
        Number(page)
    );
    return NextResponse.json(
        { records: products, totalPages },
        { status: 200 }
    );
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 200 });
});
