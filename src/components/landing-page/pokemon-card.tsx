import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { SkeletonCard } from "./loading-card"
import { typeColors } from "@/lib/pokemon-type"
import { usePokemon } from "@/hooks/use-pokemon"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useFavorite } from "@/store/favorite"

interface PokemonCardProps {
    name: string,
    url: string,
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
    const { data, isLoading, error } = usePokemon({ name, url });
    const { addToFavorite, removeFavorite, isFavorite } = useFavorite();


    if (isLoading) return <SkeletonCard />

    if (error) {
        return (
            <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden bg-accent/40">
                <CardHeader>
                    <CardTitle className="text-destructive">Error loading {name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Failed to load Pokemon data</p>
                </CardHeader>
            </Card>
        )
    }

    if (!data) return null;

    const handleFavorite = () => {
        if (isFavorite(name)) {
            removeFavorite(name)
        } else {
            addToFavorite(data)
        }
    }

    return (
        <Card className="relative mx-auto w-full max-w-sm aspect-3/4 overflow-hidden rounded-2xl border bg-white/30 backdrop-blur-xl text-white">

            {/* Level Hahaha */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-white/30 backdrop-blur-2xl text-white text-md">
                    Level {data.base_experience}
                </Badge>
            </div>

            {/* Level Hahaha */}
            <Button
                size={'icon-lg'}
                variant={'ghost'}
                onClick={handleFavorite}
                className="absolute top-4 right-4 z-100">
                <Heart fill={isFavorite(name) ? "red" : ""} className="h-8 w-8" size={32} />
            </Button>

            <img
                src={
                    data.sprites.other?.dream_world?.front_default ||
                    data.sprites.front_default ||
                    "/logo512.png"
                }
                alt={data.name}
                className="p-12 object-contain aspect-3/4 w-full"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white">
                <CardHeader className="space-y-2 p-0">
                    <CardTitle className="capitalize drop-shadow-sm text-2xl">
                        {data.name}
                    </CardTitle>

                    <CardDescription className="flex gap-2">
                        {data.types.map((type) => (
                            <Badge
                                key={type.slot}
                                className={`${typeColors[type.type.name] || "bg-gray-400"} text-white capitalize backdrop-blur-sm text-md`}
                            >
                                {type.type.name}
                            </Badge>
                        ))}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0 mt-2">
                    <Item className="p-0">
                        <ItemContent className="space-y-1 p-0">
                            <ItemTitle className="text-white/90 text-xl">
                                Abilities
                            </ItemTitle>
                            <ItemDescription className="flex flex-wrap gap-2">
                                {data.abilities.map((ability) => (
                                    <Badge
                                        key={ability.slot}
                                        className="bg-white/25 backdrop-blur-sm text-white capitalize text-md"
                                    >
                                        {ability.ability.name.replace("-", " ")}
                                        {ability.is_hidden && " (Hidden)"}
                                    </Badge>
                                ))}
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                </CardContent>
            </div>
        </Card>

    )
}