import { z as zod } from '@hono/zod-openapi'

export const querySchema = zod.object({
    token: zod.string().openapi(
        {
            example: ""
        }
    )
})