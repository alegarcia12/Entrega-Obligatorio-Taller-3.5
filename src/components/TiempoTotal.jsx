import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/material";

const TiempoTotal = () => {
    const registros = useSelector((state) => state.registros.registros);
    const loading = useSelector((state) => state.spinner);
    const tiempoTotal = registros.reduce((total, registro) => total + Number(registro.tiempo), 0);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Tiempo Total ⏳</h2>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
                    {tiempoTotal} minutos
                </p>
            )}
        </div>
    );
}

export default TiempoTotal;