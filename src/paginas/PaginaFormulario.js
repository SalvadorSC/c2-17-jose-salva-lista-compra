import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { FaTimesCircle, FaMinusCircle } from "react-icons/fa";
import { Info } from "../componentes/Info";

export const PaginaFormulario = (props) => {
  const { articulos, urlAPI, setArticulo } = props;
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
  console.log(idItem);
  console.log(articulos);
  const [nombre, setNombre] = useState(idItem ? itemSelected.nombre : "");
  const [comprado, setComprado] = useState(
    idItem ? itemSelected.comprado : false
  );
  const [precio, setPrecio] = useState(idItem ? itemSelected.precio : "");
  const { fetchGlobal, error } = useFetch();

  /* const editar = async () => {
    const response = await fetchGlobal(`${urlAPI}/${idItem}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemSelected),
    });
   if (response) {
      setArticulo(
        .map((tipoGato) => {
          if (tipoGato.id === tipoModificado.id) {
            return {
              ...tipoGato,
              tipo: tipoModificado.tipo,
            };
          } else {
            return tipoGato;
          }
        })
      );
    }
  }; */
  return (
    <>
      <Info idItem={idItem} />
      <main class="principal espaciado">
        <h2 class="titulo-seccion">Editar artículo</h2>
        <form class="form-crear" noValidate>
          <label htmlFor="precio">Nombre:</label>
          <input
            type="text"
            value={nombre}
            class="control"
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="precio">Precio:</label>
          <div class="control-moneda">
            <input
              type="number"
              id="precio"
              class="control"
              value={precio}
              onChange={(e) => setComprado(e.target.value)}
            />
            €
          </div>
          <label htmlFor="comprado">Comprado:</label>
          <input
            type="checkbox"
            value={comprado}
            defaultChecked={comprado}
            id="nombre"
            onChange={(e) => setPrecio(e.target.value)}
          />
          <button class="enviar" type="submit">
            {idItem ? "Modificar" : "Editar"}
          </button>
        </form>
      </main>
    </>
  );
};
