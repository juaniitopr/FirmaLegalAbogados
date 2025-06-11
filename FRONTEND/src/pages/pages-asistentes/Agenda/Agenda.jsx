import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx"; // Asegúrate de tener el contexto de autenticación
import Notification from "../../../components/Notification/Notification.jsx";
import Delete from "../../../components/Delete/Delete.jsx"; // Componente para confirmar eliminación
import "../../../style/tableStyle.css";

function Agenda() {
  const { isAuthenticated } = useContext(AuthContext); // Para verificar si está autenticado
  const navigate = useNavigate();
  const [agendas, setAgendas] = useState([]);
  const [procesos, setProcesos] = useState([]);  // Lista de procesos
  const [newAgenda, setNewAgenda] = useState({
    id_agenda: '',
    fecha: '',
    hora: '',
    descripcion: '',
    estado: '',
    id_proceso: '', // Asegúrate de tener este campo en el estado de la agenda
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variables para la notificación
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' o 'danger'

  // Modal de confirmación de eliminación
  const [showModal, setShowModal] = useState(false);
  const [agendaToDelete, setAgendaToDelete] = useState(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // Obtener las agendas
        const response = await axios.get("http://localhost:9000/api/agendas", {
          headers: { Authorization: token },
        });
        setAgendas(response.data);

        // Obtener los procesos
        const procesosResponse = await axios.get("http://localhost:9000/api/procesos", {
          headers: { Authorization: token },
        });
        setProcesos(procesosResponse.data);

      } catch (err) {
        setError("Error al cargar las agendas o procesos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  // Manejo del cambio de campos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgenda({ ...newAgenda, [name]: value });
  };

  // Manejo del envío del formulario (crear o actualizar agenda)
  const handleAgendaSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    // Validar que los campos requeridos no estén vacíos
    if (!newAgenda.id_agenda || !newAgenda.fecha || !newAgenda.hora || !newAgenda.descripcion || !newAgenda.estado || !newAgenda.id_proceso) {
      setToastMessage('Todos los campos son obligatorios');
      setToastType('danger');
      setShowToast(true);
      return;
    }
  
    try {
      let response;
      const { id_agenda, ...agendaData } = newAgenda;
  
      // Si estamos editando, eliminamos `id_proceso` antes de enviar la solicitud PUT
      if (isEditing) {
        delete agendaData.id_proceso;  // Elimina el campo `id_proceso` al actualizar
  
        response = await axios.put(`http://localhost:9000/api/agendas/${id_agenda}`, agendaData, {
          headers: { Authorization: token },
        });
        setToastMessage('Agenda actualizada con éxito');
      } else {
        // Si estamos creando, enviamos una solicitud POST
        response = await axios.post('http://localhost:9000/api/agendas', newAgenda, {
          headers: { Authorization: token },
        });
        setToastMessage('Agenda creada con éxito');
      }
  
      setToastType('success');
      setShowToast(true);
  
      // Resetear formulario
      setNewAgenda({
        id_agenda: '',
        fecha: '',
        hora: '',
        descripcion: '',
        estado: '',
        id_proceso: '',
      });
  
      // Recargar la lista de agendas
      const fetchData = await axios.get("http://localhost:9000/api/agendas", {
        headers: { Authorization: token },
      });
      setAgendas(fetchData.data);
  
      // Cambiar el modo de edición a falso después de guardar
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar agenda:', err.response?.data || err.message);
      setToastMessage('Error al guardar agenda');
      setToastType('danger');
      setShowToast(true);
    }
  };
  

  // Función que maneja el clic en el botón de editar y carga los datos de la agenda en el formulario
  const handleEdit = (agenda) => {
    setIsEditing(true);
    setNewAgenda({
      id_agenda: agenda.id_agenda,
      fecha: agenda.fecha,
      hora: agenda.hora,
      descripcion: agenda.descripcion,
      estado: agenda.estado,
      id_proceso: agenda.id_proceso,
    });
  };

  // Función para iniciar el proceso de eliminación
  const handleDelete = (agenda) => {
    setAgendaToDelete(agenda);
    setShowModal(true);
  };

  // Confirmar eliminación de la agenda
  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:9000/api/agendas/${agendaToDelete.id_agenda}`, {
        headers: { Authorization: token },
      });

      setToastMessage("Agenda eliminada con éxito");
      setToastType("success");
      setShowToast(true);

      // Actualizar la lista de agendas después de la eliminación
      const response = await axios.get("http://localhost:9000/api/agendas", {
        headers: { Authorization: token },
      });
      setAgendas(response.data);

      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar la agenda");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  // Lógica de mostrar el spinner y el error si está cargando
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="full-width">
      {/* Aquí mostramos la notificación */}
      <Notification
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />

      {/* Modal para Confirmar Eliminación */}
      <Delete
        showModal={showModal}
        setShowModal={setShowModal}
        confirmDelete={confirmDelete}
      />

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">
              {isEditing ? "Actualizar Agenda" : "Registrar Agenda"}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAgendaSubmit}>
                {/* El campo de id_agenda no se muestra cuando estamos en modo edición */}
                {!isEditing && (
                  <Form.Group controlId="id_agenda" className="mb-3">
                    <Form.Label>Id Agenda</Form.Label>
                    <Form.Control
                      type="number"
                      name="id_agenda"
                      value={newAgenda.id_agenda || 0}  // Si es undefined o null, asigna 0
                      onChange={handleChange}
                      placeholder="Ingrese el ID de la agenda"
                      required
                      className="line-input"
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="fecha" className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={newAgenda.fecha}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="hora" className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"  // Asegúrate de que el tipo sea "time"
                    name="hora"
                    value={newAgenda.hora}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={newAgenda.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese la descripción"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={newAgenda.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="programada">Programada</option>
                    <option value="cancelada">Cancelada</option>
                  </Form.Control>
                </Form.Group>


                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>Proceso</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_proceso"
                    value={newAgenda.id_proceso}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un proceso</option>
                    {procesos.map((proc) => (
                      <option key={proc.id_proceso} value={proc.id_proceso}>
                        {proc.descripcion} - {proc.id_proceso}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" block="true">
                  {isEditing ? "Actualizar Agenda" : "Crear Agenda"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Card className="table-card">
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Proceso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {agendas.map((agenda) => (
                    <tr key={agenda.id_agenda}>
                      <td>{agenda.id_agenda}</td>
                      <td>{agenda.fecha}</td>
                      <td>{agenda.hora}</td>
                      <td>{agenda.descripcion}</td>
                      <td>{agenda.estado}</td>
                      <td>{agenda.id_proceso}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEdit(agenda)} // Establece el modo de edición
                          className="me-2"
                        >
                          <BsFillPencilFill />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(agenda)} // Elimina la agenda
                          className="me-2"
                        >
                          <BsFillTrashFill />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Agenda;
