import { useContext } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import { DatosArticulosContext } from "../context/DatosArticulosContext";
export const Info = (props) => {
  const { numeroArticulos, numeroArticulosComprados } = useContext(
    DatosArticulosContext
  );
  const parametros = useParams();
  const history = useHistory();

  const { idItem } = props;
  console.log(parametros);
  const volverAtras = (id) => {
    history.push(`/lista-articulo`);
  };
  return (
    <section className="info espaciado bloque-superior">
      <i className="icono">
        {idItem ? <FaMinusCircle onClick={volverAtras} /> : <FaPlusCircle />}
      </i>
      <p className="n-articulos">
        {numeroArticulosComprados}/{numeroArticulos} comprados
      </p>
    </section>
  );
};
