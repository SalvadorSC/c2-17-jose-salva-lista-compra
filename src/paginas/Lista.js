import { useState } from "react";
import { useHistory } from "react-router-dom";

export const Lista = (props) => {
  const history = useHistory();
  const { articulos } = props;

  const editarArticulo = (id) => {
    history.push(`/editar-articulo/${id}`);
  };
  return (
    <>
      <ul>
        {articulos.map((articulo) => (
          <li key={articulo.id} onClick={() => editarArticulo(articulo.id)}>
            {articulo.nombre}
          </li>
        ))}
      </ul>
    </>
  );
};
