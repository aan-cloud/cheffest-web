import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import * as authServices from "../services/auth";
import { querySchema } from "../schema/auth";
import authMiddleware from "../middlewares/check-user-token";

const TAGS = ["Auth"]

const authRoute = new OpenAPIHono();

authRoute.openAPIRegistry.registerComponent(
    "securitySchemes",
    "AuthorizationBearer",
    {
        type: "http",
        scheme: "bearer",
        in: "header",
        description: "Bearer token",
    }
);

authRoute.openapi(
    {
        method: "post",
        path: "/google/token",
        summary: "Token of Google Oauth",
        description:
            "Send your google token credential to this api endpoint.",
        tags: TAGS,
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: querySchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Login succes",
            },
            401: {
                description: "Login failed",
            },
        },
    },
    async (c: Context) => {
        const body = await c.req.json();
        const token = body.token;

        try {
            const userData = await authServices.googleAuth(token);

            return c.json(userData);
        } catch (error: Error | any) {
            return c.json({ error: error.message }, error.status || 404);
        }
    }
);

authRoute.openapi(
    {
        method: "get",
        path: "/me",
        summary: "User information",
        description:
            "Get logged in user information including user ID, username, and role.",
        tags: TAGS,
        security: [{ AuthorizationBearer: [] }],
        middleware: [authMiddleware],
        responses: {
            200: {
                description: "User information successfully retrieved",
            },
            401: {
                description: "Falid JWT",
            },
        },
    },
    async (c: Context) => {
        const userId = (c as Context).get("user")?.id as string;

        try {
            const user = await authServices.profile(userId);
            return c.json({ message: "succes get profile", user }, 200);
        } catch (error: Error | any) {
            return c.json(
                { message: "failed to get profile", error: error.message },
                401
            );
        }
    }
);

export default authRoute;