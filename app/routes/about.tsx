import type { Route } from "./+types/about";
import { About } from "~/layout/contents/About";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Cheffest" },
    { name: "description", content: "Welcome to Cheffest foods App!" },
  ];
}

export default function Home() {

  return <About />
}