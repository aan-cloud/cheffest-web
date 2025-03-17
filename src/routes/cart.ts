import { OpenAPIHono } from "@hono/zod-openapi";

import * as cartServices from "../services/cart"
import * as cartSchema from "../schema/cart";
import * as foodSchema from "../schema/food";
import authMiddleware from "../middlewares/check-user-token";
import { Context } from "hono";

const cartRoute = new OpenAPIHono();

const TAGS = ["Cart"];

cartRoute.openapi(
    {
        path: "/{foodId}",
        method: "post",
        tags: TAGS,
        summary: "Insert food to cart",
        description: "Insert food to cart",
        security: [{ AuthorizationBearer: [] }],
        middleware: [authMiddleware ],
        request: {
            params: foodSchema.foodIdParam,
            body: {
                content: {
                    "application/json": {
                        schema: cartSchema.sumOfProduct
                    }
                }
            },
        },
        responses: {
            201: {
                description: "Add food success",
            },
            400: {
                description: "Add food failed",
            },
        },
    },
    async (c) => {
        const { foodId } = c.req.valid("param");
        const { sum } = c.req.valid("json");
        const userId = (c as Context).get("user")?.id as string;

        try {
            const productToCart = await cartServices.postFoodTocart(foodId, userId, sum);
            return c.json(productToCart, 201);
        } catch (error: Error | any) {
            return c.json(error, 400)
        }
    }
);

cartRoute.openapi(
    {
        path: "/",
        method: "get",
        tags: TAGS,
        summary: "User cart",
        description: "Get user cart",
        security: [{ AuthorizationBearer: [] }],
        middleware: [ authMiddleware ],
        responses: {
            200: {
                description: "Get cart success",
            },
            400: {
                description: "Get cart failed",
            },
        },
    },
    async (c) => {
        const userId = (c as Context).get("user")?.id as string;
    
        try {
            const userCart = await cartServices.getUserCart(userId);
    
            return c.json(userCart, 200)
        } catch (error: Error | any) {
            return c.json(error, 400)
        }
    }
);

cartRoute.openapi(
    {
        path: "/{slug}",
        method: "delete",
        tags: TAGS,
        summary: "Delete Product in cart",
        description: "Delete Product in cart using cart item",
        security: [{ AuthorizationBearer: [] }],
        middleware: [authMiddleware ],
        request: {
            params: foodSchema.slugParam,
            body: {
                content: {
                    "application/json": {
                        schema: cartSchema.productToCartSchema
                    }
                }
            },
        },
        responses: {
            201: {
                description: "Delete item success",
            },
            400: {
                description: "Delete item failed",
            },
        },
    },
    async (c) => {
        const { slug } = c.req.valid("param");
        const { cartItemId } = c.req.valid("json");

        try {
            const deleteProduct = await cartServices.deleteCartItem(cartItemId, slug);

            return c.json(deleteProduct, 201);
        } catch (error: Error | any) {
            return c.json(error, 409);
        }
    }
);

export default cartRoute;