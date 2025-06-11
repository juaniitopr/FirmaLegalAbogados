import { Toast } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; 

const Notification = ({ showToast, setShowToast, toastMessage, toastType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className={`toast-center ${toastType === "success" ? "toast-success" : "toast-danger"}`}
      >
        <Toast.Body className="toast-body">
          {toastType === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FiCheckCircle size={30} className="toast-icon" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FiXCircle size={30} className="toast-icon" />
            </motion.div>
          )}
          {toastMessage}
        </Toast.Body>
      </Toast>
    </motion.div>
  );
};

export default Notification;
