import { useState } from "react";
import PokemonCard, { IPokeInfo } from "../components/pokemon-card";

export default function Home({
  handleFavorite,
  favorites,
}: {
  handleFavorite: (newFav: IPokeInfo) => void;
  favorites: IPokeInfo[];
}) {
  const [pokemon, setPokemon] = useState<string>("");
  const [data, setData] = useState<IPokeInfo>();
  const [loading, setLoading] = useState(false);

  function fetchData(
    pokemon: string,
    event: React.ChangeEvent<HTMLFormElement>
  ) {
    event?.preventDefault();
    if (pokemon !== "") {
      setLoading(true);
      // check if the favorite already has the pokemon as for working with the cache
      if (favorites.filter((i) => pokemon === i.name).length > 0) {
        console.log("from the localStorage");
        setData(favorites.filter((i) => pokemon === i.name)[0]);
        setLoading(false);
      } else {
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase())
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Not Found");
          })
          .then((data) =>
            setData({
              name: data.name,
              image: data.sprites.other.home.front_default,
              abilities: data.abilities,
              soundURL: data.cries.latest,
            })
          )
          .catch((error) => {
            console.log(error);
            alert("Pokemon Not Found");
          })
          .finally(() => setLoading(false));
      }
    } else {
      alert("please enter the pokemon name");
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(e.target.value);
  };

  return (
    <main>
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
          fetchData(pokemon, e)
        }
      >
        <input
          type="search"
          name="pokemon"
          id="search"
          placeholder="e.g: ditto"
          value={pokemon}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {data && (
        <PokemonCard
          image={data.image}
          key={data.name}
          soundURL={data.soundURL}
          name={data.name}
          abilities={data.abilities}
          handleFavorite={handleFavorite}
        />
      )}
    </main>
  );
}
