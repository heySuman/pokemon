import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <h1>Pokemon</h1>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
