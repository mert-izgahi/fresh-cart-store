import { NextRequest, NextResponse } from "next/server";

export const asyncWrapper = (
    fn: (req: NextRequest, params?: any) => Promise<NextResponse>
) => {
    return async (req: NextRequest, params?: any) => {
        try {
            return await fn(req, params);
        } catch (error: any) {
            if (error.name === "ValidationError") {
                return NextResponse.json(
                    {
                        message: "Validation error",
                        error: error.errors,
                    },
                    {
                        status: 400,
                    }
                );
            }

            return NextResponse.json(
                {
                    message: "Something went wrong",
                    error: "Something went wrong",
                },
                {
                    status: 500,
                }
            );
        }
    };
};
