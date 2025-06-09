import type { Route } from "../+types/root";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Music Life" },
    { name: "description", content: "Welcome to Music Life!" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Music Life</h1>
      <Link to="/playlists" className="text-blue-600 underline text-xl">
        Go to Playlists
      </Link>
    </main>
  );
}
