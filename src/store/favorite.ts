import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PokemonDTO } from '@/types/pokemon';

interface Props {
    favorites: PokemonDTO[],
    addToFavorite: (pokemon: PokemonDTO) => void,
    removeFavorite: (name: string) => void,
    isFavorite: (name: string) => boolean
}

export const useFavorite = create<Props>()(
    persist(
        (set, get) => ({
            favorites: [],
            addToFavorite: (pokemon: PokemonDTO) => {
                set((state) => {
                    if (state.favorites.some((p) => p.name === pokemon.name)) {
                        return state
                    }

                    return { favorites: [...state.favorites, pokemon] }
                })
            },
            removeFavorite: (name: string) => {
                set((state) => ({ favorites: state.favorites.filter((pokemon) => pokemon.name !== name) }))
            },
            isFavorite: (name: string) => get().favorites.some((pokemon) => pokemon.name === name)
        }), {
        name: 'favorite-pokemons'
    }));