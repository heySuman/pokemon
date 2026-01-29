import { Activity, useState } from "react";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";
import SearchCard from "@/components/landing-page/search-card";
import PokemonCard from "@/components/landing-page/pokemon-card";
import { usePokemonGrid, usePokemonSearch } from "@/hooks/use-pokemon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaginationCustom as Pagination } from "@/components/landing-page/pagination";

export const Route = createFileRoute('/')({
  component: App
})

function App() {

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [isSearchMode, setIsSearchMode] = useState(false)


  const handlePrevious = () => {
    setOffset(prev => Math.max(prev - limit, 0))
  }

  const handleNext = () => {
    setOffset(prev => prev + limit)
  }

  const { data, isLoading } = usePokemonGrid({ limit, offset });
  const { data: pokemon, isLoading: isSearching, error, refetch } = usePokemonSearch({ name })

  const handleKeyDown = (key: string) => {
    if (key === 'Enter' && name.trim()) {
      setIsSearchMode(true)
      refetch()
    }
  }

  return (
    <main className="container p-4 space-y-4 mx-auto">
      <div className="w-full flex justify-center">
        <Input
          id="pokemon-search"
          placeholder="e.g pikachu"
          value={name}
          className="max-w-xl w-full"
          onChange={(e) => {
            const value = e.target.value
            setName(value)
            if (!value) setIsSearchMode(false)
          }}
          onKeyDown={(e) => handleKeyDown(e.key)} />
      </div>

      {isSearchMode && (
        <>
          {isSearching && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}

          {pokemon && !isSearching && <SearchCard pokemon={pokemon} />}

          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircleIcon />
              <AlertTitle>{(error as Error)?.message || 'No Pokémon found'}</AlertTitle>
              <AlertDescription>
                Please try another Pokemon name
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      <Activity mode={isSearchMode ? 'hidden' : 'visible'}>
        <section className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
          {isLoading && !data && (
            <div className="flex items-center gap-2 justify-center mx-auto w-fit">
              <Spinner /> Loading...
            </div>
          )}

          {data && data.results.map((card) => (
            <PokemonCard name={card.name} url={card.url} key={card.name} />
          ))}
        </section>
        <Pagination
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          offset={offset}
          setRows={setLimit} />
      </Activity>
    </main>
  )
}