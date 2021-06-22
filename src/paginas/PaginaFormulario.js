import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { FaTimesCircle, FaMinusCircle } from "react-icons/fa";
import { Info } from "../componentes/Info";

export const PaginaFormulario = (props) => {
  const { articulos, urlAPI, llamadaListaCompra } = props;
  const { idItem } = useParams();
  const accion = idItem ? "editar" : "crear";
  const numeroArticulos = articulos.legth;
  const numeroArticulosComprados = articulos.reduce(
    (contador, articulo) => (articulo.comprado ? contador + 1 : contador),
    0
  );
  const [itemSelected, setItemSelected] = useState(
    articulos.find((articulo) => {
      return articulo.id === parseInt(idItem);
    })
  );
  const [nombre, setNombre] = useState(idItem ? itemSelected.nombre : "");
  const [comprado, setComprado] = useState(
    idItem ? itemSelected.comprado : false
  );
  const [precio, setPrecio] = useState(idItem ? itemSelected.precio : "");
  const { fetchGlobal, error } = useFetch();

  const editar = useCallback(
    async (e) => {
      e.preventDefault();
      setItemSelected((articulo) => {
        return {
          ...articulo,
          nombre: nombre,
          precio: precio,
          comprado: comprado,
        };
      });
      const response = await fetchGlobal(`${urlAPI}/${idItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          precio: precio,
          comprado: comprado,
        }),
      });
      if (response) {
        llamadaListaCompra(urlAPI);
      }
    },
    [comprado, fetchGlobal, idItem, llamadaListaCompra, nombre, precio, urlAPI]
  );
  return (
    <>
      <Info />
      <main className="principal espaciado">
        <h2 className="titulo-seccion">Editar artículo</h2>
        <form className="form-crear" noValidate onSubmit={editar}>
          <label htmlFor="precio">Nombre:</label>
          <input
            type="text"
            value={nombre}
            className="control"
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="precio">Precio:</label>
          <div className="control-moneda">
            <input
              type="number"
              id="precio"
              className="control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            €
          </div>
          <label htmlFor="comprado">Comprado:</label>
          <input
            type="checkbox"
            value={comprado}
            defaultChecked={comprado}
            id="nombre"
            onChange={(e) => setComprado(e.target.checked)}
          />
          <button class="enviar" type="submit">
            {idItem ? "Modificar" : "Editar"}
          </button>
        </form>
      </main>
    </>
  );
};
