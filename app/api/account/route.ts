import {
    deleteAccount,
    getAccount,
    updateAccount,
} from "@/server/actions/users.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }
    const user = await getAccount(userId);

    return NextResponse.json(user, { status: 200 });
});

export const PATCH = asyncWrapper(async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }
    const body = await req.json();
    const user = await updateAccount(userId, body);
    return NextResponse.json(user, { status: 200 });
});

export const DELETE = asyncWrapper(async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }
    const user = await deleteAccount(userId);
    return NextResponse.json(user, { status: 200 });
});
