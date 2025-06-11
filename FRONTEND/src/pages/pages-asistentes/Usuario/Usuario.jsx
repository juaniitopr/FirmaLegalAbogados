import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import Notification from "../../../components/Notification/Notification.jsx";
import Delete from "../../../components/Delete/Delete.jsx";
import "../../../style/tableStyle.css";

function Usuario() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({
    numeroIdentificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    id_rol: "",
    especialidad: "",    // campos para abogado
    area_juridica: "",
    experiencia: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [usuariosResponse, rolesResponse] = await Promise.all([
          axios.get("http://localhost:9000/api/usuarios", { headers: { Authorization: token } }),
          axios.get("http://localhost:9000/api/rols", { headers: { Authorization: token } }),
        ]);

        setUsers(usuariosResponse.data.data);
        setRoles(rolesResponse.data);
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
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setNewUser({
      numeroIdentificacion: user.numeroIdentificacion,
      nombres: user.nombres,
      apellidos: user.apellidos,
      telefono: user.telefono,
      email: user.email,
      id_rol: user.rol?.id_rol ? String(user.rol.id_rol) : "", // for select value
      especialidad: user.especialidad || "",
      area_juridica: user.area_juridica || "",
      experiencia: user.experiencia || "",
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");  // <-- Aquí

  try {
    const userPayload = {
      numeroIdentificacion: newUser.numeroIdentificacion,
      nombres: newUser.nombres,
      apellidos: newUser.apellidos,
      telefono: newUser.telefono,
      email: newUser.email,
      id_rol: newUser.id_rol,
    };

    await axios.post("http://localhost:9000/api/usuarios/create", userPayload, {
      headers: { Authorization: token },
    });

    if (newUser.id_rol === "1") {
      const abogadoPayload = {
        especialidad: newUser.especialidad,
        area_juridica: newUser.area_juridica,
        experiencia: newUser.experiencia,
        numeroIdentificacion: newUser.numeroIdentificacion,
      };

      await axios.post("http://localhost:9000/api/abogados", abogadoPayload, {
        headers: { Authorization: token },
      });
    }

    setToastMessage(isEditing ? "Usuario actualizado con éxito" : "Usuario creado con éxito");
    setToastType("success");
    setShowToast(true);

    setNewUser({
      numeroIdentificacion: "",
      nombres: "",
      apellidos: "",
      telefono: "",
      email: "",
      id_rol: "",
      especialidad: "",
      area_juridica: "",
      experiencia: "",
    });

    const response = await axios.get("http://localhost:9000/api/usuarios", { headers: { Authorization: token } });
    setUsers(response.data.data);
    setIsEditing(false);
  } catch (err) {
    setToastMessage(isEditing ? "Error al actualizar el usuario" : "Error al crear usuario");
    setToastType("danger");
    setShowToast(true);
    console.error(err);  // Agrega este console.log para ver detalles del error
  }
};


  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:9000/api/usuarios/${userToDelete.numeroIdentificacion}`, {
        headers: { Authorization: token },
      });

      setToastMessage("Usuario eliminado con éxito");
      setToastType("success");
      setShowToast(true);
      setUsers(users.filter((user) => user.numeroIdentificacion !== userToDelete.numeroIdentificacion));
      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar el usuario");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
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
      <Notification
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />

      <Delete showModal={showModal} setShowModal={setShowModal} confirmDelete={confirmDelete} />

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Usuario" : "Registrar Usuario"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="numeroIdentificacion">
                  <Form.Label>Número de Identificación</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacion"
                    value={newUser.numeroIdentificacion}
                    onChange={handleChange}
                    placeholder="Ingrese número de identificación"
                    required
                    disabled={isEditing} // no permitir editar la llave primaria
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="nombres">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombres"
                    value={newUser.nombres}
                    onChange={handleChange}
                    placeholder="Ingrese nombres"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="apellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={newUser.apellidos}
                    onChange={handleChange}
                    placeholder="Ingrese apellidos"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={newUser.telefono}
                    onChange={handleChange}
                    placeholder="Ingrese teléfono"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Ingrese correo electrónico"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="id_rol">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    name="id_rol"
                    value={newUser.id_rol}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un rol</option>
                    {roles.map((rol) => (
                      <option key={rol.id_rol} value={rol.id_rol}>
                        {rol.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Campos extra para abogado */}
                {newUser.id_rol === "1" && (
                  <>
                    <Form.Group className="mb-3" controlId="especialidad">
                      <Form.Label>Especialidad</Form.Label>
                      <Form.Control
                        type="text"
                        name="especialidad"
                        value={newUser.especialidad}
                        onChange={handleChange}
                        placeholder="Ingrese especialidad"
                        required={newUser.id_rol === "1"}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="area_juridica">
                      <Form.Label>Área Jurídica</Form.Label>
                      <Form.Control
                        type="text"
                        name="area_juridica"
                        value={newUser.area_juridica}
                        onChange={handleChange}
                        placeholder="Ingrese área jurídica"
                        required={newUser.id_rol === "1"}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="experiencia">
                      <Form.Label>Experiencia</Form.Label>
                      <Form.Control
                        type="text"
                        name="experiencia"
                        value={newUser.experiencia}
                        onChange={handleChange}
                        placeholder="Ingrese experiencia"
                        required={newUser.id_rol === "1"}
                      />
                    </Form.Group>
                  </>
                )}

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    {isEditing ? "Actualizar" : "Guardar"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Table responsive bordered hover className="table-custom">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay usuarios registrados
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr key={user.numeroIdentificacion}>
                  <td>{user.numeroIdentificacion}</td>
                  <td>{user.nombres}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.telefono}</td>
                  <td>{user.email}</td>
                  <td>{user.rol?.nombre || user.rol || "Sin rol"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      <BsFillPencilFill />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
