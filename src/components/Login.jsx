import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginApiObligatorio } from "../services/loginService";
import { useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState(undefined);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleUsuario = (e) => {
    const valorUsuario = e.target.value;
    setUsuario(valorUsuario);
    setMensajeError(undefined);
  };

  const handlePassword = (e) => {
    const valorPassword = e.target.value;
    setPassword(valorPassword);
    setMensajeError(undefined);
  };

  const handleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const datos = await loginApiObligatorio(usuario, password);
      const objDatosusuario = JSON.parse(datos);
      let localStorage = window.localStorage;
      localStorage.setItem("apiKey", objDatosusuario.apiKey);
      localStorage.setItem("idUser", objDatosusuario.id);
      navigate("/");
    } catch (error) {
      setMensajeError(error.message);
    }
  };


  return (
    <div className="container d-flex flex-column flex-lg-row min-vh-100 mx-auto">
      
      <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center p-5 pt-0">

        <img src="/logo.png" alt="Logo" className="mb-4 img-fluid" />

        <motion.h2 className="mb-3 text-center login-title"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
          
          Por favor, inicie sesión
        </motion.h2>

        <Form onSubmit={submit} className="w-100 formulario-auth" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Usuario</Form.Label>
            <Form.Control
              value={usuario}
              type="text"
              placeholder="Ingrese usuario"
              onChange={handleUsuario}
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start position-relative">
            <Form.Label className="fw-bold">Password</Form.Label>
            <div className="position-relative">
              <Form.Control value={password}
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingrese contraseña"
                onChange={handlePassword}>
              </Form.Control>
              <span onClick={handleMostrarPassword}
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer" }}
              >
                {mostrarPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className={`w-100 ${(!usuario || !password) ? "opacity-50" : ""}`}
            disabled={!usuario || !password}
          >
            Ingresar
          </Button>


          <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <p className="mb-0 fw-bold">¿No tienes una cuenta?</p>
            <Button variant="outline-danger"
              className="mx-2"
              onClick={() => navigate("/registro")} >
              Registrarse
            </Button>
          </div>

          {mensajeError && (
            <div className="alert alert-danger mt-3 py-2 text-center" role="alert">
              ⚠ {mensajeError}
            </div>
          )}
        </Form>
      </div>

      
      <div className="col-lg-6 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: "#424346", minHeight: "100vh"}}>
        <div className="text-center p-5">
          <motion.h1 className="fw-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            ¡Bienvenido/a a <span style={{ color: "turquoise" }}>GZgym</span> APP!
          </motion.h1>

          <motion.p className="fs-4 mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}>
            Tu compañero ideal para registrar y mejorar tu actividad física.
          </motion.p>


          <motion.p className="fs-6 mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}>
            Lleva un seguimiento de tus entrenamientos, fija metas y alcanza nuevos niveles de rendimiento.
            ¡Empieza hoy y conviértete en la mejor versión de ti mismo!
          </motion.p>
        </div>
      </div>

    </div>

  );
};

export default Login;
