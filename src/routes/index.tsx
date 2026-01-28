import { useState } from "react";
import { Search } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { usePokemonGrid } from "@/hooks/use-pokemon";
import PokemonCard from "@/components/landing-page/pokemon-card";
import { PaginationCustom as Pagination } from "@/components/landing-page/pagination";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export const Route = createFileRoute('/')({
  component: App
})

function App() {

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const handlePrevious = () => {
    setOffset(prev => Math.max(prev - limit, 0))
  }

  const handleNext = () => {
    setOffset(prev => prev + limit)
  }

  const { data, isLoading } = usePokemonGrid({ limit, offset })

  return (
    <main className="container p-4 space-y-4 mx-auto">

      {/* Searchbar */}
      <Field className="max-w-lg mx-auto">
        <InputGroup>
          <InputGroupInput id="pokemon-search" placeholder="pikachu" className="" />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">

        {isLoading && !data && (
          <div className="flex items-center gap-2 justify-center mx-auto">
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
    </main>
  )
}