import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("foods", "./routes/foods.tsx"),
    route("cart", "./routes/cart.tsx"),
    route("/about", "./routes/about.tsx")
] satisfies RouteConfig;
