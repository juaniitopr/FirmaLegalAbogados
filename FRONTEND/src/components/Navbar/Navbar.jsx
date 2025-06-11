import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import normalizeText from "../../utils/textUtils.js";
import obtenerRutasPermitidas from "../routes/rutasPermitidas.js";
import "./navbar.css";

const Navbar = () => {
  const { logout, isAuthenticated, role } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [rutas, setRutas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las rutas permitidas cuando cambia la autenticación o el rol    
    if (isAuthenticated && role) {
      const rutasActualizadas = obtenerRutasPermitidas(isAuthenticated, role);
      setRutas(rutasActualizadas);
    }
  }, [isAuthenticated, role]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logout();
    setMenuVisible(false);
    navigate("/homepage"); // Redirige al homepage después del logout
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  const renderLinks = () =>
    rutas.map((ruta) => (
      <Link to={normalizeText(ruta.ruta)} key={ruta.nombre} onClick={handleLinkClick}>
        {ruta.nombre}
      </Link>
    ));

  return (
    <div className="todo">
      <header className="header-navbar">
        <h1 className="P1">
          L<span className="P2">&</span>O
        </h1>
        <div className="navegacion">
   
            <button onClick={handleLogout} className="btnlogin-homepage">Cerrar Sesión</button>
            
        </div>
      </header>
      <div className="opciones">
        <div className="opciones-container">
          <center>{renderLinks()}</center>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
