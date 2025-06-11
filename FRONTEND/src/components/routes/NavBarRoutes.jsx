
import React from "react";
import { Route, Routes } from "react-router-dom";

// Importes de paginas publicas
import Homepage from "../../pages/Home/Homepage.jsx";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";


// Importes de paginas de abogados
import Abogado from "../../pages/pages-abogados/Abogado/Abogado.jsx";

// Importes de paginas de clientes
import D_cliente from "../../pages/pages-clientes/D_cliente/D_cliente.jsx";
import ProcessClient from "../../pages/pages-clientes/procss-clint/ProcessClient.jsx"
import AgendtClint from "../../pages/pages-clientes/agendt-clint/AgendtClint.jsx";

// Importes de paginas de asistentes
import Cliente from "../../pages/pages-asistentes/Cliente/Cliente.jsx";
import Agenda from "../../pages/pages-asistentes/Agenda/Agenda.jsx";
import Factura from "../../pages/pages-asistentes/Factura/Factura.jsx";
import Usuario from "../../pages/pages-asistentes/Usuario/Usuario.jsx";
import Proceso from "../../pages/pages-asistentes/Proceso/Proceso.jsx";
import Principal from "../../pages/pages-asistentes/principal/Principal.jsx";

const NavBarRoutes = () => {

    return (

      <Routes>

        <Route path="/homepage" element={<Homepage />} />

        {/* Rutas protegidas con roles específicos */}
        <Route path="/abogado" element={<ProtectedRoute element={Abogado} allowedRoles={['abogado']} />} />
        
        <Route path="/usuario" element={<ProtectedRoute element={Usuario} allowedRoles={['asistente']} />} />
        <Route path="/cliente" element={<ProtectedRoute element={Cliente} allowedRoles={['asistente']} />} />
        <Route path="/proceso" element={<ProtectedRoute element={Proceso} allowedRoles={['asistente']} />} />
        <Route path="/agenda" element={<ProtectedRoute element={Agenda} allowedRoles={['asistente']} />} />
        <Route path="/facturas" element={<ProtectedRoute element={Factura} allowedRoles={['asistente']} />} />
        <Route path="/page-principal" element={<ProtectedRoute element={Principal} allowedRoles={['asistente']} />} />
        
        <Route path="/d_cliente" element={<ProtectedRoute element={D_cliente} allowedRoles={['cliente']} />} />
        <Route path="/processclient" element={<ProtectedRoute element={ProcessClient} allowedRoles={['cliente']} />} />
        <Route path="/agend-clint" element={<ProtectedRoute element={AgendtClint} allowedRoles={['cliente']} />} />

        
      </Routes>
    );
};

export default NavBarRoutes;
