import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { FaTimesCircle } from "react-icons/fa";
import { Info } from "../componentes/Info";

export const Lista = (props) => {
  const history = useHistory();
  const { articulos, urlAPI, llamadaListaCompra } = props;
  const { fetchGlobal } = useFetch();
  const editarArticulo = (id) => {
    history.push(`/formulario-articulo/${id}`);
  };
  const borrar = async (id) => {
    const response = await fetchGlobal(`${urlAPI}/${id}`, {
      method: "DELETE",
    });
    llamadaListaCompra(urlAPI);
  };

  return (
    <>
      <Info />
      <main className="principal espaciado">
        <ul className="articulos">
          {articulos.map((articulo) => (
            <>
              <li key={articulo.id}>
                <span
                  key={articulo.id}
                  onClick={() => editarArticulo(articulo.id)}
                >
                  <input type="checkbox" className="marcar" />
                  <span className="nombre">{articulo.nombre}</span>
                  <span className="precio">{articulo.precio}€</span>
                </span>

                <div onClick={() => borrar(articulo.id)} className="borrar">
                  <FaTimesCircle className="icono" />
                </div>
              </li>
            </>
          ))}
        </ul>
        <span className="precio-total">1.95€</span>
      </main>
    </>
  );
};
