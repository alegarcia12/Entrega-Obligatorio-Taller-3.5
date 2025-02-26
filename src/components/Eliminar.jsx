import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { eliminarRegistro } from "../redux/features/sliceRegistros";

const Eliminar = ({ idRegistro }) => {
    const dispatch = useDispatch();

    const confirmarEliminacion = async () => {
        try {
            const response = await fetch(`https://movetrack.develotion.com/registros.php?idRegistro=${idRegistro}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": localStorage.getItem("apiKey"),
                    "iduser": localStorage.getItem("idUser")
                }
            });

            if (!response.ok) {
                toast.error("Error al eliminar el registro");
                return;
            }

            dispatch(eliminarRegistro(idRegistro));
            toast.success("Registro eliminado correctamente");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleEliminar = () => {
        toast.dismiss()
        toast.info(
            <div>
                <p>¿Seguro que quieres eliminar este registro?</p>
                <button onClick={confirmarEliminacion} style={styles.buttonConfirm}>Sí</button>
                <button onClick={() => toast.dismiss()} style={styles.buttonCancel}>No</button>
            </div>,
            { autoClose: false }
        );
    };

    return (
        <button
            onClick={handleEliminar}
            title="Eliminar"
            style={{background: "none",border: "none",cursor: "pointer",color: "red",fontSize: "20px"}}
        >
            <FaTrashAlt />
        </button>
    );
};

const styles = {
    buttonConfirm: {
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        padding: "5px 10px",
        marginRight: "10px",
        cursor: "pointer",
        borderRadius: "5px",
    },
    buttonCancel: {
        backgroundColor: "#5bc0de",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "5px",
    }
};

Eliminar.propTypes = {
    idRegistro: PropTypes.number.isRequired
};

export default Eliminar;
