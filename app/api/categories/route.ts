import {
    createCategory,
    getAllCategories,
} from "@/server/actions/categories.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { generateQueryObj } from "@/server/utils/generateQuery";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    let queryObj = await generateQueryObj(req);
    const categories = await getAllCategories(queryObj);
    return NextResponse.json(categories, { status: 200 });
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();
    const category = await createCategory(body);
    return NextResponse.json(category, { status: 200 });
});
