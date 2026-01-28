import { PokemonDTO, PokemonGridDTO } from "@/types/pokemon";
import { getPokemon, getPokemonGrid } from "@/queries/pokemon";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface PokemonGridProps {
    limit: number,
    offset: number
}

export function usePokemonGrid({ limit = 10, offset = 0 }: PokemonGridProps) {
    return useQuery<PokemonGridDTO>({
        queryKey: ['pokemon-grid', limit, offset],
        queryFn: () => getPokemonGrid({ limit, offset }),
        placeholderData: keepPreviousData
    });
}

interface PokemonProps {
    name: string
    url: string
}

export function usePokemon({ name, url }: PokemonProps) {
    return useQuery<PokemonDTO>({
        queryKey: [name],
        queryFn: () => getPokemon({ url })
    })
}