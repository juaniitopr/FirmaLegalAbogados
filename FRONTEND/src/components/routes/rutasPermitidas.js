const obtenerRutasPermitidas = (isAuthenticated, role) => {
    // Asegúrate de que el rol no sea undefined o null
    role = role ?? "";

    // Rutas para usuarios con rol "Asistente"
    const rutasAsistente = [
        { nombre: "Home", ruta: "/page-principal", roles: ["asistente"] },
        { nombre: "Usuario", ruta: "/usuario", roles: ["asistente"] },
        { nombre: "Cliente", ruta: "/cliente", roles: ["asistente"] },
        { nombre: "Proceso", ruta: "/proceso", roles: ["asistente"] },
        { nombre: "Agenda", ruta: "/agenda", roles: ["asistente"] },
        { nombre: "Facturas", ruta: "/facturas", roles: ["asistente"] },
    ];

    // Rutas para usuarios con rol "Abogado"
    const rutasAbogado = [
       
    ];

    // Rutas para usuarios con rol "Cliente"
    const rutasUsuario = [
        

    ];

    // Combina las rutas basadas en el rol del usuario
    let rutasPermitidas = [];

    if (isAuthenticated) {
        if (role === "asistente") {
            rutasPermitidas = rutasAsistente;
        } else if (role === "abogado") {
            rutasPermitidas = rutasAbogado;
        } else if (role === "cliente") {
            rutasPermitidas = rutasUsuario;
        }
    }    
    return rutasPermitidas;
};

export default obtenerRutasPermitidas;
