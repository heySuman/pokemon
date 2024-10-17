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
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (newFavorite: IPokeInfo) => {
    setFavorites((prev) => [...prev, newFavorite]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            index
            element={<Home handleFavorite={handleFavorite} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
