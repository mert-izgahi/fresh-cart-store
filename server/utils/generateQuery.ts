import { NextRequest } from "next/server";

export const generateQueryObj = async (req: NextRequest) => {
    const queryObj: any = {};
    const params = req.nextUrl.searchParams;
    const page = params.get("page");

    if (params.has("status")) {
        queryObj.status = params.get("status");
    }
    if (params.has("q")) {
        const name = params.get("q");
        queryObj.name = { $regex: name, $options: "i" };
    }

    return { queryObj, page };
};
