import {
    createCategory,
    getAllCategories,
} from "@/server/actions/categories.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    let queryObj = {};

    if (params.has("status")) {
        queryObj = {
            ...queryObj,
            status: params.get("status"),
        };
    }

    if (params.has("q")) {
        queryObj = {
            ...queryObj,
            name: { $regex: params.get("q"), $options: "i" },
        };
    }

    const categories = await getAllCategories(queryObj);
    return NextResponse.json(categories, { status: 200 });
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();
    const category = await createCategory(body);
    return NextResponse.json(category, { status: 200 });
});
