// tests/unit/controllers/UserController.test.js

// Importamos bcryptjs para el manejo de hashes de contraseñas
import bcrypt from 'bcryptjs';

// Importamos el controlador que vamos a probar
import * as UserController from '../../../src/controllers/UsersController.js';

// Importamos los modelos usados en el controlador
import Usuario from '../../../src/models/UsersModel.js';
import Rol from '../../../src/models/RoleModel.js';
import Abogado from '../../../src/models/AbogadoModel.js';
import Asistente from '../../../src/models/AsistenteModel.js';
import Cliente from '../../../src/models/ClienteModel.js';

// Mockeamos los modelos y bcrypt para controlar su comportamiento en los tests
jest.mock('../../../src/models/UsersModel.js');
jest.mock('../../../src/models/RoleModel.js');
jest.mock('../../../src/models/AbogadoModel.js');
jest.mock('../../../src/models/AsistenteModel.js');
jest.mock('../../../src/models/ClienteModel.js');
jest.mock('bcryptjs');

describe('UserController', () => {
  // Declaramos variables para request y response simulados
  let req, res;

  beforeEach(() => {
    // Reiniciamos los objetos req y res antes de cada test
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),  // Permitimos encadenar llamadas (status().json())
      json: jest.fn()
    };
    // Limpiamos los mocks para que no haya interferencia entre tests
    jest.clearAllMocks();

    // Mock para la instancia de Usuario y su método save
    // Simulamos que al crear un nuevo Usuario, el método save resuelve con éxito
    Usuario.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true)
    }));
  });

  // Tests para la función createUser del controlador
  describe('createUser', () => {
    it('debería crear un usuario correctamente', async () => {
      // Configuramos el cuerpo de la petición con datos válidos
      req.body = {
        numeroIdentificacion: '123',
        nombres: 'Juan',
        apellidos: 'Perez',
        telefono: '123456789',
        email: 'juan@example.com',
        password: 'password123',
        id_rol: 1
      };

      // Simulamos que el rol existe
      Rol.findOne.mockResolvedValue({ id_rol: 1, nombre: 'Admin' });
      // Simulamos que no hay usuario duplicado
      Usuario.findOne.mockResolvedValue(null);
      // Simulamos que bcrypt genera un hash de contraseña correctamente
      bcrypt.hash.mockResolvedValue('hashedpassword');

      // Mockeamos el método save para verificar que es llamado
      const saveMock = jest.fn().mockResolvedValue(req.body);
      Usuario.mockImplementation(() => ({ save: saveMock }));

      // Ejecutamos la función del controlador
      await UserController.createUser(req, res);

      // Verificamos que se haya buscado el rol correcto
      expect(Rol.findOne).toHaveBeenCalledWith({ id_rol: 1 });

      // Verificamos que se haya buscado si el usuario ya existe por identificación, email o teléfono
      expect(Usuario.findOne).toHaveBeenCalledWith({
        $or: [
          { numeroIdentificacion: '123' },
          { email: 'juan@example.com' },
          { telefono: '123456789' }
        ]
      });

      // Verificamos que la contraseña haya sido hasheada correctamente
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

      // Verificamos que el método save del nuevo usuario haya sido llamado
      expect(saveMock).toHaveBeenCalled();

      // Verificamos que se haya respondido con estado 201 y mensaje correcto
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Usuario registrado con éxito'
      }));
    });

    it('debería devolver 400 si el rol no existe', async () => {
      // Enviamos un id_rol que no existe en la DB
      req.body = { id_rol: 99 };

      // Simulamos que no se encontró el rol
      Rol.findOne.mockResolvedValue(null);

      // Ejecutamos el controlador
      await UserController.createUser(req, res);

      // Esperamos que retorne error 400 con mensaje de rol no encontrado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rol no encontrado' });
    });

    it('debería devolver 400 si el usuario ya existe', async () => {
      // Simulamos que el usuario ya existe con esos datos
      req.body = {
        numeroIdentificacion: '123',
        email: 'juan@example.com',
        telefono: '123456789',
        id_rol: 1
      };

      Rol.findOne.mockResolvedValue({ id_rol: 1 });
      Usuario.findOne.mockResolvedValue({});  // Ya existe un usuario

      // Ejecutamos el controlador
      await UserController.createUser(req, res);

      // Esperamos error 400 con mensaje de usuario duplicado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'N. Identificación, correo o teléfono ya registrados'
      });
    });

    it('debería manejar error del servidor', async () => {
      // Simulamos error inesperado en la búsqueda del rol
      Rol.findOne.mockRejectedValue(new Error('DB failure'));

      await UserController.createUser(req, res);

      // Esperamos error 500 con mensaje de error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });

  // Tests para obtener todos los usuarios
  describe('getAllUsers', () => {
    it('debería manejar error en la consulta', async () => {
      // Simulamos error al buscar todos los usuarios
      Usuario.find.mockRejectedValue(new Error('DB error'));

      await UserController.getAllUsers(req, res);

      // Se debe responder con error 500 y mensaje con error
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error al obtener los usuarios',
        error: expect.any(Error)
      }));
    });
  });

  // Tests para obtener un usuario por su número de identificación
  describe('getUserById', () => {
    it('debería devolver un usuario existente con su rol', async () => {
      req.params.numeroIdentificacion = '123';

      // Mock que simula el usuario encontrado, con método toObject para obtener datos limpios
      const userMock = { toObject: () => ({ numeroIdentificacion: '123', id_rol: 1 }) };
      // Mock para el rol
      const roleMock = { nombre: 'Admin' };

      Usuario.findOne.mockResolvedValue(userMock);
      Rol.findOne.mockResolvedValue(roleMock);

      await UserController.getUserById(req, res);

      // Verificamos que responda con status 200 y datos correctos incluyendo el nombre del rol
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({
          numeroIdentificacion: '123',
          rol: 'Admin'
        })
      });
    });

    it('debería devolver 404 si no encuentra usuario', async () => {
      req.params.numeroIdentificacion = '123';

      // Simulamos que no existe el usuario
      Usuario.findOne.mockResolvedValue(null);

      await UserController.getUserById(req, res);

      // Respuesta con 404 y mensaje apropiado
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('debería manejar error del servidor', async () => {
      req.params.numeroIdentificacion = '123';

      // Simulamos error inesperado en la búsqueda
      Usuario.findOne.mockRejectedValue(new Error('DB error'));

      await UserController.getUserById(req, res);

      // Error 500 y mensaje genérico
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });

  // Tests para actualizar un usuario
  describe('updateUser', () => {
    it('debería actualizar un usuario correctamente', async () => {
      req.params.numeroIdentificacion = '123';

      // Datos que se actualizarán
      req.body = {
        nombres: 'Juan',
        apellidos: 'Perez',
        telefono: '987654321',
        email: 'juan_updated@example.com',
        password: 'newpassword',
        id_rol: 2
      };

      // Simulamos que el usuario existe
      Usuario.findOne.mockResolvedValue(true);
      // Simulamos que el rol existe
      Rol.findOne.mockResolvedValue({ id_rol: 2, nombre: 'Asistente' });
      // Simulamos el hash de la nueva contraseña
      bcrypt.hash.mockResolvedValue('hashednewpassword');
      // Simulamos que la actualización en BD fue exitosa
      Usuario.updateOne.mockResolvedValue({ matchedCount: 1 });

      // Ejecutamos la actualización
      await UserController.updateUser(req, res);

      // Verificamos las llamadas clave
      expect(Usuario.findOne).toHaveBeenCalledWith({ numeroIdentificacion: '123' });
      expect(Rol.findOne).toHaveBeenCalledWith({ id_rol: 2 });
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);

      expect(Usuario.updateOne).toHaveBeenCalledWith(
        { numeroIdentificacion: '123' },
        expect.objectContaining({
          $set: expect.objectContaining({
            nombres: 'Juan',
            password: 'hashednewpassword',
            id_rol: 2
          })
        })
      );

      // Verificamos respuesta exitosa
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario actualizado correctamente' });
    });

    it('debería devolver 404 si no encuentra usuario', async () => {
      req.params.numeroIdentificacion = '123';

      // Simulamos que usuario no existe
      Usuario.findOne.mockResolvedValue(null);

      await UserController.updateUser(req, res);

      // Respuesta 404 con mensaje
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('debería devolver 400 si el rol no existe', async () => {
      req.params.numeroIdentificacion = '123';
      req.body.id_rol = 99;

      Usuario.findOne.mockResolvedValue(true);
      Rol.findOne.mockResolvedValue(null);

      await UserController.updateUser(req, res);

      // Rol no encontrado - error 400
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rol no encontrado' });
    });

    it('debería manejar error del servidor', async () => {
      req.params.numeroIdentificacion = '123';

      // Simulamos error inesperado
      Usuario.findOne.mockRejectedValue(new Error('DB error'));

      await UserController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });

  // Tests para eliminar un usuario
  describe('deleteUser', () => {
    it('debería eliminar un usuario correctamente', async () => {
      req.params.numeroIdentificacion = '123';

      // Simulamos que el usuario existe
      Usuario.findOne.mockResolvedValue(true);
      // Simulamos eliminación exitosa
      Usuario.deleteOne.mockResolvedValue({ deletedCount: 1 });

      await UserController.deleteUser(req, res);

      // Verificamos que se haya buscado y eliminado correctamente
      expect(Usuario.findOne).toHaveBeenCalledWith({ numeroIdentificacion: '123' });
      expect(Usuario.deleteOne).toHaveBeenCalledWith({ numeroIdentificacion: '123' });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario y sus relaciones eliminados correctamente' });
    });

    it('debería devolver 404 si no encuentra usuario', async () => {
      req.params.numeroIdentificacion = '123';

      Usuario.findOne.mockResolvedValue(null);

      await UserController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('debería manejar error del servidor', async () => {
      req.params.numeroIdentificacion = '123';

      Usuario.findOne.mockRejectedValue(new Error('DB error'));

      await UserController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });
});
