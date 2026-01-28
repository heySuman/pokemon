import { PokemonDTO, PokemonGridDTO } from "@/types/pokemon";

export async function getPokemonGrid({ limit, offset }: { limit: number, offset: number }): Promise<PokemonGridDTO> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return res.json()
}

export async function getPokemon({ url }: { url: string }): Promise<PokemonDTO> {
    const res = await fetch(url);

    return res.json()
}