import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import Notification from "../../../components/Notification/Notification.jsx";
import Delete from "../../../components/Delete/Delete.jsx";
import "../../../style/tableStyle.css";

function Proceso() {
  const { isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [process, setProcess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProcess, setNewProcess] = useState({
    id_proceso: "",
    descripcion: "",
    fecha_inicio: "",
    estado: "",
    numeroIdentificacionCliente: "",
    numeroIdentificacionAbogado: "",
    id_tipo: "",
    id_subproceso: "",
    id_documento: "",
  });
  const [tipos, setTipos] = useState([]);
  const [subprocesos, setSubprocesos] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const [procesosResponse, tiposResponse, subprocesosResponse, documentosResponse] = await Promise.all([
          axios.get("http://localhost:9000/api/procesos", { headers: { Authorization: token } }),
          axios.get("http://localhost:9000/api/tipoprocesos", { headers: { Authorization: token } }),
          axios.get("http://localhost:9000/api/subprocesos", { headers: { Authorization: token } }),
          axios.get("http://localhost:9000/api/docesp", { headers: { Authorization: token } }),
        ]);

        setProcess(procesosResponse.data);
        setTipos(tiposResponse.data);
        setSubprocesos(subprocesosResponse.data);
        setDocumentos(documentosResponse.data);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProcess({ ...newProcess, [name]: value });
  };

  const handleTipoChange = async (e) => {
    const { value } = e.target;
    setNewProcess({ ...newProcess, id_tipo: value, id_subproceso: "", id_documento: "" });

    if (value) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9000/api/subprocesos/tipo/${value}`,
          { headers: { Authorization: token } }
        );
        setSubprocesos(response.data);
      } catch (err) {
        console.error('Error al obtener subprocesos:', err.response?.data || err.message);
      }
    } else {
      setSubprocesos([]);
      setDocumentos([]);
    }
  };

  const handleSubprocesoChange = async (e) => {
    const { value } = e.target;
    setNewProcess({ ...newProcess, id_subproceso: value, id_documento: "" });

    if (value) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9000/api/docesp/subproceso/${value}`,
          { headers: { Authorization: token } }
        );
        setDocumentos(response.data);
      } catch (err) {
        console.error("Error al obtener documentos:", err.message);
        setDocumentos([]);
      }
    } else {
      setDocumentos([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const processData = { ...newProcess };

    if (!processData.id_subproceso) delete processData.id_subproceso;
    if (!processData.id_documento) delete processData.id_documento;

    try {
      const apiCall = isEditing
        ? axios.put(
          `http://localhost:9000/api/procesos/${newProcess.id_proceso}`,
          processData,
          { headers: { Authorization: token } }
        )
        : axios.post(
          "http://localhost:9000/api/procesos",
          processData,
          { headers: { Authorization: token } }
        );

      await apiCall;

      setToastMessage(isEditing ? "Proceso actualizado con éxito" : "Proceso creado con éxito");
      setToastType("success");
      setShowToast(true);

      setNewProcess({
        id_proceso: "",
        descripcion: "",
        fecha_inicio: "",
        estado: "",
        numeroIdentificacionCliente: "",
        numeroIdentificacionAbogado: "",
        id_tipo: "",
        id_subproceso: "",
        id_documento: "",
      });

      const response = await axios.get("http://localhost:9000/api/procesos", {
        headers: { Authorization: token },
      });
      setProcess(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setToastMessage(isEditing ? "Error al actualizar el proceso" : "Error al crear proceso");
      setToastType("danger");
      setShowToast(true);
    }
  };

  const handleDelete = (process) => {
    setProcessToDelete(process);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:9000/api/procesos/${processToDelete.id_proceso}`, {
        headers: { Authorization: token },
      });

      setToastMessage("Proceso eliminado con éxito");
      setToastType("success");
      setShowToast(true);
      setProcess(process.filter((p) => p.id_proceso !== processToDelete.id_proceso));
      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar el proceso");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  const handleEdit = (process) => {
    setIsEditing(true);
    setNewProcess({
      id_proceso: process.id_proceso,
      descripcion: process.descripcion,
      fecha_inicio: process.fecha_inicio,
      estado: process.estado,
      numeroIdentificacionCliente: process.numeroIdentificacionCliente,
      numeroIdentificacionAbogado: process.numeroIdentificacionAbogado,
      id_tipo: process.id_tipo,
      id_subproceso: process.id_subproceso || "",
      id_documento: process.id_documento || "",
    });
  };

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
      {/* Notification */}
      <Notification
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />

      {/* Modal for Deletion Confirmation */}
      <Delete
        showModal={showModal}
        setShowModal={setShowModal}
        confirmDelete={confirmDelete}
      />

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">
              {isEditing ? "Editar Proceso" : "Registrar Proceso"}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>ID del Proceso</Form.Label>
                  <Form.Control
                    type="number"
                    name="id_proceso"
                    value={newProcess.id_proceso}
                    onChange={handleChange}
                    placeholder="Ingrese el ID del proceso"
                    required
                    disabled={isEditing}
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={newProcess.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese la descripción"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_inicio" className="mb-3">
                  <Form.Label>Fecha de Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_inicio"
                    value={newProcess.fecha_inicio}
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
                    value={newProcess.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="numeroIdentificacionCliente" className="mb-3">
                  <Form.Label>Identificación Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacionCliente"
                    value={newProcess.numeroIdentificacionCliente}
                    onChange={handleChange}
                    placeholder="Identificación del cliente"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="numeroIdentificacionAbogado" className="mb-3">
                  <Form.Label>Identificación Abogado</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacionAbogado"
                    value={newProcess.numeroIdentificacionAbogado}
                    onChange={handleChange}
                    placeholder="Identificación del abogado"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="id_tipo" className="mb-3">
                  <Form.Label>Tipo de Proceso</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_tipo"
                    value={newProcess.id_tipo}
                    onChange={handleTipoChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un tipo</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.id_tipo} value={tipo.id_tipo}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="id_subproceso" className="mb-3">
                  <Form.Label>Subproceso</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_subproceso"
                    value={newProcess.id_subproceso}
                    onChange={handleSubprocesoChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un subproceso</option>
                    {subprocesos.map((subproceso) => (
                      <option key={subproceso.id_subproceso} value={subproceso.id_subproceso}>
                        {subproceso.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="id_documento" className="mb-3">
                  <Form.Label>Documento</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_documento"
                    value={newProcess.id_documento}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un documento</option>
                    {documentos.map((documento) => (
                      <option key={documento.id_documento} value={documento.id_documento}>
                        {documento.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  {isEditing ? "Actualizar Proceso" : "Registrar Proceso"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Card className="table-card">
            <Card.Body>
              <div className="table-container">
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Descripción</th>
                      <th>Fecha Inicio</th>
                      <th>Estado</th>
                      <th>Cliente</th>
                      <th>Abogado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {process.map((proc) => {
                      const tipoNombre = tipos.find(t => t.id_tipo === proc.id_tipo)?.nombre || "N/A";
                      const subprocesoNombre = subprocesos.find(sp => sp.id_subproceso === proc.id_subproceso)?.nombre || "N/A";
                      const documentoNombre = documentos.find(doc => doc.id_documento === proc.id_documento)?.nombre || "N/A";

                      return (
                        <tr key={proc.id_proceso}>
                          <td>{proc.id_proceso}</td>
                          <td className="description">{proc.descripcion}</td>
                          <td>{proc.fecha_inicio}</td>
                          <td>{proc.estado}</td>
                          <td>{proc.numeroIdentificacionCliente}</td>
                          <td>{proc.numeroIdentificacionAbogado}</td>

                          <td>
                            <Button
                              variant="info"
                              onClick={() => handleEdit(proc)}
                              className="me-2"
                            >
                              <BsFillPencilFill />
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(proc)}
                            >
                              <BsFillTrashFill />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Proceso;