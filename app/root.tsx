import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useNavigate } from "react-router";
import { Toaster } from "~/components/ui/sonner"
import { Navigation } from "./layout/Navigation";
import { Footer } from "./layout/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Navigation />
            {children}
            <Footer />
        </GoogleOAuthProvider>
        <Toaster className="bg-[#191919]"/>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  const navigate = useNavigate();
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="">
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center border-2 border-red-500">
            <h2 className="text-3xl font-bold text-red-700">Something went wrong! 😢</h2>
            <p className="mt-4 text-red-600">
              {details}
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
            >
              Try Again 🔄
            </button>
          </div>
        </div>
    </main>
  );
}
