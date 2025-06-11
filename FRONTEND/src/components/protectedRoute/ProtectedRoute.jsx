import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AccesoDenegado from "../../pages/accesoDenegado/AccesoDenegado.jsx";

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
    const { role } = useContext(AuthContext);  // Accede al rol desde el contexto

    if (!role) {
        // Si no hay rol, redirige al homepage
        return <Navigate to="/homepage" />;
    }

    // Verifica si el rol del usuario tiene acceso
    const hasAccess = allowedRoles.includes(role);

    return hasAccess ? <Element /> : <AccesoDenegado />;
};

export default ProtectedRoute;
