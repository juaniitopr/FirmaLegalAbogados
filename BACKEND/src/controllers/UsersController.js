import bcrypt from 'bcryptjs';
import Usuario from '../models/UsersModel.js';
import Rol from '../models/RoleModel.js';
import Abogado from '../models/AbogadoModel.js';
import Asistente from '../models/AsistenteModel.js';
import Cliente from '../models/ClienteModel.js';
import { sendPasswordEmail } from '../services/emailService.js';

export const createUser = async (req, res) => {
  const { numeroIdentificacion, nombres, apellidos, telefono, email, id_rol } = req.body;

  try {
    const validIdRol = Number(id_rol);
    if (isNaN(validIdRol)) {
      return res.status(400).json({ message: 'El rol debe ser un número válido.' });
    }

    const role = await Rol.findOne({ id_rol: validIdRol });
    if (!role) {
      return res.status(400).json({ message: 'Rol no encontrado' });
    }

    const emailNormalized = email.toLowerCase();

    const existingUser = await Usuario.findOne({
      $or: [
        { numeroIdentificacion },
        { email: emailNormalized },
        { telefono }
      ],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'N. Identificación, correo o teléfono ya registrados' });
    }

    // Aquí asignamos la contraseña en texto plano, sin hashear
    const generatedPassword = numeroIdentificacion;

    const newUser = new Usuario({
      numeroIdentificacion,
      nombres,
      apellidos,
      telefono,
      email: emailNormalized,
      password: generatedPassword,  // SIN hashear aquí
      id_rol: validIdRol,
    });

    await newUser.save(); // Aquí el middleware pre('save') hará el hash automáticamente

    await sendPasswordEmail(emailNormalized, generatedPassword);

    res.status(201).json({ message: 'Usuario registrado y correo enviado con éxito', data: newUser });

  } catch (error) {
    console.error('Error crear usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.find();
    const roles = await Rol.find();

    const usersWithRoles = users.map(user => {
      const role = roles.find(r => r.id_rol === user.id_rol);
      return {
        ...user.toObject(),
        rol: role ? role.nombre : null
      };
    });

    res.status(200).json({ data: usersWithRoles });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

export const getUserById = async (req, res) => {
  const { numeroIdentificacion } = req.params;

  try {
    const user = await Usuario.findOne({ numeroIdentificacion });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const role = await Rol.findOne({ id_rol: user.id_rol });

    res.status(200).json({
      data: {
        ...user.toObject(),
        rol: role ? role.nombre : null
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { numeroIdentificacion } = req.params;
  const { nombres, apellidos, telefono, email, id_rol } = req.body;

  try {
    const usuario = await Usuario.findOne({ numeroIdentificacion });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validIdRol = Number(id_rol);
    if (isNaN(validIdRol)) {
      return res.status(400).json({ message: 'El rol debe ser un número válido.' });
    }

    const role = await Rol.findOne({ id_rol: validIdRol });
    if (!role) {
      return res.status(400).json({ message: 'Rol no encontrado' });
    }

    // No se actualiza la contraseña desde este método
    const userUpdate = await Usuario.updateOne(
      { numeroIdentificacion },
      {
        $set: {
          nombres,
          apellidos,
          telefono,
          email,
          id_rol: validIdRol
        }
      }
    );

    if (userUpdate.matchedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { numeroIdentificacion } = req.params;

  try {
    const usuario = await Usuario.findOne({ numeroIdentificacion });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const abogado = await Abogado.findOne({ numeroIdentificacion });
    if (abogado) {
      await Abogado.deleteOne({ _id: abogado._id });
    }

    const asistente = await Asistente.findOne({ numeroIdentificacion });
    if (asistente) {
      await Asistente.deleteOne({ _id: asistente._id });
    }

    const cliente = await Cliente.findOne({ numeroIdentificacion });
    if (cliente) {
      await Cliente.deleteOne({ _id: cliente._id });
    }

    await Usuario.deleteOne({ numeroIdentificacion });

    res.status(200).json({ message: 'Usuario y sus relaciones eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario y las relaciones asociadas', error: error.message });
  }
};
