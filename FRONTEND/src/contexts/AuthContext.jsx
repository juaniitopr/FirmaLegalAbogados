import React, { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const AuthContext = createContext();

// Proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // El rol del usuario (Asistente, Abogado, Cliente)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Revisar si hay un token en localStorage cuando la app se carga
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
        setIsAuthenticated(true);
        setRole(decodedToken.nombre_rol); // Extraer el rol
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token"); // Si el token es inválido, limpiar localStorage
        setIsAuthenticated(false);
        setRole(null);
      }
    }
    setIsLoading(false); // Terminar el proceso de carga
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setIsAuthenticated(true);
    setRole(decodedToken.nombre_rol); // Asignar rol del usuario
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    window.location.href = "/homepage"; // Redirigir a la página de inicio
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
