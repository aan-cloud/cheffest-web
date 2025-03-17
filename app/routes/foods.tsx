import type { Route } from "./+types/foods";
import { Products } from "~/layout/contents/Products";
import type { Food } from "~/types/foods";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Our best foods for you!" },
  ];
}

export async function loader({
  params,
  request
}: Route.LoaderArgs) {
  const url = new URL(request.url!);
  const searchQuery = url.searchParams.get("name");
  console.log(searchQuery)

  const res = await fetch(`${process.env.VITE_API_URL}/foods${searchQuery ? `?slug=${searchQuery}` : ""}`);
  const food: Food[] = await res.json();
  return food;
}

export default function Foods({
  loaderData
}: Route.ComponentProps) {
  const foods = loaderData;

  return <Products productList={foods}/>
}