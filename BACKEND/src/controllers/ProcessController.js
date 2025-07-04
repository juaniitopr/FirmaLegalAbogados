import Proceso from '../models/ProcessModel.js';
import mongoose from 'mongoose'; // Asegúrate de importar mongoose
import Cliente from '../models/ClienteModel.js';
import Abogado from '../models/AbogadoModel.js';
import TipoProcess from '../models/TipoProcessModel.js';
import DocEsp from '../models/DocEspModel.js';
import SubProcess from '../models/SubProcessModel.js'; // Agregar esta importación

// 1. Controlador para crear un proceso
export const crearProceso = async (req, res) => {
  try {
    const {
      id_proceso,
      descripcion,
      fecha_inicio,
      estado,
      numeroIdentificacionCliente,
      numeroIdentificacionAbogado,
      id_tipo,
      id_subproceso,  // id_subproceso como número
      id_docesp,      // id_docesp como número
    } = req.body;

    // Verificar si el cliente con ese número de identificación existe
    const clienteExistente = await Cliente.findOne({ numeroIdentificacion: numeroIdentificacionCliente });
    if (!clienteExistente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado con ese número de identificación' });
    }

    // Verificar si el abogado con ese número de identificación existe
    const abogadoExistente = await Abogado.findOne({ numeroIdentificacion: numeroIdentificacionAbogado });
    if (!abogadoExistente) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado con ese número de identificación' });
    }

    // Verificar si el tipo de proceso existe
    const tipoExistente = await TipoProcess.findOne({ id_tipo });
    if (!tipoExistente) {
      return res.status(400).json({ mensaje: 'Tipo de proceso no encontrado' });
    }

    // Verificar si el subproceso existe (si se pasa)
    let subprocesoExistente = null;
    if (id_subproceso) {
      subprocesoExistente = await SubProcess.findOne({ id_subproceso });
      if (!subprocesoExistente) {
        return res.status(404).json({ mensaje: 'Subproceso no encontrado' });
      }
    }

    // Verificar si el documento especial existe (si se pasa)
    let documentoExistente = null;
    if (id_docesp) {
      documentoExistente = await DocEsp.findOne({ id_docesp });
      if (!documentoExistente) {
        return res.status(404).json({ mensaje: 'Documento especial no encontrado' });
      }
    }

    // Verificar si ya existe un proceso con el mismo id_proceso
    const procesoExistente = await Proceso.findOne({ id_proceso });
    if (procesoExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un proceso con ese ID' });
    }

    // Crear el nuevo proceso
    const nuevoProceso = new Proceso({
      id_proceso,
      descripcion,
      fecha_inicio,
      estado,
      numeroIdentificacionCliente,
      numeroIdentificacionAbogado,
      id_tipo,
      id_subproceso: subprocesoExistente ? subprocesoExistente.id_subproceso : null,  // Asignamos el ID numérico
      id_docesp: documentoExistente ? documentoExistente.id_docesp : null,  // Asignamos el ID numérico
    });

    // Guardar el proceso en la base de datos
    await nuevoProceso.save();
    res.status(201).json(nuevoProceso);

  } catch (error) {
    console.error('Error al crear el proceso:', error);
    res.status(500).json({ mensaje: 'Error al crear el proceso', error: error.message });
  }
};

// 2. Controlador para obtener todos los procesos
export const getAllProcesos = async (req, res) => {
  try {
    // Obtener los filtros de la consulta
    const { estado, id_tipo } = req.query;
    let query = {};  // Criterios de búsqueda por defecto

    // Si se proporciona un estado, se agrega al query
    if (estado) query.estado = estado;

    // Si se proporciona un tipo, se agrega al query
    if (id_tipo) query.id_tipo = id_tipo;

    // Obtener los procesos con los filtros
    const procesos = await Proceso.find(query)
      .populate('numeroIdentificacionCliente', 'nombre apellido')
      .populate('numeroIdentificacionAbogado', 'nombre apellido');

    // Obtener todos los tipos de proceso, subprocesos y documentos esperados
    const [tipos, subprocesos, documentos] = await Promise.all([
      TipoProcess.find(),
      SubProcess.find(),
      DocEsp.find()
    ]);

    // Asociar los nombres correspondientes a cada proceso
    const procesosConNombres = procesos.map(proceso => {
      const tipo = tipos.find(t => t.id_tipo === proceso.id_tipo);
      const subproceso = subprocesos.find(s => s.id_subproceso === proceso.id_subproceso);
      const documento = documentos.find(d => d.id_docesp === proceso.id_docesp);

      return {
        ...proceso.toObject(),
        tipo: tipo ? tipo.nombre : null,
        subproceso: subproceso ? subproceso.nombre : null,
        documento: documento ? documento.nombre : null
      };
    });

    res.status(200).json(procesosConNombres);
  } catch (error) {
    console.error('Error al obtener los procesos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los procesos', error: error.message });
  }
};

// 3. Buscar un proceso por el numero de identificacion del usuario.
export const get_especify_process = async (req, res) => {
  try {
      const { numeroIdentificacionCliente } = req.params;
      const process = await Proceso
      .find({ numeroIdentificacionCliente })

      // Si no se encuentra el usuario con el numero de identifiacion proporcionado.
      if (!process) {
          return res.status(404).json({
              Request_failed: `Proceso por medio de identificacion no encontrado`
          });
      }

      // Respuesta a la solicitud
      res.status(200).json({
          Request_success: ' User found successfully! asdasdas',
          User_found: process
      });
  } catch (error) {
      console.error(error)
      res.status(500).json({
          Request_failed: 'Error al encontrar el usuario',
          Error: error.message
      })
      
  }
}

// 4. Controlador para actualizar un proceso por ID
export const actualizarProceso = async (req, res) => {
  try {
    const { id_proceso } = req.params;
    const {
      descripcion,
      fecha_inicio,
      estado,
      numeroIdentificacionCliente,
      numeroIdentificacionAbogado,
      id_tipo,
      id_subproceso,
      id_docesp,
    } = req.body;

    // Verificar si el proceso existe
    const procesoExistente = await Proceso.findOne({ id_proceso });
    if (!procesoExistente) {
      return res.status(404).json({ mensaje: 'Proceso no encontrado' });
    }

    // Verificar si el cliente con ese número de identificación existe
    const clienteExistente = await Cliente.findOne({ numeroIdentificacion: numeroIdentificacionCliente });
    if (!clienteExistente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado con ese número de identificación' });
    }

    // Verificar si el abogado con ese número de identificación existe
    const abogadoExistente = await Abogado.findOne({ numeroIdentificacion: numeroIdentificacionAbogado });
    if (!abogadoExistente) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado con ese número de identificación' });
    }

    // Verificar si el tipo de proceso existe
    const tipoExistente = await TipoProcess.findOne({ id_tipo });
    if (!tipoExistente) {
      return res.status(400).json({ mensaje: 'Tipo de proceso no encontrado' });
    }

    // Verificar si el subproceso existe (si se pasa)
    let subprocesoExistente = null;
    if (id_subproceso) {
      subprocesoExistente = await SubProcess.findOne({ id_subproceso });
      if (!subprocesoExistente) {
        return res.status(404).json({ mensaje: 'Subproceso no encontrado' });
      }
    }

    // Verificar si el documento especial existe (si se pasa)
    let documentoExistente = null;
    if (id_docesp) {
      documentoExistente = await DocEsp.findOne({ id_docesp });
      if (!documentoExistente) {
        return res.status(404).json({ mensaje: 'Documento especial no encontrado' });
      }
    }

    // Actualizar el proceso
    procesoExistente.descripcion = descripcion;
    procesoExistente.fecha_inicio = fecha_inicio;
    procesoExistente.estado = estado;
    procesoExistente.numeroIdentificacionCliente = numeroIdentificacionCliente;
    procesoExistente.numeroIdentificacionAbogado = numeroIdentificacionAbogado;
    procesoExistente.id_tipo = id_tipo;
    procesoExistente.id_subproceso = subprocesoExistente ? subprocesoExistente.id_subproceso : null;
    procesoExistente.id_docesp = documentoExistente ? documentoExistente.id_docesp : null;

    // Guardar los cambios
    await procesoExistente.save();

    res.status(200).json({ mensaje: 'Proceso actualizado con éxito', proceso: procesoExistente });
  } catch (error) {
    console.error('Error al actualizar el proceso:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el proceso', error: error.message });
  }
};

// 5. Controlador para eliminar un proceso
export const eliminarProceso = async (req, res) => {
  try {
    const { id_proceso } = req.params;

    // Verificar si el proceso existe
    const procesoExistente = await Proceso.findOne({ id_proceso });
    if (!procesoExistente) {
      return res.status(404).json({ mensaje: 'Proceso no encontrado' });
    }

    // Eliminar el proceso
    await Proceso.deleteOne({ id_proceso });
    res.status(200).json({ mensaje: 'Proceso eliminado con éxito' });

  } catch (error) {
    console.error('Error al eliminar el proceso:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el proceso', error: error.message });
  }
};

// 6. Controlador para obtener un proceso por su Id.
// export const get_process_id = async (req, res) => {
//   try {
//       const { id_proceso } = req.params;
//       const process = await Proceso
//       .find({ id_proceso })

//       // Si no se encuentra el usuario con el numero de identifiacion proporcionado.
//       if (!process) {
//           return res.status(404).json({
//               Request_failed: `Proceso con el id ${id_proceso} no encontrado`
//           });
//       }

//       // Respuesta a la solicitud
//       res.status(200).json({
//           Request_success: ' Process found successfully! asdasdas',
//           User_found: process
//       });
//   } catch (error) {
//       console.error(error)
//       res.status(500).json({
//           Request_failed: 'Error al encontrar el proceso',
//           Error: error.message
//       })
      
//   }
// }

