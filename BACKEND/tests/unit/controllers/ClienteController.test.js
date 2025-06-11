// tests/unit/controllers/ClienteController.test.js

import * as ClienteController from '../../../src/controllers/ClienteController.js';
import Cliente from '../../../src/models/ClienteModel.js';
import Usuario from '../../../src/models/UsersModel.js';

// Mockeamos los modelos
jest.mock('../../../src/models/ClienteModel.js');
jest.mock('../../../src/models/UsersModel.js');

describe('ClienteController', () => {
  let req, res;

  beforeEach(() => {
    // Configuración inicial para cada test
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();
    
    // Mock para la instancia de Cliente y su método save
    Cliente.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true)
    }));
  });

//   // Tests para crearCliente
  describe('crearCliente', () => {
    it('debería crear un cliente correctamente cuando el usuario existe', async () => {
  // Datos de prueba
  req.body = {
    numeroIdentificacion: '1118365949',
    direccion: 'Calle Falsa 123',
    estado: 'activo',
    estado_cliente: 'cliente'
  };

  // Mock del usuario
  const mockUsuario = { 
    _id: '507f1f77bcf86cd799439011',
    numeroIdentificacion: '1118365949'
  };
  
  // Mock del cliente que se va a crear
  const mockCliente = {
    ...req.body,
    usuario: mockUsuario._id,
    save: jest.fn().mockResolvedValue({ ...req.body, usuario: mockUsuario._id })
  };

  // Configurar los mocks
  Usuario.findOne.mockResolvedValue(mockUsuario);
  Cliente.findOne.mockResolvedValue(null);
  Cliente.mockImplementation(() => mockCliente);

  await ClienteController.crearCliente(req, res);

  // Verificaciones
  expect(Usuario.findOne).toHaveBeenCalledWith({ 
    numeroIdentificacion: '1118365949' 
  });
  expect(Cliente.findOne).toHaveBeenCalledWith({ 
    numeroIdentificacion: '1118365949' 
  });
  expect(mockCliente.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    numeroIdentificacion: '1118365949'
  }));
});

    it('debería devolver 400 si falta el número de identificación', async () => {
      req.body = { direccion: 'Calle Falsa 123' }; // Sin numeroIdentificacion

      await ClienteController.crearCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'El número de identificación es obligatorio' 
      });
    });

    it('debería devolver 404 si el usuario no existe', async () => {
      req.body = { numeroIdentificacion: '999999999' };
      Usuario.findOne.mockResolvedValue(null);

      await ClienteController.crearCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'Usuario no encontrado con ese número de identificación' 
      });
    });

    it('debería devolver 400 si el cliente ya existe', async () => {
      req.body = { numeroIdentificacion: '123456789' };
      Usuario.findOne.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' });
      Cliente.findOne.mockResolvedValue({ numeroIdentificacion: '1118365949' });

      await ClienteController.crearCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'Este usuario ya está registrado como cliente con ese número de identificación' 
      });
    });

    it('debería manejar errores del servidor', async () => {
      req.body = { numeroIdentificacion: '1118365949' };
      Usuario.findOne.mockRejectedValue(new Error('Error de base de datos'));

      await ClienteController.crearCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'Error al crear el cliente' 
      });
    });
  });

//   // Tests para getCliente
  describe('getCliente', () => {
    it('debería devolver un cliente existente', async () => {
      req.params.numeroIdentificacion = '123456789';
      
      const mockCliente = {
        numeroIdentificacion: '123456789',
        direccion: 'Calle Falsa 123',
        populate: jest.fn().mockResolvedValue({
          numeroIdentificacion: '123456789',
          usuario: {
            nombres: 'Juan',
            apellidos: 'Perez'
          }
        })
      };
      
      Cliente.findOne.mockReturnValue(mockCliente);

      await ClienteController.getCliente(req, res);

      expect(Cliente.findOne).toHaveBeenCalledWith({ 
        numeroIdentificacion: '123456789' 
      });
      expect(mockCliente.populate).toHaveBeenCalledWith(
        'usuario', 'nombres apellidos'
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        numeroIdentificacion: '123456789'
      }));
    });

    it('debería devolver 404 si el cliente no existe', async () => {
  req.params.numeroIdentificacion = '999999999';
  
  // Configurar el mock para simular findOne().populate()
  Cliente.findOne.mockReturnValue({
    populate: jest.fn().mockResolvedValue(null)
  });

  await ClienteController.getCliente(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ 
    mensaje: 'Cliente no encontrado' 
  });
});

it('debería manejar errores del servidor', async () => {
  req.params.numeroIdentificacion = '123456789';
  
  // Configurar el mock para simular findOne().populate() con error
  Cliente.findOne.mockReturnValue({
    populate: jest.fn().mockRejectedValue(new Error('Error de base de datos'))
  });

  await ClienteController.getCliente(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ 
    mensaje: 'Error al obtener el cliente' 
  });
});
  });

//   // Tests para getClientes
  describe('getClientes', () => {
it('debería devolver todos los clientes con sus usuarios', async () => {
  // Configurar el mock para simular find().populate()
  const mockQuery = {
    populate: jest.fn().mockResolvedValue([
      { 
        numeroIdentificacion: '123', 
        usuario: { nombres: 'Juan', apellidos: 'Perez' } 
      },
      { 
        numeroIdentificacion: '456', 
        usuario: { nombres: 'Maria', apellidos: 'Gomez' } 
      }
    ])
  };
  
  Cliente.find.mockReturnValue(mockQuery);

  await ClienteController.getClientes(req, res);

  // Verificaciones
  expect(Cliente.find).toHaveBeenCalled();
  expect(mockQuery.populate).toHaveBeenCalledWith(
    'usuario', 'nombres apellidos'
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
    expect.objectContaining({ numeroIdentificacion: '123' }),
    expect.objectContaining({ numeroIdentificacion: '456' })
  ]));
});

it('debería devolver un array vacío si no hay clientes', async () => {
  // Configurar el mock para simular find().populate()
  const mockQuery = {
    populate: jest.fn().mockResolvedValue([]) // Devuelve array vacío
  };
  
  Cliente.find.mockReturnValue(mockQuery);

  await ClienteController.getClientes(req, res);

  expect(Cliente.find).toHaveBeenCalled();
  expect(mockQuery.populate).toHaveBeenCalledWith(
    'usuario', 'nombres apellidos'
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([]);
});

it('debería manejar errores del servidor', async () => {
  // Mock que falla al llamar a populate()
  const mockQuery = {
    populate: jest.fn().mockImplementation(() => {
      throw new Error('Error de base de datos');
    })
  };
  
  Cliente.find.mockReturnValue(mockQuery);

  await ClienteController.getClientes(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ 
    mensaje: 'Error al obtener los clientes' 
  });
});
  });

//   // Tests para updateCliente
  describe('updateCliente', () => {
    it('debería actualizar un cliente existente', async () => {
      req.params.numeroIdentificacion = '123456789';
      req.body = {
        direccion: 'Nueva Dirección 456',
        estado: 'inactivo',
        estado_cliente: 'cliente'
      };

      const mockCliente = {
        numeroIdentificacion: '123456789',
        direccion: 'Calle Falsa 123',
        estado: 'activo',
        estado_cliente: 'potencial',
        save: jest.fn().mockResolvedValue(true)
      };

      Cliente.findOne.mockResolvedValue(mockCliente);

      await ClienteController.updateCliente(req, res);

      expect(Cliente.findOne).toHaveBeenCalledWith({ 
        numeroIdentificacion: '123456789' 
      });
      expect(mockCliente.direccion).toBe('Nueva Dirección 456');
      expect(mockCliente.estado).toBe('inactivo');
      expect(mockCliente.estado_cliente).toBe('cliente');
      expect(mockCliente.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        numeroIdentificacion: '123456789'
      }));
    });

    it('debería devolver 404 si el cliente no existe', async () => {
      req.params.numeroIdentificacion = '999999999';
      Cliente.findOne.mockResolvedValue(null);

      await ClienteController.updateCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'Cliente no encontrado' 
      });
    });

    it('debería mantener los valores anteriores si no se proporcionan nuevos', async () => {
      req.params.numeroIdentificacion = '123456789';
      req.body = {}; // Sin datos para actualizar

      const mockCliente = {
        numeroIdentificacion: '123456789',
        direccion: 'Dirección Original',
        estado: 'activo',
        estado_cliente: 'potencial',
        save: jest.fn().mockResolvedValue(true)
      };

      Cliente.findOne.mockResolvedValue(mockCliente);

      await ClienteController.updateCliente(req, res);

      expect(mockCliente.direccion).toBe('Dirección Original');
      expect(mockCliente.estado).toBe('activo');
      expect(mockCliente.estado_cliente).toBe('potencial');
    });

    it('debería manejar errores del servidor', async () => {
      req.params.numeroIdentificacion = '123456789';
      Cliente.findOne.mockRejectedValue(new Error('Error de base de datos'));

      await ClienteController.updateCliente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ 
        mensaje: 'Error al actualizar el cliente' 
      });
    });
  });
});