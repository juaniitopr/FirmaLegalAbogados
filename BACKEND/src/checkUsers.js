import mongoose from 'mongoose';
import Usuario from './models/UsersModel.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MONGODB');
    } catch (error) {
        console.error(`Ocurrió un error al conectarse: ${error.message}`);
        process.exit(1);
    }
};

const checkUsers = async () => {
    await connectDB();
    try {
        const users = await Usuario.find({});
        console.log('Usuarios encontrados:', users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

checkUsers();
