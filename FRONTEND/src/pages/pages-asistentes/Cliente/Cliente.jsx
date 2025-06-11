import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx"; // Asegúrate de tener el contexto de autenticación
import Notification from "../../../components/Notification/Notification.jsx"; // Importa el componente de notificación
import "../../../style/tableStyle.css";

function Cliente() {
  const { isAuthenticated } = useContext(AuthContext); // Para verificar si está autenticado
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    numeroIdentificacion: "",
    direccion: "",
    estado: "",
    estado_cliente: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Flag para saber si estamos editando o creando
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variables para la notificación
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' o 'danger'

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchClientes = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:9000/api/clientes", {
          headers: { Authorization: token },
        });
        setClientes(response.data);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [isAuthenticated, navigate]);

  // Manejo del cambio de campos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  // Manejo del envío del formulario (crear o actualizar cliente)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const apiCall = isEditing
        ? axios.put(
            `http://localhost:9000/api/clientes/${newCliente.numeroIdentificacion}`,
            newCliente,
            { headers: { Authorization: token } }
          )
        : axios.post(
            "http://localhost:9000/api/clientes",
            newCliente,
            { headers: { Authorization: token } }
          );

      await apiCall;

      // Notificación de éxito
      setToastMessage(isEditing ? "Cliente actualizado con éxito" : "Cliente creado con éxito");
      setToastType("success");
      setShowToast(true);

      // Restablecer los valores del formulario
      setNewCliente({
        numeroIdentificacion: "",
        direccion: "",
        estado: "",
        estado_cliente: "",
      });

      // Actualizar la lista de clientes
      const response = await axios.get("http://localhost:9000/api/clientes", {
        headers: { Authorization: token },
      });
      setClientes(response.data);
      setIsEditing(false); // Establecer que ya no estamos editando
    } catch (err) {
      // Notificación de error
      setToastMessage(isEditing ? "Error al actualizar el cliente" : "Error al crear el cliente");
      setToastType("danger");
      setShowToast(true);
    }
  };

  // Función que maneja el clic en el botón de editar y carga los datos del cliente en el formulario
  const handleEdit = (cliente) => {
    setIsEditing(true);
    setNewCliente({
      numeroIdentificacion: cliente.numeroIdentificacion,
      direccion: cliente.direccion,
      estado: cliente.estado,
      estado_cliente: cliente.estado_cliente,
    });
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

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">
              {isEditing ? "Actualizar Cliente" : "Registrar Cliente"}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* El campo de número de identificación no se muestra cuando estamos en modo edición */}
                {!isEditing && (
                  <Form.Group controlId="numeroIdentificacion" className="mb-3">
                    <Form.Label>Número de Identificación</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroIdentificacion"
                      value={newCliente.numeroIdentificacion}
                      onChange={handleChange}
                      placeholder="Ingrese el número de identificación"
                      required
                      className="line-input"
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="direccion" className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={newCliente.direccion}
                    onChange={handleChange}
                    placeholder="Ingrese la dirección"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={newCliente.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="estado_cliente" className="mb-3">
                  <Form.Label>Estado Cliente</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado_cliente"
                    value={newCliente.estado_cliente}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un estado cliente</option>
                    <option value="potencial">Potencial</option>
                    <option value="cliente">Cliente</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" block="true">
                  {isEditing ? "Actualizar Cliente" : "Crear Cliente"}
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
                    <th>Identificación</th>
                    <th>Dirección</th>
                    <th>Estado</th>
                    <th>Estado Cliente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.numeroIdentificacion}>
                      <td>{cliente.numeroIdentificacion}</td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.estado}</td>
                      <td>{cliente.estado_cliente}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEdit(cliente)} // Establece el modo de edición
                          className="me-2"
                        >
                          <BsFillPencilFill />
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

export default Cliente;
