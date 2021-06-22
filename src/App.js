import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useEffect, useState } from "react";
import { PaginaFormulario } from "./paginas/PaginaFormulario";
import { PaginaNotFound } from "./paginas/PaginaNotFound";
import { Lista } from "./paginas/Lista";
import { AcercaDe } from "./paginas/AcercaDe";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";
import { DatosArticulosContext } from "./context/DatosArticulosContext";

function App() {
  const [articulos, setArticulo] = useState([]);
  const urlAPI = "http://localhost:3001/articulos";
  const llamadaListaCompra = async (urlAPI) => {
    const response = await fetch(urlAPI);
    const articulos = await response.json();
    setArticulo(articulos);
  };
  const numeroArticulos = articulos.length;
  const numeroArticulosComprados = articulos.reduce(
    (contador, articulo) => (articulo.comprado ? contador + 1 : contador),
    0
  );
  useEffect(() => llamadaListaCompra(urlAPI), []);

  return (
    <>
      <DatosArticulosContext.Provider
        value={{ numeroArticulos, numeroArticulosComprados }}
      >
        <Router>
          <Cabecera />
          <Switch>
            <Route path="/principal" activeClassNmae="actual" exact>
              <PaginaPrincipal articulos={articulos} />
            </Route>
            <Route path="/lista-articulo" exact>
              <Lista
                articulos={articulos}
                urlAPI={urlAPI}
                llamadaListaCompra={llamadaListaCompra}
              />
            </Route>
            <Route path="/formulario-articulo" exact>
              <PaginaFormulario articulos={articulos} urlAPI={urlAPI} />
            </Route>
            <Route path="/formulario-articulo/:idItem" exact>
              <PaginaFormulario
                articulos={articulos}
                urlAPI={urlAPI}
                setArticulo={setArticulo}
                llamadaListaCompra={llamadaListaCompra}
              />
            </Route>
            <Route path="/acerca-de" exact>
              <AcercaDe />
            </Route>
            <Route path="/" exact>
              <Redirect to="/principal" />
            </Route>
            <Route path="**" exact>
              <PaginaNotFound articulos={articulos} />
            </Route>
          </Switch>
        </Router>
      </DatosArticulosContext.Provider>
    </>
  );
}

export default App;
