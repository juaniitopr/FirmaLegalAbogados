import './dashboardCliente.css';
import React, { useState, useEffect } from 'react';


const Usuario = () => {
  const [procesos, setProcesos] = useState([]);
  const [clienteData, setClienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showAllProcesses, setShowAllProcesses] = useState(false);
  const [selectedProceso, setSelectedProceso] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      try {
        // Decodificar el token para obtener los datos del cliente
        const payload = JSON.parse(atob(token.split('.')[1]));
        setClienteData({
          nombres: payload.nombre,
          apellidos: payload.apellido,
          identificacion: payload.numeroIdentificacion,
          telefono: payload.telefono,
          email: payload.email,
          rol: payload.nombre_rol
        });

        // Obtener los procesos del cliente
        const response = await fetch(`http://localhost:9000/api/procesos/${payload.numeroIdentificacion}`, {
          headers: {
            'Authorization': `${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        
        if (data.User_found && Array.isArray(data.User_found)) {
          setProcesos(data.User_found);
        } else {
          setProcesos([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

    const handleProcesoClick = (proceso) => {
    setSelectedProceso(proceso);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProceso(null);
  };
  
  return (
    
    <div className="dashboard-cliente">  
    <header className="welcome-header">
        <h1 className="welcome-title">Bienvenido, <span className="client-name">{clienteData?.nombres} {clienteData?.apellidos}</span></h1>
      </header>
    
      <main className="dashboard-content">

        <div className="stats-summary">
          <div className="stat-card">
            <h3>Procesos Totales</h3>
            <p>{procesos.length}</p>
          </div>
          <div className="stat-card">
            <h3>Procesos Activos</h3>
            <p>{procesos.filter(p => p.estado === 'activo').length}</p>
          </div>
          <div className="stat-card">
            <h3>Procesos Inactivos</h3>
            <p>{procesos.filter(p => p.estado === 'inactivo').length}</p>
          </div>
        </div>

        <section className="process-section">
          <div className="section-header">
            <h2>Tus Procesos</h2>
            {procesos.length > 3 && (
              <button 
                className="view-all"
                onClick={() => setShowAllProcesses(!showAllProcesses)}
              >
                {showAllProcesses ? 'Ver menos' : 'Ver todos'}
              </button>
            )}
          </div>
          
          {procesos.length > 0 ? (
            <div className="process-list">
              {(showAllProcesses ? procesos : procesos.slice(0, 3)).map(proceso => (
                <div key={proceso.id_proceso} className="process-card" onClick={() => handleProcesoClick(proceso)}>
                  <div className="process-info">
                    <h3>{proceso.descripcion || 'Proceso sin descripción'}</h3>
                    <div className="process-meta">
                      <span>ID: {proceso.id_proceso}</span>
                      <span className={`status-badge ${proceso.estado}`}>
                        {proceso.estado}
                      </span>
                    </div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${proceso.estado}`}
                        style={{ width: proceso.estado === 'activo' ? '100%' : '0%' }}
                      ></div>
                    </div>
                    <div className="progress-details">
                      <span>Última actualización: {new Date(proceso.fecha_creacion).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No tienes procesos registrados</p>
            </div>
          )}
        </section>

        <section className="personal-data-section">
          <div 
            className="section-header toggle-header"
            onClick={() => setShowPersonalData(!showPersonalData)}
          >
            <h2>Tus Datos Personales</h2>
            <i className={`icon-arrow ${showPersonalData ? 'up' : 'down'}`}></i>
          </div>
          
          {showPersonalData && clienteData && (
            <div className="personal-data-card">
              <div className="data-grid">
                <div className="data-item">
                  <label>Nombres:</label>
                  <p>{clienteData.nombres}</p>
                </div>
                <div className="data-item">
                  <label>Apellidos:</label>
                  <p>{clienteData.apellidos}</p>
                </div>
                <div className="data-item">
                  <label>Identificación:</label>
                  <p>{clienteData.identificacion}</p>
                </div>
                <div className="data-item">
                  <label>Teléfono:</label>
                  <p>{clienteData.telefono}</p>
                </div>
                <div className="data-item">
                  <label>Email:</label>
                  <p>{clienteData.email}</p>
                </div>
                <div className="data-item">
                  <label>Rol:</label>
                  <p>{clienteData.rol}</p>
                </div>
              </div>

            </div>
          )}
        </section>
        {modalOpen && selectedProceso && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2 className="modal-title">
                  <span className="modal-icon">📋</span>
                  Detalles del Proceso
                  <span className="modal-id">#{selectedProceso.id_proceso}</span>
                </h2>
                <button className="modal-close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-section">
                  <h3 className="section-title">Información General</h3>
                  <div className="modal-grid">
                    <div className="modal-item">
                      <label>Descripción</label>
                      <p>{selectedProceso.descripcion || 'No especificado'}</p>
                    </div>
                    <div className="modal-item">
                      <label>Estado</label>
                      <p className={`status-badge ${selectedProceso.estado}`}>
                        {selectedProceso.estado}
                      </p>
                    </div>
                    <div className="modal-item">
                      <label>Fecha de creación</label>
                      <p>{new Date(selectedProceso.fecha_creacion).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Documentos</h3>
                  <div className="modal-grid">
                    <div className="modal-item">
                      <label>Documento esperado</label>
                      <p>{selectedProceso.id_docesp || 'No especificado'}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="modal-button primary">Contactar abogado</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Usuario;