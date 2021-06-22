import { DatosArticulosContext } from "../context/DatosArticulosContext";
import { useState, useContext, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { FaTimesCircle, FaMinusCircle } from "react-icons/fa";
import { Info } from "../componentes/Info";

export const PaginaFormulario = (props) => {
  const { urlAPI, llamadaListaCompra } = props;
  const { articulos, setArticulos } = useContext(DatosArticulosContext);
  const { idItem } = useParams();
  const accion = idItem ? "editar" : "crear";
  const history = useHistory();
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

  const tratarItem = useCallback(
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
      if (!idItem) {
        const response = await fetchGlobal(urlAPI, {
          method: "POST",
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
          setArticulos([...articulos, response]);
          history.push(`/lista-articulo`);
        }
      } else {
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
          history.push(`/lista-articulo`);
        }
      }
    },
    [
      articulos,
      comprado,
      fetchGlobal,
      history,
      idItem,
      llamadaListaCompra,
      nombre,
      precio,
      setArticulos,
      urlAPI,
    ]
  );
  return (
    <>
      <Info />
      <main className="principal espaciado">
        <h2 className="titulo-seccion">Editar artículo</h2>
        <form className="form-crear" noValidate onSubmit={tratarItem}>
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
          <button className="enviar" type="submit">
            {idItem ? "Modificar" : "Crear"}
          </button>
        </form>
      </main>
    </>
  );
};
