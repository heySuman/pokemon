import PokemonCard, { ICardProps } from "../components/pokemon-card";

export default function Favorites({ favorites }: { favorites: ICardProps[] }) {
  return (
    <div>
      {favorites.map((i) => (
        <PokemonCard {...i} />
      ))}
    </div>
  );
}
