import { Modal, Button } from "react-bootstrap";

const Delete = ({ showModal, setShowModal, confirmDelete }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación de eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este componente?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
