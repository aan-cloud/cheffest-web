import type { Route } from "./+types/home";
import { HomePage } from "~/layout/contents/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cheffest" },
    { name: "description", content: "Welcome to Cheffest foods App!" },
  ];
}

export default function Home() {

  return <HomePage />
}
