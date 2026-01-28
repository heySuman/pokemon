import { PokemonDTO, PokemonGridDTO } from "@/types/pokemon";
import { getPokemon, getPokemonByName, getPokemonGrid } from "@/queries/pokemon";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface PokemonGridProps {
    limit: number,
    offset: number
}

export function usePokemonGrid({ limit = 10, offset = 0 }: PokemonGridProps) {
    return useQuery<PokemonGridDTO>({
        queryKey: ['pokemon-grid', limit, offset],
        queryFn: () => getPokemonGrid({ limit, offset }),
        placeholderData: keepPreviousData,
        retry: false,
    });
}

interface PokemonProps {
    name: string
    url: string
}

export function usePokemon({ name, url }: PokemonProps) {
    return useQuery<PokemonDTO>({
        queryKey: [name],
        queryFn: () => getPokemon({ url }),
        retry: false,
    })
}

export function usePokemonSearch({ name }: { name: string }) {
    return useQuery<PokemonDTO>({
        queryKey: [name],
        queryFn: () => getPokemonByName({ name }),
        retry: false,
        enabled: false
    })
}