import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card, Alert, ProgressBar } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill, BsDownload, BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import Notification from "../../../components/Notification/Notification.jsx";
import Delete from "../../../components/Delete/Delete.jsx";
import "../../../style/tableStyle.css";

function Documentos() {
  const { isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  // Variables para la notificación
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // Modal de confirmación de eliminación
  const [showModal, setShowModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  // Tipos de archivo permitidos
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png'
  ];

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    fetchDocuments();
  }, [isAuthenticated, navigate]);

  // Obtener documentos del usuario
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/documentos", {
        headers: { Authorization: token }
      });
      setDocuments(response.data);
    } catch (err) {
      setError("Error al cargar los documentos");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setUploadError('Por favor selecciona un archivo');
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadError('Tipo de archivo no permitido');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
      setUploadError('El archivo no debe exceder los 10MB');
      return;
    }

    setUploadError('');
    setFile(selectedFile);
  };

  // Subir documento
  const handleUpload = async () => {
    if (!file) {
      setUploadError('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setProgress(0);
      
      const token = localStorage.getItem("token");
      await axios.post(
        'http://localhost:9000/api/documentos',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        }
      );

      setToastMessage('Documento subido con éxito');
      setToastType('success');
      setShowToast(true);
      setFile(null);
      document.getElementById('fileInput').value = ''; // Resetear input file
      fetchDocuments(); // Actualizar lista
    } catch (err) {
      setToastMessage('Error al subir el documento');
      setToastType('danger');
      setShowToast(true);
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }
  };

  // Descargar documento
  const handleDownload = async (docId, docName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:9000/api/documentos/${docId}/descargar`,
        {
          headers: { Authorization: token },
          responseType: 'blob'
        }
      );

      // Crear enlace temporal para descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', docName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setToastMessage('Documento descargado con éxito');
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      setToastMessage('Error al descargar el documento');
      setToastType('danger');
      setShowToast(true);
    }
  };

  // Iniciar proceso de eliminación
  const handleDelete = (document) => {
    setDocToDelete(document);
    setShowModal(true);
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9000/api/documentos/${docToDelete._id}`, {
        headers: { Authorization: token }
      });

      setToastMessage('Documento eliminado con éxito');
      setToastType('success');
      setShowToast(true);
      fetchDocuments(); // Actualizar lista
    } catch (err) {
      setToastMessage('Error al eliminar el documento');
      setToastType('danger');
      setShowToast(true);
    } finally {
      setShowModal(false);
    }
  };

  // Mostrar spinner mientras carga
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="full-width">
      {/* Notificación */}
      <Notification
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />

      {/* Modal de confirmación de eliminación */}
      <Delete
        showModal={showModal}
        setShowModal={setShowModal}
        confirmDelete={confirmDelete}
      />

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">
              Subir Documento
            </Card.Header>
            <Card.Body>
            <Form.Group controlId="formFile" className="mb-3">
  <Form.Label>Seleccionar documento</Form.Label>
  <Form.Control 
    type="file" 
    onChange={handleFileChange}
    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
  />
</Form.Group>

              {uploadError && <Alert variant="danger">{uploadError}</Alert>}

              {uploading && (
                <ProgressBar 
                  now={progress} 
                  label={`${progress}%`} 
                  animated 
                  className="mb-3"
                />
              )}

              <Button 
                variant="primary" 
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-100"
              >
                <BsUpload className="me-2" />
                {uploading ? 'Subiendo...' : 'Subir Documento'}
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Card className="table-card">
            <Card.Header as="h5" className="text-center">
              Mis Documentos
            </Card.Header>
            <Card.Body>
              {documents.length === 0 ? (
                <Alert variant="info">No hay documentos para mostrar</Alert>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Tamaño</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc._id}>
                        <td>{doc.nombre}</td>
                        <td>{doc.tipo.split('/')[1]}</td>
                        <td>{(doc.tamaño / 1024).toFixed(2)} KB</td>
                        <td>{new Date(doc.fechaSubida).toLocaleDateString()}</td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleDownload(doc._id, doc.nombre)}
                          >
                            <BsDownload />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(doc)}
                          >
                            <BsFillTrashFill />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Documentos;