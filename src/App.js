import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useEffect, useState } from "react";
import { PaginaFormulario } from "./paginas/PaginaFormulario";
import { PaginaNotFound } from "./paginas/PaginaNotFound";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";

function App() {
  const [articulos, setArticulo] = useState([]);
  const urlAPI = "http://localhost:3001/articulos";
  const llamadaListaCompra = async (urlAPI) => {
    const response = await fetch(urlAPI);
    const articulos = await response.json();
    setArticulo(articulos);
  };
  useEffect(() => llamadaListaCompra(urlAPI), []);
  return (
    <>
      <Router>
        <Cabecera />
        <Switch>
          <Route path="/" exact>
            <PaginaPrincipal articulos={articulos} />
          </Route>
          <Route path="/nuevo-articulo" exact>
            <PaginaFormulario articulos={articulos} />
          </Route>
          <Route path="/editar-articulo" exact>
            <PaginaFormulario articulos={articulos} />
          </Route>
          <Route path="/editar-articulo/:idArticulo" exact>
            <PaginaFormulario articulos={articulos} />
          </Route>
          <Route path="**" exact>
            <PaginaNotFound articulos={articulos} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
