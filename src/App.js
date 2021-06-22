import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";
import { PaginaFormulario } from "./paginas/PaginaFormulario";
import { PaginaNotFound } from "./paginas/PaginaNotFound";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";

function App() {
  return (
    <>
      <Router>
        <Cabecera />
        <Switch>
          <Route path="/" exact>
            <PaginaPrincipal articulos={articulos} />
          </Route>
          <Route path="/nuevo-amigo" exact>
            <PaginaFormulario articulos={articulos} />
          </Route>
          <Route path="/editar-amigo" exact>
            <PaginaFormulario articulos={articulos} />
          </Route>
          <Route path="/editar-amigo/:idAmigo" exact>
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
