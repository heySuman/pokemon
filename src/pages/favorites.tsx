import { IPokeInfo } from "../components/pokemon-card";

export default function Favorites({ favorites }: { favorites: IPokeInfo[] }) {
  return (
    <main>
      {favorites.map((i) => (
        <div className="card">
          <img src={i.image} alt="name" />
          <div className="card__name">
            <h2>{i.name}</h2>
            <button
            // onClick={() =>
            //   handleFavorite({ name, image, soundURL, abilities })
            // }
            >
              Remove from Favorite
            </button>
          </div>
          {/* <button onClick={() => playSound()}>Play Sound</button> */}
          <h3>Abilities</h3>
          <div className="abilities">
            {i.abilities &&
              i.abilities.map((i) => <span>{i.ability.name}</span>)}
          </div>
        </div>
      ))}
    </main>
  );
}
