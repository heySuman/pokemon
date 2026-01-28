import { usePokemon } from "@/hooks/use-pokemon-grid"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SkeletonCard } from "./loading-card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

interface PokemonCardProps {
    name: string,
    url: string
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
    const { data, isLoading } = usePokemon({ name, url })

    if (isLoading) return <SkeletonCard />

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden bg-accent">
            <img
                src={data?.sprites.other?.dream_world?.front_default || data?.sprites.front_default || '/logo512.png'}
                alt="Event cover"
                className="p-4 relative z-20 aspect-video w-full object-contain bg-white border-b"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Level {data?.base_experience}</Badge>
                </CardAction>
                <CardTitle className="capitalize">{data?.name}</CardTitle>
                <CardDescription>
                    A practical talk on component APIs, accessibility, and shipping
                    faster.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">View Event</Button>
            </CardFooter>
        </Card>
    )
}