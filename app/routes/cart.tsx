import type { Route } from "./+types/cart";
import type { Cart } from "~/types/cart";
import { UserCart } from "~/layout/contents/Cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart" },
    { name: "description", content: "User cart!" },
  ];
}

export async function loader({
  params,
  request
}: Route.LoaderArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const token = cookieHeader
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];
    
    const res = await fetch(`${process.env.VITE_API_URL}/cart`, {
        method: "GET", 
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("You're not authorize");
    }

    const cart: Cart = await res.json();
    return cart;
}

export default function Cart({
  loaderData
}: Route.ComponentProps) {
  const cart = loaderData;

  return <UserCart cart={cart}/>
}