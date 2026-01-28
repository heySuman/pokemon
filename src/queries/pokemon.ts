import { PokemonDTO, PokemonGridDTO } from "@/types/pokemon";

export async function getPokemonGrid({ limit, offset }: { limit: number, offset: number }): Promise<PokemonGridDTO> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon list: ${res.status} ${res.statusText}`);
    }

    return res.json()
}

export async function getPokemon({ url }: { url: string }): Promise<PokemonDTO> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon: ${res.status} ${res.statusText}`);
    }

    return res.json()
}

export async function getPokemonByName({ name }: { name: string }): Promise<PokemonDTO> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error(`Pokemon "${name}" not found`);
        }
        throw new Error(`Failed to fetch Pokemon: ${res.status} ${res.statusText}`);
    }

    return res.json()
}