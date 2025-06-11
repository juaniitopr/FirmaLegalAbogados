import './processClient.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProcessClient = () => {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      try {
        // Decodificar el token para obtener el número de identificación
        const payload = JSON.parse(atob(token.split('.')[1]));
        const numeroIdentificacion = payload.numeroIdentificacion;

        if (!numeroIdentificacion) {
          throw new Error('No se pudo obtener el número de identificación del token');
        }

        // Hacer la solicitud para obtener los procesos del cliente
        const response = await axios.get(`http://localhost:9000/api/procesos/${numeroIdentificacion}`, {
          headers: {
            'Authorization': `${token}`
          }
        });

        if (response.data.User_found && Array.isArray(response.data.User_found)) {
          setProcesos(response.data.User_found);
        } else {
          setProcesos([]);
        }
      } catch (error) {
        console.error('Error fetching procesos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesos();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Procesos del Cliente</h1>
      {procesos.length > 0 ? (
        <ul>
          {procesos.map((proceso) => (
            <li key={proceso.id_proceso}>
              <h2>Proceso ID: {proceso.id_proceso}</h2>
              <p>Descripción: {proceso.descripcion}</p>
              <p>Estado: {proceso.estado}</p>
              <p>Fecha de inicio: {proceso.fecha_inicio}</p>
              <p>Numero de Identificacion de tu abogado: {proceso.numeroIdentificacionAbogado}</p>
              <p>Tipo de proceso: {proceso.id_tipo}</p>
              <p>Subproceso: {proceso.id_subproceso}</p>
              <p>Documento Especifico: {proceso.id_docesp || "Cargando.."} </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay procesos disponibles para este cliente.</p>
      )}
    </div>
  );
};

export default ProcessClient;
