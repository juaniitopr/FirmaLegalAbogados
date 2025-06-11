import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx"; // Asegúrate de tener el contexto de autenticación
import Notification from "../../../components/Notification/Notification.jsx";
import Delete from "../../../components/Delete/Delete.jsx"; // Componente para confirmar eliminación
import "../../../style/tableStyle.css";

function Factura() {
  const { isAuthenticated } = useContext(AuthContext); // Para verificar si está autenticado
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [procesos, setProcesos] = useState([]);  // Lista de procesos
  const [newFactura, setNewFactura] = useState({
    id_factura: '',
    monto: '',
    fecha_emision: '',
    fecha_vencimiento: '',
    estado: '',
    metodo_pago: '',
    id_proceso: '', // Asegúrate de tener este campo en el estado de la factura
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
  const [facturaToDelete, setFacturaToDelete] = useState(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // Obtener las facturas
        const response = await axios.get("http://localhost:9000/api/facturas", {
          headers: { Authorization: token },
        });
        setFacturas(response.data);

        // Obtener los procesos
        const procesosResponse = await axios.get("http://localhost:9000/api/procesos", {
          headers: { Authorization: token },
        });
        setProcesos(procesosResponse.data);

      } catch (err) {
        setError("Error al cargar las facturas o procesos");
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
    setNewFactura({ ...newFactura, [name]: value });
  };

  // Manejo del envío del formulario (crear o actualizar factura)
  const handleFacturaSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Validar que los campos requeridos no estén vacíos
    if (!newFactura.id_proceso || !newFactura.monto || !newFactura.fecha_emision || !newFactura.fecha_vencimiento || !newFactura.estado || !newFactura.metodo_pago) {
      setToastMessage('Todos los campos son obligatorios');
      setToastType('danger');
      setShowToast(true);
      return;
    }

    try {
      let response;
      if (isEditing) {
        // Si estamos editando, enviamos una solicitud PUT para actualizar
        const { id_factura, ...facturaData } = newFactura; // Remover id_factura del cuerpo
        response = await axios.put(`http://localhost:9000/api/facturas/${id_factura}`, facturaData, {
          headers: { Authorization: token },
        });
        setToastMessage('Factura actualizada con éxito');
      } else {
        // Si estamos creando, enviamos una solicitud POST
        response = await axios.post('http://localhost:9000/api/facturas', newFactura, {
          headers: { Authorization: token },
        });
        setToastMessage('Factura creada con éxito');
      }

      setToastType('success');
      setShowToast(true);

      // Resetear formulario
      setNewFactura({
        id_factura: '',
        monto: '',
        fecha_emision: '',
        fecha_vencimiento: '',
        estado: '',
        metodo_pago: '',
        id_proceso: '',
      });

      // Recargar la lista de facturas
      const fetchData = await axios.get("http://localhost:9000/api/facturas", {
        headers: { Authorization: token },
      });
      setFacturas(fetchData.data);

      // Cambiar el modo de edición a falso después de guardar
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar factura:', err.response?.data || err.message);
      setToastMessage('Error al guardar factura');
      setToastType('danger');
      setShowToast(true);
    }
  };

  // Función que maneja el clic en el botón de editar y carga los datos de la factura en el formulario
  const handleEdit = (factura) => {
    setIsEditing(true);
    setNewFactura({
      id_factura: factura.id_factura,
      monto: factura.monto,
      fecha_emision: factura.fecha_emision,
      fecha_vencimiento: factura.fecha_vencimiento,
      estado: factura.estado,
      metodo_pago: factura.metodo_pago,
      id_proceso: factura.id_proceso,
    });
  };

  // Función para iniciar el proceso de eliminación
  const handleDelete = (factura) => {
    setFacturaToDelete(factura);
    setShowModal(true);
  };

  // Confirmar eliminación de la factura
  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:9000/api/facturas/${facturaToDelete.id_factura}`, {
        headers: { Authorization: token },
      });

      setToastMessage("Factura eliminada con éxito");
      setToastType("success");
      setShowToast(true);

      // Actualizar la lista de facturas después de la eliminación
      const response = await axios.get("http://localhost:9000/api/facturas", {
        headers: { Authorization: token },
      });
      setFacturas(response.data);

      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar la factura");
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
              {isEditing ? "Actualizar Factura" : "Registrar Factura"}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleFacturaSubmit}>
                {/* El campo de id_factura no se muestra cuando estamos en modo edición */}
                {!isEditing && (
                  <Form.Group controlId="id_factura" className="mb-3">
                    <Form.Label>Id Factura</Form.Label>
                    <Form.Control
                      type="number"
                      name="id_factura"
                      value={newFactura.id_factura || 0}  // Si es undefined o null, asigna 0
                      onChange={handleChange}
                      placeholder="Ingrese el ID de la factura"
                      required
                      className="line-input"
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="monto" className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    name="monto"
                    value={newFactura.monto}
                    onChange={handleChange}
                    placeholder="Ingrese el monto"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_emision" className="mb-3">
                  <Form.Label>Fecha de Emisión</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_emision"
                    value={newFactura.fecha_emision}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_vencimiento" className="mb-3">
                  <Form.Label>Fecha de Vencimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_vencimiento"
                    value={newFactura.fecha_vencimiento}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={newFactura.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="cancelada">Cancelada</option>
                    <option value="sin cancelar">Sin cancelar</option>
                  </Form.Control>
                </Form.Group>


                <Form.Group controlId="metodo_pago" className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Control
                    as="select"
                    name="metodo_pago"
                    value={newFactura.metodo_pago}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="credito">Credito</option>
                    <option value="transferencia">Transferencia</option>
                  </Form.Control>
                </Form.Group>


                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>Proceso</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_proceso"
                    value={newFactura.id_proceso}
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
                  {isEditing ? "Actualizar Factura" : "Crear Factura"}
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
                    <th>Monto</th>
                    <th>Fecha Emisión</th>
                    <th>Fecha Vencimiento</th>
                    <th>Estado</th>
                    <th>Método de Pago</th>
                    <th>Proceso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {facturas.map((factura) => (
                    <tr key={factura.id_factura}>
                      <td>{factura.id_factura}</td>
                      <td>{factura.monto}</td>
                      <td>{factura.fecha_emision}</td>
                      <td>{factura.fecha_vencimiento}</td>
                      <td>{factura.estado}</td>
                      <td>{factura.metodo_pago}</td>
                      <td>{factura.id_proceso}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEdit(factura)} // Establece el modo de edición
                          className="me-2"
                        >
                          <BsFillPencilFill />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(factura)} // Elimina la factura
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

export default Factura;
