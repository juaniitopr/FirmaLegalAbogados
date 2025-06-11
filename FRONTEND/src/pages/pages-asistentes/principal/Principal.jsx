import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Principal.css';
import axios from 'axios';

const Principal = () => {
    const navigate = useNavigate();
    const [processes, setProcesses] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        active: 0,
        inactive: 0,
        total: 0,
        upcomingAppointments: 0
    });
    const [asistenteData, setAsistenteData] = useState(null);

    const tasks = [
        { id: 1, description: 'Revisar correos pendientes', due: 'Hoy', priority: 'Alta' },
        { id: 2, description: 'Preparar informe mensual', due: 'Mañana', priority: 'Media' },
        { id: 3, description: 'Actualizar datos de contacto', due: '30/04/2023', priority: 'Baja' }
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                // Obtener datos del asistente del token
                const payload = JSON.parse(atob(token.split('.')[1]));
                setAsistenteData({
                    nombres: payload.nombre,
                    apellidos: payload.apellido,
                    identificacion: payload.numeroIdentificacion,
                    telefono: payload.telefono,
                    email: payload.email,
                    rol: payload.nombre_rol
                });

                const processesResponse = await axios.get("http://localhost:9000/api/procesos", {
                    headers: { Authorization: token },
                });

                const activeProcesses = processesResponse.data.filter(p => p.estado === 'activo').slice(0, 3);
                setProcesses(activeProcesses);

                const appointmentsResponse = await axios.get("http://localhost:9000/api/agendas", {
                    headers: { Authorization: token },
                });

                const sortedAppointments = appointmentsResponse.data
                    .sort((a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`))
                    .slice(0, 3);

                setAppointments(sortedAppointments);

                setStats({
                    active: processesResponse.data.filter(p => p.estado === 'activo').length,
                    inactive: processesResponse.data.filter(p => p.estado === 'inactivo').length,
                    total: processesResponse.data.length,
                    upcomingAppointments: appointmentsResponse.data.length
                });

            } catch (err) {
                console.error("Error al cargar datos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="principal-container">
            
            <header className="welcome-header">
                <h1 className="welcome-title">Bienvenido, <span className="client-name">{asistenteData?.nombres} {asistenteData?.apellidos}</span></h1>
            </header>

            <div className="dashboard-centered">
            <div className="dashboard-grid">

                {/* Procesos */}
                <section className="card processes-section">
                    <h2><i className="icon process-icon"></i> Procesos en Curso</h2>
                    {loading ? (
                        <div className="text-center my-3">
                            <span>Cargando procesos...</span>
                        </div>
                    ) : (
                        <>
                            <div className="process-list">
                                {processes.length > 0 ? (
                                    processes.map(process => (
                                        <div key={process.id_proceso} className="process-item">
                                            <div className="process-info">
                                                <h3>{process.descripcion}</h3>
                                                <span>Estado: {process.estado}</span>
                                                <span>Cliente: {process.numeroIdentificacionCliente}</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className={`progress-fill ${process.estado === 'activo' ? 'active' : 'inactive'}`}
                                                    style={{ width: process.estado === 'activo' ? '100%' : '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center my-3">
                                        <span>No hay procesos activos</span>
                                    </div>
                                )}
                            </div>
                            <div className="process-stats">
                                <span>Activos: {stats.active}</span>
                                <span>Inactivos: {stats.inactive}</span>
                                <span>Total: {stats.total}</span>
                            </div>
                            <button 
                                className="view-all"
                                onClick={() => navigate('/proceso')}
                            >
                                Ver todos los procesos
                            </button>
                        </>
                    )}
                </section>

                {/* Agenda/Citas */}
                <section className="card documents-section">
                    <h2><i className="icon document-icon"></i> Próximas Citas</h2>
                    {loading ? (
                        <div className="text-center my-3">
                            <span>Cargando citas...</span>
                        </div>
                    ) : (
                        <>
                            <div className="document-list">
                                {appointments.length > 0 ? (
                                    appointments.map(appointment => (
                                        <div key={appointment.id_agenda} className="document-item">
                                            <div className="document-icon"></div>
                                            <div className="document-info">
                                                <h3>{appointment.descripcion}</h3>
                                                <span>{formatDate(appointment.fecha)} · {appointment.hora}</span>
                                                <span className="appointment-status" data-status={appointment.estado}>
                                                    {appointment.estado}
                                                </span>
                                            </div>
                                            <button className="document-action">...</button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center my-3">
                                        <span>No hay citas programadas</span>
                                    </div>
                                )}
                            </div>
                            <button 
                                className="view-all"
                                onClick={() => navigate('/agenda')}
                            >
                                Ver todas las citas
                            </button>
                        </>
                    )}
                </section>

                {/* Tareas */}
                <section className="card tasks-section">
                    <h2><i className="icon task-icon"></i> Tareas Pendientes</h2>
                    <div className="task-list">
                        {tasks.map(task => (
                            <div key={task.id} className="task-item">
                                <input type="checkbox" id={`task-${task.id}`} />
                                <label htmlFor={`task-${task.id}`}>
                                    <h3>{task.description}</h3>
                                    <span className="task-due">Vence: {task.due}</span>
                                    <span className={`task-priority ${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resumen Rápido */}
                <section className="card quick-stats">
                    <h2><i className="icon stats-icon"></i> Resumen Rápido</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>{tasks.length}</h3>
                            <p>Tareas pendientes</p>
                        </div>
                        <div className="stat-item">
                            <h3>{stats.upcomingAppointments}</h3>
                            <p>Citas programadas</p>
                        </div>
                        <div className="stat-item">
                            <h3>{stats.active}</h3>
                            <p>Procesos activos</p>
                        </div>
                    </div>
                </section>

            </div>
            </div>
        </div>
    );
};

export default Principal;
