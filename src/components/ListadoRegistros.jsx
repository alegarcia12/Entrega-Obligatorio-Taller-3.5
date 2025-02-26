import { useSelector } from 'react-redux';
import Eliminar from './Eliminar';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';




const ListadoRegistros = () => {

    const registros = useSelector((state) => state.registros.registros);
    const actividades = useSelector((state) => state.actividades.listaActividades) || [];
    const loading = useSelector((state) => state.spinner);
    const [filtro, setFiltro] = useState('historico');

    const obtenerImagenActividad = (idActividad) => {
        const actividad = actividades.find((actividad) => actividad.id == idActividad);
        if (actividad) {
            return `https://movetrack.develotion.com/imgs/${actividad.imagen}.png`;
        }
        return '';
    };

    const filtrarRegistros = () => {
        const hoy = moment();
        return registros.filter((registro) => {
            const fechaRegistro = moment(registro.fecha, "YYYY-MM-DD"); // Convertimos la fecha del registro

            if (!fechaRegistro.isValid()) {
                console.error(`Fecha inválida: ${registro.fecha}`);
                return false;
            }

            if (filtro === 'semana') {
                return fechaRegistro.isAfter(hoy.clone().subtract(7, 'days'));
            } else if (filtro === 'mes') {
                return fechaRegistro.isAfter(hoy.clone().subtract(1, 'months'));
            }
            return true;
        });
    };

    const registrosFiltrados = filtrarRegistros();

    return (
        <div>
            <h2 className="mb-3">Listado de Registros</h2>
            <div className="d-flex justify-content-center mb-3 align-items-center">
                <label className="form-label fw-semibold me-2 mb-0" style={{ minWidth: "150px" }}>
                    Filtrar por fecha:
                </label>
                <select className="form-select w-auto" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="semana">Última semana</option>
                    <option value="mes">Último mes</option>
                    <option value="historico">Histórico</option>
                </select>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                    <CircularProgress color="primary" />
                </div>
            ) : registrosFiltrados.length === 0 ? (
                <p style={{color:"white", fontWeight:"bold"}}>No hay registros disponibles.</p>
            ) : (
                <ul className="list-group">
                    {registrosFiltrados.map((registro, index) => (
                        <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <img src={obtenerImagenActividad(registro.idActividad)}
                                    alt={`Actividad ${registro.idActividad}`}
                                    className="img-fluid"
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div>
                                    <strong>Actividad:</strong> {registro.idActividad},
                                    <strong> Tiempo:</strong> {registro.tiempo} minutos,
                                    <strong> Fecha:</strong> {registro.fecha}
                                </div>
                            </div>
                            <Eliminar idRegistro={registro.id} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default ListadoRegistros

