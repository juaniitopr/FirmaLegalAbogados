import Document from '../models/DocumentModel.js';
import { ensureUserDirectory, deletePhysicalFile, allowedFileTypes, getFileInfo } from '../utils/fileUtils.js';
import fs from 'fs';
import path from 'path';

// Subir un nuevo documento
export const uploadDocument = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.user; // Obtenido del token JWT
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ mensaje: 'No se ha subido ningún archivo' });
    }

    // Validar tipo de archivo
    if (!allowedFileTypes.includes(file.mimetype)) {
      return res.status(400).json({ mensaje: 'Tipo de archivo no permitido' });
    }

    // Crear carpeta del usuario si no existe
    const userDir = ensureUserDirectory(numeroIdentificacion);
    
    // Mover el archivo a la carpeta del usuario
    const fileInfo = getFileInfo(file);
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(userDir, fileName);
    
    fs.renameSync(file.path, filePath);

    // Crear registro en la base de datos
    const newDocument = new Document({
      nombre: fileInfo.nombre,
      ruta: fileName,
      tipo: fileInfo.tipo,
      tamaño: fileInfo.tamaño,
      usuario: req.user._id,
      numeroIdentificacionUsuario: numeroIdentificacion
    });

    await newDocument.save();

    res.status(201).json({
      mensaje: 'Documento subido exitosamente',
      documento: newDocument
    });
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({ mensaje: 'Error al subir el documento' });
  }
};

// Obtener documentos de un usuario
export const getUserDocuments = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.user;
    
    const documents = await Document.find({ 
      numeroIdentificacionUsuario: numeroIdentificacion 
    }).sort({ fechaSubida: -1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener documentos' });
  }
};

// Descargar un documento
export const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroIdentificacion } = req.user;
    
    const document = await Document.findOne({ 
      _id: id,
      numeroIdentificacionUsuario: numeroIdentificacion 
    });

    if (!document) {
      return res.status(404).json({ mensaje: 'Documento no encontrado' });
    }

    const filePath = path.join(
      __dirname, 
      '../../documents', 
      numeroIdentificacion, 
      document.ruta
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ mensaje: 'Archivo físico no encontrado' });
    }

    res.download(filePath, document.nombre);
  } catch (error) {
    console.error('Error al descargar documento:', error);
    res.status(500).json({ mensaje: 'Error al descargar el documento' });
  }
};

// Eliminar un documento
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroIdentificacion } = req.user;
    
    const document = await Document.findOneAndDelete({ 
      _id: id,
      numeroIdentificacionUsuario: numeroIdentificacion 
    });

    if (!document) {
      return res.status(404).json({ mensaje: 'Documento no encontrado' });
    }

    const filePath = path.join(
      __dirname, 
      '../../documents', 
      numeroIdentificacion, 
      document.ruta
    );

    // Eliminar el archivo físico
    const deleted = deletePhysicalFile(filePath);

    if (!deleted) {
      console.warn('El archivo físico no pudo ser eliminado');
    }

    res.status(200).json({ mensaje: 'Documento eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el documento' });
  }
};