import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/UsersModel.js';
import Rol from '../models/RoleModel.js';
import dotenv from 'dotenv';

dotenv.config();

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET no está definido en el archivo .env');
        return res.status(500).json({ 
            message: 'Error en el servidor: JWT_SECRET no definido' 
        });
    }

    try {

        const user = await Usuario.findOne({ email });

        if (!user) {
            console.log('Usuario no encontrado con ese correo');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log('Password almacenado en la BD:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('¿Coincide la contraseña?', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const rol = await Rol.findOne({ id_rol: user.id_rol });
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        const token = jwt.sign(
            {
                numeroIdentificacion: user.numeroIdentificacion,
                nombre: user.nombres,
                apellido: user.apellidos,
                email: user.email,
                telefono: user.telefono,
                nombre_rol: rol.nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('- Token generado exitosamente:', token);
        return res.json({ token });

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


export default Login;
