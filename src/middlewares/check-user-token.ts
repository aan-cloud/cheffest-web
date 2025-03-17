import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { validateToken } from "../lib/jwt";
import prisma from "../lib/db";
import { ContentfulStatusCode } from "hono/utils/http-status";

const authMiddleware = createMiddleware(async (c: Context, next) => {
    const token = extractToken(c.req.header("Authorization"));

    if (!token) {
        return respondWithError(c, "Authorization token is required!", 401);
    }

    try {
        const decodedToken = await validateToken(token);
        const userId = decodedToken?.subject;

        if (!userId || typeof userId !== "string" || userId.length === 0) {
            return respondWithError(c, "Invalid user ID in token!", 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return respondWithError(c, "User not found!", 404);
        }

        c.set("user", {
            id: user.id,
        });

        await next();
    } catch (error: Error | any) {
        return respondWithError(
            c,
            `Authentication failed ${error.message}`,
            401
        );
    }
});

export const extractToken = (authHeader: string | undefined): string | null => {
    return authHeader ? authHeader.split(" ")[1] : null;
};

export const respondWithError = (
    c: Context,
    message: string,
    status: number
) => {
    return c.json({ message }, status as ContentfulStatusCode);
};

export default authMiddleware;