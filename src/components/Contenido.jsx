import { useEffect } from 'react';
import Agregar from './Agregar';
import { useNavigate } from "react-router-dom";
import { cargaInicialActividades } from "../redux/features/sliceActividades";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { cargaRegistros } from '../redux/features/sliceRegistros';
import ListadoRegistros from './ListadoRegistros';
import { setCargando } from '../redux/features/sliceSpinner';
import TiempoTotal from './TiempoTotal';
import TiempoDiario from './TiempoDiario';
import GraficaActividades from './GraficaActividades';
import GraficaMinutos from './GraficaMinutos';
import EvolucionPersonal from './EvolucionPersonal';


function Contenido() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const apiKey = localStorage.getItem("apiKey");

        if (!apiKey) {
            navigate("/login");
            return;
        }
        comprobarLogin();
        cargarRegistros();
    }, [])

    const comprobarLogin = () => {

        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
            navigate("/login");
            return;
        }
        fetch(`https://movetrack.develotion.com/actividades.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem("apiKey"),
                'iduser': localStorage.getItem("idUser")
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(cargaInicialActividades(data.actividades)); //cargamos en redux
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`)
            });
    }

    const cargarRegistros = () => {
        const idUser = localStorage.getItem('idUser');

        dispatch(setCargando(true));

        fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem("apiKey"),
                'iduser': localStorage.getItem("idUser")
            },
        })
            .then((response) => response.json())
            .then(data => {
                if (data.codigo === 200) {
                    dispatch(cargaRegistros(data.registros));
                    dispatch(setCargando(false));
                } else {
                    toast.error(data.mensaje);
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`)
            });
    }

    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("idUser");
        navigate("/login");
    };

    return (
        <div className="contenido">

            <div className="headerComponentes">
                <header>
                    <div className="text-primary container-fluid d-flex justify-content-end align-items-center px-4">
                        
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </header>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="fixed-size-container">
                                <Agregar />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="fixed-size-container">
                                <ListadoRegistros cargaRegistros={cargarRegistros} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            
            <div className="seccion-graficas container-fluid mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="fixed-size-container">
                            <GraficaActividades />
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="fixed-size-container">
                            <GraficaMinutos />
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="tiempoEvolucion">
                <div className="container-fluid mt-4">
                    <div className="row">
                        
                        <div className="col-md-6 mb-4">
                            
                            <div className="fixed-size-container d-flex justify-content-between align-items-center">
                                <TiempoTotal />
                                <TiempoDiario />
                            </div>
                        </div>

                       
                        <div className="col-md-6 mb-4">
                            <div className="fixed-size-container">
                                <EvolucionPersonal />
                            </div>
                        </div>
                    </div>
                </div>

                <footer>Obligatorio García Zamora <span>©</span> Todos los derechos están reservados. 2025 </footer>
            </div>
        </div>
    );


}


export default Contenido;