export default function PokemonCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div>
      <img src={image} alt="name" />
      <h2>{name}</h2>
    </div>
  );
}
