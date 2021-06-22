import { NavLink } from "react-router-dom";

export const Cabecera = () => {
  return (
    <header className="cabecera">
      <h1>Rutas</h1>
      <nav>
        <ul className="menu">
          <li>
            <NavLink to="/" activeClassName="actual">
              Principal
            </NavLink>
          </li>
          <li>
            <NavLink to="/lista-articulo" activeClassName="actual">
              Lista
            </NavLink>
          </li>
          <li>
            <NavLink to="/nuevo-articulo" activeClassName="actual">
              Nuevo Articulo
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
