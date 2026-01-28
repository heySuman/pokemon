import { PokemonDTO } from "@/types/pokemon";
import { Badge } from "@/components/ui/badge";
import { typeColors } from "@/lib/pokemon-type";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"
import { Card, CardAction, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SearchCard({ pokemon }: { pokemon: PokemonDTO }) {
    return (
        <Card className="relative mx-auto w-full overflow-hidden bg-accent/40 max-w-sm">
            <img
                src={pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default || '/logo512.png'}
                alt={pokemon.name}
                className="p-4 relative z-20 aspect-video w-full object-contain bg-white border-b"
            />
            <CardHeader className="space-y-3">
                <CardAction className="flex-wrap gap-2">
                    <Badge variant="outline">Level {pokemon.base_experience}</Badge>
                </CardAction>
                <CardTitle className="capitalize">{pokemon.name}</CardTitle>
                <CardDescription className="flex gap-2">
                    {pokemon.types.map((type) => (
                        <Badge
                            key={type.slot}
                            className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white capitalize`}
                        >
                            {type.type.name}
                        </Badge>
                    ))}
                </CardDescription>
            </CardHeader >

            <CardContent>
                <Item className="p-0">
                    <ItemContent className="space-y-2 p-0">
                        <ItemTitle>Abilities</ItemTitle>
                        <ItemDescription>
                            <div className="flex gap-2">
                                {pokemon.abilities.map((ability) => (
                                    <Badge
                                        key={ability.slot}
                                        variant={'outline'}
                                        className="capitalize"
                                    >
                                        {ability.ability.name.replace('-', ' ')}
                                        {ability.is_hidden && ' (Hidden)'}
                                    </Badge>
                                ))}
                            </div>
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </CardContent>
        </Card >
    )
}