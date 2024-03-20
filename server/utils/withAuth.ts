import { auth } from "@clerk/nextjs";

export const withAuth = (fn: any) => async (req: any, res: any) => {
    const { userId } = auth();
    if (!userId) {
        return res.status(401).json({ message: "Not authorized" });
    }
    return fn(req, res);
};
