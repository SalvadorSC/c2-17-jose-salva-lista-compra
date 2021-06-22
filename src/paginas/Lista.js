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
  const precioTotal = articulos.reduce(
    (contador, articulo) => articulo.precio + contador,
    0
  );
  const borrar = async (id) => {
    const response = await fetchGlobal(`${urlAPI}/${id}`, {
      method: "DELETE",
    });
    if (response) {
      llamadaListaCompra(urlAPI);
    }
  };
  return (
    <>
      <Info />
      <main className="principal espaciado">
        <ul className="articulos">
          {articulos.map((articulo) => (
            <>
              <li key={articulo.id} className="articulo">
                <input type="checkbox" className="marcar" />
                <div
                  className="info-articulo"
                  onClick={() => editarArticulo(articulo.id)}
                >
                  <span className="nombre">{articulo.nombre}</span>
                  <span className="precio">{articulo.precio}€</span>
                </div>
                <div onClick={() => borrar(articulo.id)} className="borrar">
                  <FaTimesCircle className="icono" />
                </div>
              </li>
            </>
          ))}
        </ul>
        <span className="precio-total">{precioTotal}€</span>
      </main>
    </>
  );
};
