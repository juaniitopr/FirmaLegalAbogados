import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  ruta: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    required: true
  },
  tamaño: {
    type: Number,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',//Permite obtener los datos del usuario relacionado, desde otra coleccion (como si se tratase de una llave foranea)
    required: true
  },
  numeroIdentificacionUsuario: {
    type: String,
    required: true
  },
  fechaSubida: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Método para obtener la ruta física del documento
documentSchema.methods.getPhysicalPath = function() {
  return `./documents/${this.numeroIdentificacionUsuario}/${this.ruta}`;
};

//Aquí creas el modelo de Mongoose con nombre 'Document'. 
const Document = mongoose.model('Document', documentSchema);
export default Document;