import { useState } from "react";
import PokemonCard from "../components/pokemon-card";

interface pokeData {
  name: string;
  order: number;
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
    }
  ];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  cries: {
    latest: string;
  };
}

export default function Home({ handleFavorite }) {
  const [pokemon, setPokemon] = useState<string>("");
  const [data, setData] = useState<pokeData>();

  function fetchData(
    pokemon: string,
    event: React.ChangeEvent<HTMLFormElement>
  ) {
    event?.preventDefault();
    if (pokemon !== "") {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase())
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Not Found");
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
          alert("Pokemon Not Found");
        });
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
        <button type="submit">Search</button>
      </form>

      {data && (
        <PokemonCard
          image={data.sprites.other.home.front_default}
          key={data.order}
          name={data.name}
          soundURL={data.cries.latest}
          abilities={data.abilities}
          handleFavorite={handleFavorite}
        />
      )}
    </main>
  );
}
