import Agenda from "../models/AgendaModel.js"; 
import Proceso from "../models/ProcessModel.js"; 

// Controlador para crear una agenda
export const crearAgenda = async (req, res) => {
    try {
        const { id_agenda, fecha, hora, descripcion, estado, id_proceso } = req.body;

        // Verificamos si existe el proceso
        const proceso = await Proceso.findOne({ id_proceso });
        if (!proceso) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }

        // Verificamos si ya existe una agenda con ese id_agenda
        const agendaExistente = await Agenda.findOne({ id_agenda });
        if (agendaExistente) {
            return res.status(400).json({ message: 'Ya existe una agenda con ese ID' });
        }

        // Crear la agenda
        const nuevaAgenda = new Agenda({
            id_agenda,
            fecha,
            hora,
            descripcion,
            estado,
            id_proceso,
        });

        // Guardar la agenda en la base de datos
        await nuevaAgenda.save();
        res.status(201).json(nuevaAgenda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la agenda' });
    }
};

// Controlador para editar una agenda
export const editarAgenda = async (req, res) => {
    try {
        const { id_agenda } = req.params;
        const { fecha, hora, descripcion, estado, id_proceso } = req.body;

        // Buscar la agenda por ID
        const agenda = await Agenda.findOne({ id_agenda });
        if (!agenda) {
            return res.status(404).json({ message: 'Agenda no encontrada' });
        }

        // Actualizar los campos de la agenda con los valores proporcionados
        if (fecha) agenda.fecha = fecha;
        if (hora) agenda.hora = hora;
        if (descripcion) agenda.descripcion = descripcion;
        if (estado) agenda.estado = estado;
        if (id_proceso) agenda.id_proceso = id_proceso;

        // Guardar los cambios en la base de datos
        await agenda.save();
        res.status(200).json(agenda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar la agenda' });
    }
};

// Controlador para obtener una agenda por ID
export const getAgenda = async (req, res) => {
    try {
        const { id_agenda } = req.params;

        // Buscar la agenda por ID
        const agenda = await Agenda.findOne({ id_agenda });
        if (!agenda) {
            return res.status(404).json({ message: 'Agenda no encontrada' });
        }

        // Obtener el proceso correspondiente
        const proceso = await Proceso.findOne({ id_proceso: agenda.id_proceso });
        if (!proceso) {
            return res.status(404).json({ message: 'Proceso asociado no encontrado' });
        }

        // Devolver la agenda junto con los detalles del proceso
        res.status(200).json({
            agenda,
            proceso: {
                id_proceso: proceso.id_proceso,
                descripcion: proceso.descripcion,
                fecha_inicio: proceso.fecha_inicio,
                estado: proceso.estado,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la agenda' });
    }
};

// Controlador para obtener todas las agendas
export const getAllAgendas = async (req, res) => {
    try {
        // Obtener los filtros de la consulta (por ejemplo, por estado o id_proceso)
        const { estado, id_proceso } = req.query;
        let query = {}; // Criterios de búsqueda por defecto

        // Si se proporciona un estado, agregarlo al query
        if (estado) query.estado = estado;

        // Si se proporciona un id_proceso, agregarlo al query
        if (id_proceso) query.id_proceso = id_proceso;

        // Buscar todas las agendas con los filtros
        const agendas = await Agenda.find(query);

        // Si no se encuentran agendas, devolver un array vacío con status 200
        if (agendas.length === 0) {
            return res.status(200).json([]); // Cambié el 404 por 200 y devuelvo un array vacío
        }

        // Devolver las agendas encontradas
        res.status(200).json(agendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las agendas' });
    }
};

// Controlador para eliminar una agenda
export const eliminarAgenda = async (req, res) => {
    try {
        const { id_agenda } = req.params;

        // Buscar la agenda por id_agenda
        const agendaExistente = await Agenda.findOne({ id_agenda });

        if (!agendaExistente) {
            return res.status(404).json({ message: 'Agenda no encontrada' });
        }

        // Eliminar la agenda
        await Agenda.deleteOne({ id_agenda });

        res.status(200).json({ message: 'Agenda eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la agenda' });
    }
};
