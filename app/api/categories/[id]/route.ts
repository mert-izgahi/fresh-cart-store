import {
    deleteCategory,
    getCategory,
    updateCategory,
} from "@/server/actions/categories.actions";
import { asyncWrapper } from "@/server/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export const GET = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const category = await getCategory(params.id);
        return NextResponse.json(category, { status: 200 });
    }
);

export const DELETE = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const deletedCategory = await deleteCategory(params.id);
        return NextResponse.json(deletedCategory, { status: 200 });
    }
);

export const PATCH = asyncWrapper(
    async (req: NextRequest, { params }: IParams) => {
        const body = await req.json();
        const updatedCategory = await updateCategory(params.id, body);
        return NextResponse.json(updatedCategory, { status: 200 });
    }
);
