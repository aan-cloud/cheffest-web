import { z } from "@hono/zod-openapi";

export const sumOfProduct = z.object({
    sum: z.number().openapi({
        example: 1
    }),
});

export const productToCartSchema = z.object({
    cartItemId: z.string().openapi({
        example: "123"
    })
});