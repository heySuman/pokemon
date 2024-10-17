import useSound from "use-sound";

export interface ICardProps extends IPokeInfo {
  handleFavorite: (newFav: IPokeInfo) => void;
}

export interface IPokeInfo {
  name: string;
  image: string;
  soundURL: string;
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
    }
  ];
}

export default function PokemonCard({
  name,
  image,
  soundURL,
  abilities,
  handleFavorite,
}: ICardProps) {
  const [playSound] = useSound(soundURL);

  return (
    <div className="card">
      <img src={image} alt="name" />
      <div className="card__name">
        <h2>{name}</h2>
        <button
          onClick={() => handleFavorite({ name, image, soundURL, abilities })}
        >
          Add to Favorite
        </button>
      </div>
      <button onClick={() => playSound()}>Play Sound</button>
      <h3>Abilities</h3>
      <div className="abilities">
        {abilities && abilities.map((i) => <span>{i.ability.name}</span>)}
      </div>
    </div>
  );
}
