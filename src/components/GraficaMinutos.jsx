import Grafica from "./Grafica";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";

const GraficaMinutos = () => {
    const registros = useSelector((state) => state.registros.registros);

    const hoy = moment();
    const ultimos7Dias = [...Array(7)].map((_, i) =>
        hoy.clone().subtract(i, "days").format("YYYY-MM-DD")
    ).reverse();

    const minutosPorDia = registros.reduce((acc, registro) => {
        const fecha = moment(registro.fecha, ["YYYY-MM-DD", "DD/MM/YYYY"], true).format("YYYY-MM-DD");
        const minutos = Number(registro.tiempo) || 0;

        if (ultimos7Dias.includes(fecha)) {
            acc[fecha] = (acc[fecha] || 0) + minutos;
        }
        return acc;
    }, {});

    const etiquetas = ultimos7Dias.map((fecha) =>
        moment(fecha).locale("es").format("ddd DD")
    );
    const datos = ultimos7Dias.map((fecha) => minutosPorDia[fecha] || 0);

    return (
        <Grafica
            etiquetas={etiquetas}
            datos={datos}
            nombreGrafica={"Minutos ejercitados en la última semana"}
            nombreDatos={"Minutos"}
        />
    );
};

export default GraficaMinutos;
