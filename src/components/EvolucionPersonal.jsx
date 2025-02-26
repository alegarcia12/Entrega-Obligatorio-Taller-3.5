import moment from "moment";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const EvolucionPersonal = () => {
  const registros = useSelector((state) => state.registros.registros) || [];
  const loading = useSelector((state) => state.spinner);

  const hoy = moment().format("YYYY-MM-DD");
  const ayer = moment().subtract(1, "days").format("YYYY-MM-DD");

  const minutosHoy = registros
    .filter((registro) => moment(registro.fecha).format("YYYY-MM-DD") === hoy)
    .reduce((acc, registro) => acc + Number(registro.tiempo), 0);

  const minutosAyer = registros
    .filter((registro) => moment(registro.fecha).format("YYYY-MM-DD") === ayer)
    .reduce((acc, registro) => acc + Number(registro.tiempo), 0);

  const esMejorHoy = minutosHoy > minutosAyer;

  return (
    <div>
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#333", marginBottom: "10px", }}>
        Evolución Personal 📈
      </motion.h2>

      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        style={{width: "60%",border: "none",height: "3px",backgroundColor: "#007bff",margin: "auto",marginBottom: "15px",}}
      />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: esMejorHoy ? "rgb(13,110,253)" : "red", }}
        >
          {esMejorHoy ? "¡Bien hechoooo! 🚀" : "¡Que no decaiga! 💪"}

          <div className="mt-3">
            <img
              src={esMejorHoy ? "/exito.jpg" : "/motivacion.jpg"}
              alt={esMejorHoy ? "Foto exito" : "Foto motivacion"}
              className="img-fluid"
              style={{ maxWidth: "200px", borderRadius: "10px" }}
            />
          </div>

        </motion.div>
      )}
    </div>
  );
};

export default EvolucionPersonal;

