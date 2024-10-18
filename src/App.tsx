import Home from "./pages/home";
import Favorites from "./pages/favorites";
import { Navbar } from "./components/nav-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPokeInfo } from "./components/pokemon-card";

function App() {
  const [favorites, setFavorites] = useState<IPokeInfo[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data !== null) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (favorites?.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleFavorite = (newFavorite: IPokeInfo) => {
    alert(`${newFavorite.name} added to the favorite`);
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const handleRemoveFavorite = (name: string) => {
    alert(`${name} removed from the favorite`);
    setFavorites(favorites.filter((i) => i.name !== name));
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Home handleFavorite={handleFavorite} favorites={favorites} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
