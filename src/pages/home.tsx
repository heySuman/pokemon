import { useState } from "react";
import PokemonCard from "../components/pokemon-card";

interface pokeData {
  name: string;
  order: number;
  abilitites: [
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
}

export default function Home() {
  const [pokemon, setPokemon] = useState<string>("");
  const [data, setData] = useState<pokeData>();

  function fetchData(
    pokemon: string,
    event: React.ChangeEvent<HTMLFormElement>
  ) {
    event?.preventDefault();
    if (pokemon !== "") {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(e.target.value);
  };

  return (
    <div>
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
        />
      )}
    </div>
  );
}
