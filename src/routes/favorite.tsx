import { useFavorite } from "@/store/favorite";
import { createFileRoute, Link } from '@tanstack/react-router'
import SearchCard from "@/components/landing-page/search-card";
import { Home } from "lucide-react";

export const Route = createFileRoute('/favorite')({
  component: RouteComponent,
})

function RouteComponent() {
  const { favorites } = useFavorite()
  return <main className="container p-4 space-y-4 mx-auto">
    <div className="w-full flex justify-center items-center mb-4">
      <Link to="/" className="flex gap-2 items-center">
        <Home /> Return Home
      </Link>
    </div>

    <section className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto my-6">
      {favorites && favorites.map((pokemon) => (
        <SearchCard pokemon={pokemon} />
      ))}
    </section>

  </main>
}
