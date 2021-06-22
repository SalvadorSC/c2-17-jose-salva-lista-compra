import { useContext } from "react";
import { FaTimesCircle, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { DatosArticulosContext } from "../context/DatosArticulosContext";
export const Info = () => {
  const { numeroArticulos, numeroArticulosComprados } = useContext(
    DatosArticulosContext
  );
  const parametros = useParams();
  console.log(parametros);
  return (
    <section className="info espaciado bloque-superior">
      <i className="icono">
        <FaPlusCircle /> <FaMinusCircle />
      </i>
      <p className="n-articulos">
        {numeroArticulosComprados}/{numeroArticulos} comprados
      </p>
    </section>
  );
};
