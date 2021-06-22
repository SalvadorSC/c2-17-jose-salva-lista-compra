import { useState } from "react";
import { useHistory } from "react-router-dom";

export const PaginaPrincipal = (props) => {
  const history = useHistory();
  const { articulos } = props;

  const editarArticulo = (id) => {
    history.push(`/editar-amigo/${id}`);
  };
  return (
    <>
      <h2>Listado de facturas</h2>
      <ul>
        {articulos.map((articulo) => (
          <>
            <li key={articulo.id} onClick={() => editarArticulo(articulo.id)}>
              {articulo.nombre}
            </li>
            <li key={articulo.id} onClick={() => editarArticulo(articulo.id)}>
              {articulo.precio}
            </li>
          </>
        ))}
      </ul>
    </>
  );
};
