import { createStore, getAllStores } from "@/server/actions/stores.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { generateQueryObj } from "@/server/utils/generateQuery";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    const { queryObj, page } = await generateQueryObj(req);
    const { stores, totalPages } = await getAllStores(queryObj, Number(page));
    return NextResponse.json({ records: stores, totalPages }, { status: 200 });
});

export const POST = asyncWrapper(async (req: NextRequest) => {
    const body = await req.json();

    const store = await createStore(body);
    return NextResponse.json(store, { status: 200 });
});
