import express from 'express';
import multer from 'multer';
import { 
  uploadDocument, 
  getUserDocuments, 
  downloadDocument, 
  deleteDocument 
} from '../controllers/DocumentController.js';
import { verifyToken } from '../middleware/Autentication.js';//Middleware para verificar el token JWT. Protege las rutas para que solo usuarios autenticados puedan usarlas.
import { 
  documentIdSchema, 
  documentQuerySchema 
} from '../validators/DocumentValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: Gestión de documentos de usuarios
 */

/**
 * @swagger
 * /api/documentos:
 *   post:
 *     summary: Subir un nuevo documento
 *     tags: [Documentos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Documento subido exitosamente
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error del servidor
 */
router.post('/', 
  verifyToken, 
  upload.single('file'), 
  uploadDocument
);

/**
 * @swagger
 * /api/documentos:
 *   get:
 *     summary: Obtener documentos del usuario
 *     tags: [Documentos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 *       500:
 *         description: Error del servidor
 */
router.get('/', 
  verifyToken, 
  validatorHandler(documentQuerySchema, 'query'), 
  getUserDocuments
);

/**
 * @swagger
 * /api/documentos/{id}/descargar:
 *   get:
 *     summary: Descargar un documento
 *     tags: [Documentos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archivo descargado
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/descargar', 
  verifyToken, 
  validatorHandler(documentIdSchema, 'params'), 
  downloadDocument
);

/**
 * @swagger
 * /api/documentos/{id}:
 *   delete:
 *     summary: Eliminar un documento
 *     tags: [Documentos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento eliminado
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', 
  verifyToken, 
  validatorHandler(documentIdSchema, 'params'), 
  deleteDocument
);

export default router;