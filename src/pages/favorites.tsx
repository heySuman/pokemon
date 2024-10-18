import { IPokeInfo } from "../components/pokemon-card";

export default function Favorites({
  favorites,
  handleRemoveFavorite,
}: {
  favorites: IPokeInfo[];
  handleRemoveFavorite: (name: string) => void;
}) {
  return (
    <main>
      {favorites.map((i) => (
        <div className="card" key={i.name}>
          <img src={i.image} alt="name" />
          <div className="card__name">
            <h2>{i.name}</h2>
            <button onClick={() => handleRemoveFavorite(i.name)}>
              Remove from Favorite
            </button>
          </div>
          {/* <button onClick={() => playSound()}>Play Sound</button> */}
          <h3>Abilities</h3>
          <div className="abilities">
            {i.abilities &&
              i.abilities.map((i) => (
                <span key={i.ability.name}>{i.ability.name}</span>
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
