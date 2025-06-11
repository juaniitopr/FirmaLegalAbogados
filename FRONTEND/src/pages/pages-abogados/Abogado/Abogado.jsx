import React, { useState, useEffect } from 'react';
import './abogado.css';

const Abogado = () => {
  // Llamadas a la Api
  const Api1 = 'http://localhost:9000/api/procesos';
  const Api2 = 'http://localhost:9000/api/agendas';

  // Estados para manejar los datos
  const [procesos, setProcesos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCita, setSelectedCita] = useState(null);
  const [selectedProceso, setSelectedProceso] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllProcesses, setShowAllProcesses] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [abogadoData, setAbogadoData] = useState(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Obtener datos del abogado y procesos
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      try {
        // Obtener datos del abogado del token
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAbogadoData({
          nombres: payload.nombre,
          apellidos: payload.apellido,
          identificacion: payload.numeroIdentificacion,
          telefono: payload.telefono,
          email: payload.email,
          rol: payload.nombre_rol
        });

        // Obtener procesos
        const procesosResponse = await fetch(Api1, {
          headers: { 'Authorization': `${token}` }
        });
        if (!procesosResponse.ok) throw new Error('Error en la solicitud de procesos');
        const procesosData = await procesosResponse.json();
        setProcesos(procesosData);

        // Obtener citas
        const citasResponse = await fetch(Api2, {
          headers: { 'Authorization': `${token}` }
        });
        if (!citasResponse.ok) throw new Error('Error en la solicitud de citas');
        const citasData = await citasResponse.json();
        setCitas(citasData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones del calendario
  const handleDayClick = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0);
    const cita = citas.find(c => new Date(c.fecha).toDateString() === date.toDateString());
    setSelectedCita(cita);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const emptyDays = Array.from({ length: (firstDayOfMonth + 6) % 7 }, (_, i) => (
      <div className="day empty" key={`empty-${i}`}></div>
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasCita = citas.some(c => new Date(c.fecha).toDateString() === date.toDateString());

      return (
        <div 
          className={`day ${hasCita ? 'has-cita' : ''}`} 
          key={i}
          onClick={() => handleDayClick(date)}
        >
          {day}
        </div>
      );
    });

    return [...emptyDays, ...days];
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleProcesoClick = (proceso) => {
    setSelectedProceso(proceso);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProceso(null);
  };

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

  // Calcular estadísticas
  const totalProcesos = procesos.length;
  const procesosActivos = procesos.filter(p => p.estado === 'activo').length;
  const procesosInactivos = procesos.filter(p => p.estado === 'inactivo').length;

  return (
    <div className="dashboard-abogado">
      <header className="welcome-header">
        <h1 className="welcome-title">Bienvenido, <span className="client-name">{abogadoData?.nombres} {abogadoData?.apellidos}</span></h1>
      </header>
      
      <main className="dashboard-content">
        <div className="stats-summary">
          <div className="stat-card">
            <h3>Procesos Totales</h3>
            <p>{totalProcesos}</p>
          </div>
          <div className="stat-card">
            <h3>Procesos Activos</h3>
            <p>{procesosActivos}</p>
          </div>
          <div className="stat-card">
            <h3>Procesos Inactivos</h3>
            <p>{procesosInactivos}</p>
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
                <div 
                  key={proceso.id_proceso} 
                  className="process-card"
                  onClick={() => handleProcesoClick(proceso)}
                >
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

        <section className="calendar-section">
          <div 
            className="section-header toggle-header"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <h2>Agenda de citas</h2>
            <i className={`icon-arrow ${showCalendar ? 'up' : 'down'}`}></i>
          </div>
          
          {showCalendar && (
            <div className="card calendar-container">
              <div className="calendar-header">
                <button className="nav-btn" onClick={handlePrevMonth}>
                  &lt;
                </button>
                <div className="month-year">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <button className="nav-btn" onClick={handleNextMonth}>
                  &gt;
                </button>
              </div>
              <div className="calendar-days">
                <div className="day-name">Lun</div>
                <div className="day-name">Mar</div>
                <div className="day-name">Mié</div>
                <div className="day-name">Jue</div>
                <div className="day-name">Vie</div>
                <div className="day-name">Sáb</div>
                <div className="day-name">Dom</div>
                {renderCalendar()}
              </div>
              
              {selectedCita && (
                <div className="cita-detalle">
                  <h3>Cita programada</h3>
                  <div className="cita-info">
                    <p><strong>Fecha:</strong> {selectedCita.fecha}</p>
                    <p><strong>Hora:</strong> {selectedCita.hora}</p>
                    <p><strong>Descripción:</strong> {selectedCita.descripcion}</p>
                    <p><strong>Estado:</strong> <span className={`status-badge ${selectedCita.estado.toLowerCase()}`}>{selectedCita.estado}</span></p>
                    <p><strong>ID Proceso:</strong> {selectedCita.id_proceso}</p>
                  </div>
                </div>
              )}
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
                  <button className="modal-button secondary">Descargar documentos</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Abogado;