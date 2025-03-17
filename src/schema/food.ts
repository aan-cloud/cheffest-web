import { z } from '@hono/zod-openapi'

export const querySchema = z.object({
    slug: z.string().optional().openapi(
        {
            example: "cheese burger"
        }
    )
});

export const foodIdParam = z.object({
    foodId: z.string().openapi({
        example: "food123",
        param: {
            in: "path",
            name: "foodId"
        }
    })
});

export const slugParam = z.object({
    slug: z.string().openapi({
        param: {
            name: "slug",
            in: "path"
        },
        example: "toyota"
    }),
});