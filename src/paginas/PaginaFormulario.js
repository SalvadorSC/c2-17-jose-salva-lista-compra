import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PaginaFormulario = (props) => {
  const { articulos } = props;
  const { idItem } = useParams();
  const accion = idItem ? "editar" : "crear";
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

  return (
    <>
      <h2>Formulario para {accion} amigo</h2>
      <form noValidate>
        <label htmlFor="precio">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="comprado">Comprado:</label>
        <input
          type="checkbox"
          value={comprado}
          defaultChecked={comprado}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setComprado(e.target.value)}
        />
      </form>
    </>
  );
};
