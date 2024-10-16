export const SearchBar = ({ pokemonName }: { pokemonName: string }) => {
  return (
    <>
      <input type="text" value={pokemonName} />
    </>
  );
};
