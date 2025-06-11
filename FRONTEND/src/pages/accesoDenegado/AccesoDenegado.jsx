import React from 'react';
import { Button } from '@mui/material'; // Usamos Material-UI para el botón
import { useNavigate } from 'react-router-dom'; // Para redirigir a otra ruta

const AccesoDenegado = () => {
    const navigate = useNavigate(); // Hook para redirigir al usuario

    const handleRedirigir = () => {
        navigate('/homepage'); // Redirige al usuario al Home, o a la página de inicio de tu preferencia
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Acceso Denegado</h2>
            <p style={styles.message}>No tienes los permisos necesarios para acceder a esta página.</p>
            <Button variant="contained" color="primary" onClick={handleRedirigir}>
                Regresar al Inicio
            </Button>
        </div>
    );
};

// Estilos simples con objeto de JavaScript
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#666',
    },
};

export default AccesoDenegado;
