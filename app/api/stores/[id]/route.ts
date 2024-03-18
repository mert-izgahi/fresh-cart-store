import {
    deleteStore,
    getStore,
    updateStore,
} from "@/server/actions/stores.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export const GET = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const store = await getStore(params.id);
        return NextResponse.json(store, { status: 200 });
    }
);

export const DELETE = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const store = await deleteStore(params.id);
        return NextResponse.json(store, { status: 200 });
    }
);

export const PATCH = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const body = await req.json();
        const store = await updateStore(params.id, body);
        return NextResponse.json(store, { status: 200 });
    }
);
