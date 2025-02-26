import { useSelector } from 'react-redux';
import moment from 'moment';
import { CircularProgress } from '@mui/material';

const TiempoDiario = () => {
    const registros = useSelector((state) => state.registros.registros);
    const loading = useSelector((state) => state.spinner);

    const hoy = moment().format("YYYY-MM-DD");

    const tiempoDiario = registros.filter((registro) => moment(registro.fecha, "YYYY-MM-DD").isSame(hoy, "day"))
        .reduce((total, registro) => total + Number(registro.tiempo), 0);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Tiempo Diario 📅</h2>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color:"white"}}>
                    {tiempoDiario} minutos
                </p>
            )}
        </div>
    );
};

export default TiempoDiario;
