import React, { useState, useEffect, useContext } from "react";
import { fetchUsers } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import Imagen from "../imagen/Imagen";

function Bienvenido_cliente() {
    const [users, setUsers] = useState([]);
    const { role, isAuthenticated } = useContext(AuthContext);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data);

                if (isAuthenticated && role === 'cliente') {
                    // Obtener el número de identificación del usuario logueado desde el token
                    const token = localStorage.getItem("token");
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    const userIdentification = decodedToken.numeroIdentificacion;

                    // Buscar el usuario por su número de identificación
                    const currentUser = response.data.find(
                        user => user.numeroIdentificacion === userIdentification
                    );
                    if (currentUser) {
                        setUserName(currentUser.nombres);
                    }
                }
            } catch (error) {
                console.error('Error obteniendo usuarios:', error);
            }
        };

        getUsers();
    }, [isAuthenticated, role]);

    return(
        <div className="container">
            <h1 className="welcome"><Imagen/> Bienvenido {userName || 'sin datps'}</h1>
        </div>
    );
}

export default Bienvenido_cliente;
