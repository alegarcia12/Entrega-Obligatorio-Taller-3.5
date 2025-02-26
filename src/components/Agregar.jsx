import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { agregarRegistro } from '../redux/features/sliceRegistros';
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Agregar = () => {

    const dispatch = useDispatch();
    const actividades = useSelector((state) => state.actividades.listaActividades) || [];
    const [actividadSeleccionada, setActividadSeleccionada] = useState("")
    const [tiempo, setTiempo] = useState(0);
    const [fecha, setFecha] = useState();
    const [mensajeError, setMensajeError] = useState(undefined);
    const hoy = moment().format("YYYY-MM-DD");


    const handleTiempoChange = (e) => {
        setTiempo(e.target.value);
    };

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const handleActividad = (e) => {
        const valorPais = e.target.value;
        setActividadSeleccionada(valorPais);
        setMensajeError(undefined);
    };

    const handleAgregar = () => {
        if (tiempo <= 0) {
            setMensajeError("El tiempo debe ser mayor a 0.");
            return;
        }

        if (!fecha || moment(fecha).isAfter(hoy)) {
            setMensajeError(`La fecha no puede ser mayor a la de hoy: ${hoy}`);
            return;
        }

        const newRegistro = {
            idActividad: actividadSeleccionada,
            idUsuario: localStorage.getItem("idUser"),
            tiempo: tiempo,
            fecha: fecha,
        }

        fetch('https://movetrack.develotion.com/registros.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apiKey"),
                "iduser": localStorage.getItem("idUser")
            },
            body: JSON.stringify(newRegistro)
        })
            .then(response => response.json())
            .then(data => {
                if (data.codigo === 200) {
                    toast.success("Actividad agregada con éxito 🎉");
                    const idRegistro = data.idRegistro
                    const nuevoRegistro = {
                        id: idRegistro,
                        idUser: localStorage.getItem("idUser"),
                        idActividad: actividadSeleccionada,
                        tiempo: tiempo,
                        fecha: fecha,
                    }
                    dispatch(agregarRegistro(nuevoRegistro));
                    setMensajeError();
                } else {
                    toast.error(`${data.mensaje}`);
                }
            })
            .catch(error => {
                toast.error(`${error.message}`);
            });
    }



    return (
        <>
            <div className="container text-start">
                <h2 className="text-center mb-4">Agregar Actividad</h2>

                <div className="mb-3">
                    <label htmlFor="txtAgregar" className="form-label">Actividad:</label>
                    <select className="form-select" id="txtAgregar" onChange={handleActividad} value={actividadSeleccionada}>
                        <option value="" disabled>Seleccione una actividad</option>
                        {actividades.map((actividad) => (
                            <option key={actividad.id} value={actividad.id}>
                                {actividad.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="txtTiempo" className="form-label">Tiempo:</label>
                    <input
                        type="number"
                        name="txtTiempo"
                        id="txtTiempo"
                        className="form-control"
                        placeholder="En minutos..."
                        onChange={handleTiempoChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="txtData" className="form-label">Fecha:</label>
                    <div className="input-group">
                        <input
                            type="date"
                            name="txtData"
                            id="txtData"
                            className="form-control"

                            onChange={handleFechaChange}
                        />

                    </div>
                </div>

                <button
                    className={`btn btn-primary mt-3 w-100 ${!tiempo || !fecha || actividades.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleAgregar()}
                    disabled={!tiempo || !fecha || actividades.length === 0}
                >
                    Agregar
                </button>

                {mensajeError && (
                    <div className="alert alert-danger mt-3 py-2 text-center" role="alert">
                        ⚠ {mensajeError}
                    </div>
                )}


            </div>
        </>
    );

}

export default Agregar;