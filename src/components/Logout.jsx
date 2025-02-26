import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return null; //lei q sirve para no renderizar
};

export default Logout;
