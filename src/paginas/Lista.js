import { useState } from "react";
import { useHistory } from "react-router-dom";

export const Lista = (props) => {
  const history = useHistory();
  const { articulos, editarArticulo } = props;

  const editarAmigo = (id) => {
    history.push(`/editar-amigo/${id}`);
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
