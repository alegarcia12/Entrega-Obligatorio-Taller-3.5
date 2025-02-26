import Grafica from "./Grafica";
import { useSelector } from "react-redux";


const GraficaActividades = () => {



  const actividades = useSelector((state) => state.actividades.listaActividades) || [];
  const registros = useSelector((state) => state.registros.registros);

  
  const contadorSesiones = registros.reduce((acc, registro) => {
    const idActividad = registro.idActividad;
    acc[idActividad] = (acc[idActividad] || 0) + 1;
    return acc;
  }, {});

  
  const etiquetas = Object.keys(contadorSesiones).map((id) => {
    const actividad = actividades.find((act) => act.id === parseInt(id));
    return actividad ? actividad.nombre : "Desconocida";
  });

  const datos = Object.values(contadorSesiones);

  return (
    <Grafica
      etiquetas={etiquetas}
      datos={datos}
      nombreGrafica={"Gráfico de sesiones por actividad"}
      nombreDatos={"Cantidad de Sesiones"}
    />
  );
};
export default GraficaActividades;
