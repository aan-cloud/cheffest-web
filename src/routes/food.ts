import { OpenAPIHono } from "@hono/zod-openapi";

import * as foodServices from "../services/food";
import * as foodSchema from "../schema/food";

const foodRoute = new OpenAPIHono();

const TAGS = ["Foods"];

foodRoute.openapi(
    {
        path: "/",
        method: "get",
        tags: TAGS,
        summary: "Get all food list",
        request: {
            query: foodSchema.querySchema
        },
        responses: {
            201: {
                description: "Get products success",
            },
            400: {
                description: "Get products failed",
            },
        },
    },
    async (c) => {
        const { slug } = c.req.valid("query");

        try {
            const products = await foodServices.getAllFoods(slug);

            return c.json(products, 200);
        } catch (error: Error | any) {
            return c.json(error, 400)
        }
    }
);

// foodRoute.openapi(
//     {
//         path: "/{slug}",
//         method: "get",
//         tags: TAGS,
//         summary: "Product details",
//         description: "Get product details by slug",
//         request: {
//             params: productSchema.slugParam
//         },
//         body: {
//             request: {
//                 "application/json": {
//                     content: {
//                         schema: productSchema.default,
//                     },
//                 },
//             },
//         },
//         responses: {
//             201: {
//                 description: "Get product success",
//             },
//             400: {
//                 description: "Get product failed",
//             },
//         },
//     },
//     async (c) => {
//         const { slug } = c.req.valid("param");

//         try {
//             const productDetails = await productServices.getDetailProduct(slug);

//             return c.json(productDetails)
//         } catch (error: Error | any) {
//             return c.json(error, 400)
//         }
//     }
// );

// foodRoute.openapi(
//     {
//         path: "/create",
//         method: "post",
//         tags: TAGS,
//         summary: "Create Product",
//         description: "Create product",
//         security: [{ AuthorizationBearer: [] }],
//         middleware: [authMiddleware, checkUserRole],
//         request: {
//             body: {
//                 content: {
//                     "application/json": {
//                         schema: productSchema.createProductSchema
//                     }
//                 }
//             }
//         },
//         responses: {
//             201: {
//                 description: "Add product success",
//             },
//             400: {
//                 description: "Add product failed",
//             },
//         },
//     },
//     async (c) => {
//         const reqBody = c.req.valid("json");
//         const userId = (c as Context).get("user")?.id as string;
//         try {
//             const createdProduct = await productServices.createProduct(reqBody, userId);
//             return c.json(createdProduct, 201);
//         } catch (error: Error | any) {
//             return c.json(error, 400)
//         }
//     }
// );

// foodRoute.openapi(
//     {
//         path: "/{productId}",
//         method: "delete",
//         tags: TAGS,
//         summary: "Delete Product",
//         description: "Delete Product by slug",
//         security: [{ AuthorizationBearer: [] }],
//         middleware: [authMiddleware, checkUserRole],
//         request: {
//             params: productSchema.productIdParam
//         },
//         body: {
//             request: {
//                 "application/json": {
//                     content: {
//                         schema: productSchema.default,
//                     },
//                 },
//             },
//         },
//         responses: {
//             201: {
//                 description: "Register success",
//             },
//             400: {
//                 description: "Register failed",
//             },
//         },
//     },
//     async (c) => {
//         const { productId } = c.req.valid("param");

//         try {
//             const deleteProduct = await productServices.deleteProduct(productId);

//             return c.json({ ...deleteProduct, message: "Product deleted succuesfully" }, 201);
//         } catch (error: Error | any) {
//             return c.json(error, 409);
//         }
//     }
// );

// foodRoute.openapi(
//     {
//         path: "/{productId}",
//         method: "patch",
//         tags: TAGS,
//         summary: "Publish Product",
//         description: "Publish Product by product id",
//         security: [{ AuthorizationBearer: [] }],
//         middleware: [authMiddleware, checkUserRole],
//         request: {
//             params: productSchema.productIdParam
//         },
//         body: {
//             request: {
//                 "application/json": {
//                     content: {
//                         schema: productSchema.default,
//                     },
//                 },
//             },
//         },
//         responses: {
//             201: {
//                 description: "Product is Published",
//             },
//             404: {
//                 description: "Publishing Product failed",
//             },
//         },
//     },
//     async (c) => {
//         const { productId } = c.req.valid("param");

//         try {
//             const productIsPublished = await productServices.publishedProduct(productId);

//             return c.json(productIsPublished, 201);
//         } catch (error: Error | any) {
//             return c.json(error, 404);
//         }
//     }
// )

export default foodRoute;